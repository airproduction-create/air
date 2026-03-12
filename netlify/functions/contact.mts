/**
 * AIR CO — Contact Form Handler
 *
 * POST /api/contact
 * Body: { name, email, audience, context }
 *
 * 1. Validates required fields
 * 2. Inserts into Supabase contact_inquiries table
 * 3. Sends notification email to NOTIFICATION_EMAIL via Resend
 */

import type { Config } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: { name?: string; email?: string; context?: string; audience?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  const { name, email, context, audience } = body

  if (!name?.trim() || !email?.trim() || !context?.trim()) {
    return json({ error: 'name, email, and context are required' }, 400)
  }

  // 1. Save to Supabase
  try {
    const supabase = getSupabase()
    const { error: dbError } = await supabase
      .from('contact_inquiries')
      .insert({ name: name.trim(), email: email.trim(), audience: audience?.trim() || null, context: context.trim() })

    if (dbError) {
      console.error('[contact] Supabase error:', dbError.message)
      return json({ error: 'Failed to save inquiry' }, 500)
    }
  } catch (err) {
    console.error('[contact] Unexpected error saving to Supabase:', err)
    return json({ error: 'Internal error' }, 500)
  }

  // 2. Send notification email via Resend (non-fatal — don't block success response)
  const resendKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFICATION_EMAIL

  if (resendKey && notifyEmail) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Update 'from' once you verify a domain in Resend (resend.com/domains)
          from: 'AIR CO <onboarding@resend.dev>',
          to: notifyEmail,
          subject: `New inquiry — ${name.trim()}${audience ? ` (${audience})` : ''}`,
          html: notificationEmail({ name: name.trim(), email: email.trim(), audience, context: context.trim() }),
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.warn('[contact] Resend warning:', res.status, text)
      }
    } catch (err) {
      console.warn('[contact] Resend send failed (non-fatal):', err)
    }
  }

  return json({ success: true }, 200)
}

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function notificationEmail({
  name,
  email,
  audience,
  context,
}: {
  name: string
  email: string
  audience?: string
  context: string
}) {
  return `
    <div style="font-family: monospace; padding: 32px; background: #080808; color: #f5f0e8; max-width: 600px; margin: 0 auto;">
      <div style="border-left: 3px solid #c9a96e; padding-left: 16px; margin-bottom: 24px;">
        <h2 style="color: #c9a96e; margin: 0 0 4px;">New Inquiry</h2>
        <p style="color: #6b6b6b; margin: 0; font-size: 12px;">via airco.agency contact form</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; color: #6b6b6b; width: 100px; vertical-align: top;">Name</td>
          <td style="padding: 10px 0; color: #f5f0e8;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6b6b6b; vertical-align: top;">Email</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color: #c9a96e;">${escapeHtml(email)}</a>
          </td>
        </tr>
        ${audience ? `
        <tr>
          <td style="padding: 10px 0; color: #6b6b6b; vertical-align: top;">Audience</td>
          <td style="padding: 10px 0; color: #f5f0e8;">${escapeHtml(audience)}</td>
        </tr>` : ''}
      </table>
      <div style="background: #0f0f0f; border: 1px solid #1e1e1e; padding: 20px;">
        <p style="color: #6b6b6b; font-size: 11px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">What they're trying to reveal</p>
        <p style="color: #f5f0e8; margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(context)}</p>
      </div>
    </div>
  `
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const config: Config = {
  path: '/api/contact',
}
