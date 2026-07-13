/**
 * Failure notification — Slack webhook + Resend email
 *
 * Required env vars:
 *   SLACK_WEBHOOK_URL   — Incoming webhook URL from Slack app
 *   RESEND_API_KEY      — From resend.com
 *   NOTIFICATION_EMAIL  — Recipient email address for failure alerts
 */

interface NotifyPayload {
  title: string
  publishDate: string
  error: string
  step: string
}

export async function notifyFailure(payload: NotifyPayload): Promise<void> {
  await Promise.allSettled([
    notifySlack(payload),
    notifyEmail(payload),
  ])
}

async function notifySlack({ title, publishDate, error, step }: NotifyPayload) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: '🚨 *AIR CO LinkedIn publish failed*',
      blocks: [
        {
          type: 'header',
          text: { type: 'plain_text', text: '🚨 LinkedIn Publish Failed' },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Post:*\n${title}` },
            { type: 'mrkdwn', text: `*Date:*\n${publishDate}` },
            { type: 'mrkdwn', text: `*Failed at:*\n${step}` },
            { type: 'mrkdwn', text: `*Error:*\n\`${error.slice(0, 200)}\`` },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Check the `revelations` table in Supabase for details. Fix and re-run from the Netlify Functions dashboard.',
          },
        },
      ],
    }),
  })
}

async function notifyEmail({ title, publishDate, error, step }: NotifyPayload) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !to) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AIR CO System <noreply@airstu.netlify.app>',
      to,
      subject: `⚠️ LinkedIn publish failed: ${title}`,
      html: `
        <div style="font-family: monospace; padding: 24px; background: #0a0a0a; color: #f5f0e8; max-width: 600px;">
          <h2 style="color: #c9a96e; margin-top: 0;">LinkedIn Publish Failed</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Post</td>
              <td style="padding: 8px 0;">${title}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Scheduled date</td>
              <td style="padding: 8px 0;">${publishDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Failed at step</td>
              <td style="padding: 8px 0;">${step}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 12px; background: #1a1a1a; border-left: 3px solid #c9a96e;">
            <pre style="margin: 0; color: #b87e7e; font-size: 12px; white-space: pre-wrap;">${error}</pre>
          </div>
          <p style="margin-top: 16px; color: #6b6b6b; font-size: 12px;">
            Fix the issue and manually re-trigger from the Netlify Functions dashboard,
            or update the <code>published</code> flag in Supabase and wait for tomorrow's run.
          </p>
        </div>
      `,
    }),
  })
}
