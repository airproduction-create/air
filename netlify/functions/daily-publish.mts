/**
 * AIR CO — Daily LinkedIn Publisher
 * Scheduled Netlify function: runs at 07:00 UTC every day.
 *
 * Flow:
 *  1. Fetch today's revelation from Supabase (unpublished, publish_date = today)
 *  2. Generate companion image via Freepik Mystic API
 *  3. Store image URL back in Supabase
 *  4. Upload image to LinkedIn + create UGC post
 *  5. Mark revelation as published
 *  6. On any failure: log error in Supabase + notify via Slack & email
 */

import type { Config } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { generateImage } from './_utils/freepik.js'
import { uploadImageToLinkedIn, createLinkedInPost } from './_utils/linkedin.js'
import { notifyFailure } from './_utils/notify.js'

// Service role client — has full write access
function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

export default async function handler(): Promise<Response> {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const supabase = getSupabase()
  let currentStep = 'fetch'

  // 1. Fetch today's revelation
  const { data: revelation, error: fetchErr } = await supabase
    .from('revelations')
    .select('*')
    .eq('publish_date', today)
    .eq('published', false)
    .single()

  if (fetchErr || !revelation) {
    console.log(`[daily-publish] No unpublished revelation for ${today}. Skipping.`)
    return new Response(`No content scheduled for ${today}`, { status: 200 })
  }

  console.log(`[daily-publish] Publishing: "${revelation.title}" (${today})`)

  try {
    // 2. Generate image
    currentStep = 'image-generation'
    let imageUrl: string | null = revelation.image_url ?? null

    if (!imageUrl) {
      console.log('[daily-publish] Generating image via Freepik...')
      imageUrl = await generateImage(revelation.image_prompt, revelation.id)

      // 3. Store image URL
      currentStep = 'store-image-url'
      await supabase
        .from('revelations')
        .update({ image_url: imageUrl })
        .eq('id', revelation.id)

      console.log(`[daily-publish] Image stored: ${imageUrl}`)
    }

    // 4. Publish to LinkedIn
    currentStep = 'linkedin-image-upload'
    let assetUrn: string | undefined
    try {
      assetUrn = await uploadImageToLinkedIn(imageUrl)
      console.log(`[daily-publish] LinkedIn image asset: ${assetUrn}`)
    } catch (imgErr) {
      // Non-fatal: post without image rather than skip entirely
      console.warn('[daily-publish] Image upload to LinkedIn failed, posting text-only:', imgErr)
      assetUrn = undefined
    }

    currentStep = 'linkedin-post'
    const postId = await createLinkedInPost(revelation.post_copy, assetUrn)
    console.log(`[daily-publish] LinkedIn post created: ${postId}`)

    // 5. Mark as published
    currentStep = 'mark-published'
    await supabase
      .from('revelations')
      .update({ published: true, publish_error: null })
      .eq('id', revelation.id)

    console.log(`[daily-publish] ✓ Done — "${revelation.title}"`)
    return new Response(
      JSON.stringify({ success: true, title: revelation.title, linkedinPostId: postId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`[daily-publish] FAILED at step "${currentStep}":`, errorMessage)

    // Log error to Supabase
    await supabase
      .from('revelations')
      .update({ publish_error: `[${currentStep}] ${errorMessage}` })
      .eq('id', revelation.id)

    // Send notifications
    await notifyFailure({
      title: revelation.title,
      publishDate: today,
      error: errorMessage,
      step: currentStep,
    })

    return new Response(
      JSON.stringify({ success: false, step: currentStep, error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const config: Config = {
  schedule: '0 7 * * *', // 07:00 UTC daily
}
