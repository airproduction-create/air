/**
 * Manual LinkedIn publish trigger
 * GET /api/publish-now          → publishes today's scheduled revelation
 * GET /api/publish-now?date=YYYY-MM-DD → publishes a specific date's revelation
 *
 * Reuses the same pipeline as daily-publish.mts.
 */

import type { Config } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { generateImage } from './_utils/freepik.js'
import { uploadImageToLinkedIn, createLinkedInPost } from './_utils/linkedin.js'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const targetDate = url.searchParams.get('date') || new Date().toISOString().split('T')[0]
  const dryRun = url.searchParams.get('dry') === '1'

  const supabase = getSupabase()
  let currentStep = 'fetch'

  // 1. Fetch revelation for target date
  const { data: revelation, error: fetchErr } = await supabase
    .from('revelations')
    .select('*')
    .eq('publish_date', targetDate)
    .single()

  if (fetchErr || !revelation) {
    return jsonRes(404, {
      error: `No revelation found for ${targetDate}`,
      hint: 'Check the revelations table in Supabase. Ensure publish_date matches.',
      dbError: fetchErr?.message,
    })
  }

  if (revelation.published && !url.searchParams.has('force')) {
    return jsonRes(200, {
      skipped: true,
      message: `"${revelation.title}" was already published. Add ?force to re-publish.`,
    })
  }

  // Dry run: return what WOULD be posted without actually posting
  if (dryRun) {
    return jsonRes(200, {
      dryRun: true,
      title: revelation.title,
      creative_figure: revelation.creative_figure,
      category: revelation.category,
      publish_date: revelation.publish_date,
      post_copy: revelation.post_copy,
      image_prompt: revelation.image_prompt,
      image_url: revelation.image_url,
    })
  }

  try {
    // 2. Generate image if needed
    currentStep = 'image-generation'
    let imageUrl: string | null = revelation.image_url ?? null

    if (!imageUrl) {
      console.log('[publish-now] Generating image via Freepik...')
      imageUrl = await generateImage(revelation.image_prompt, revelation.id)

      currentStep = 'store-image-url'
      await supabase
        .from('revelations')
        .update({ image_url: imageUrl })
        .eq('id', revelation.id)
    }

    // 3. Upload image to LinkedIn
    currentStep = 'linkedin-image-upload'
    let assetUrn: string | undefined
    try {
      assetUrn = await uploadImageToLinkedIn(imageUrl)
    } catch (imgErr) {
      console.warn('[publish-now] Image upload failed, posting text-only:', imgErr)
      assetUrn = undefined
    }

    // 4. Create LinkedIn post
    currentStep = 'linkedin-post'
    const postId = await createLinkedInPost(revelation.post_copy, assetUrn)

    // 5. Mark as published
    currentStep = 'mark-published'
    await supabase
      .from('revelations')
      .update({ published: true, publish_error: null })
      .eq('id', revelation.id)

    return jsonRes(200, {
      success: true,
      title: revelation.title,
      linkedinPostId: postId,
      imageUrl,
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)

    await supabase
      .from('revelations')
      .update({ publish_error: `[${currentStep}] ${errorMessage}` })
      .eq('id', revelation.id)

    return jsonRes(500, {
      success: false,
      step: currentStep,
      error: errorMessage,
      title: revelation.title,
    })
  }
}

function jsonRes(status: number, data: Record<string, unknown>) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config: Config = { path: '/api/publish-now' }
