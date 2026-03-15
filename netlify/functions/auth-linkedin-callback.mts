/**
 * LinkedIn OAuth — Step 2: Exchange code for access token
 * This is the callback URL that LinkedIn redirects to after user authorises.
 *
 * The new token is displayed on-screen for you to paste into Netlify env vars.
 */

import type { Config } from '@netlify/functions'

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const errorDesc = url.searchParams.get('error_description')

  if (error || !code) {
    return new Response(
      `<html><body style="background:#080808;color:#f5f0e8;font-family:monospace;padding:48px">
        <h1 style="color:#b87e7e">LinkedIn Authorization Failed</h1>
        <p>${error}: ${errorDesc || 'No authorization code received'}</p>
        <a href="/api/auth/linkedin" style="color:#c9a96e">Try again</a>
      </body></html>`,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return new Response('Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET', { status: 500 })
  }

  const siteUrl = process.env.URL || 'http://localhost:8888'
  const redirectUri = `${siteUrl}/api/auth/linkedin/callback`

  // Exchange authorization code for access token
  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text()
    return new Response(
      `<html><body style="background:#080808;color:#f5f0e8;font-family:monospace;padding:48px">
        <h1 style="color:#b87e7e">Token Exchange Failed</h1>
        <pre style="background:#161616;padding:16px;border:1px solid #2a2a2a;overflow:auto">${body}</pre>
        <a href="/api/auth/linkedin" style="color:#c9a96e">Try again</a>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const tokenData = await tokenRes.json()
  const accessToken: string = tokenData.access_token
  const expiresIn: number = tokenData.expires_in // seconds (~60 days)
  const expiresAt = new Date(Date.now() + expiresIn * 1000)
  const expiresFormatted = expiresAt.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  // Verify the token works by fetching org info
  let orgName = ''
  try {
    const orgRes = await fetch(
      `https://api.linkedin.com/v2/organizations/${process.env.LINKEDIN_ORGANIZATION_ID}`,
      { headers: { Authorization: `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0' } }
    )
    if (orgRes.ok) {
      const orgData = await orgRes.json()
      orgName = orgData.localizedName || ''
    }
  } catch { /* non-fatal */ }

  const html = `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>LinkedIn Connected — AIR</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { background: #080808; color: #f5f0e8; font-family: 'JetBrains Mono', monospace; padding: 48px 24px; max-width: 720px; margin: 0 auto; }
    h1 { color: #c9a96e; font-size: 24px; margin-bottom: 8px; }
    .sub { color: #6b6b6b; font-size: 13px; margin-bottom: 32px; }
    .token-box { background: #161616; border: 1px solid #2a2a2a; padding: 16px; word-break: break-all; font-size: 11px; margin: 16px 0; line-height: 1.6; user-select: all; cursor: text; }
    .step { background: #0f1c1f; border-left: 3px solid #c9a96e; padding: 12px 16px; margin: 8px 0; font-size: 13px; }
    .step a { color: #c9a96e; }
    code { background: #1e1e1e; padding: 2px 6px; font-size: 12px; }
    .badge { display: inline-block; background: #1a2e1a; color: #6bcb77; border: 1px solid #2a4a2a; padding: 4px 12px; font-size: 11px; margin-bottom: 24px; }
    .warn { color: #6b6b6b; font-size: 11px; margin-top: 32px; }
  </style>
</head><body>
  <h1>LinkedIn Connected</h1>
  ${orgName ? `<p class="sub">Organisation: <strong style="color:#f5f0e8">${orgName}</strong></p>` : ''}
  <div class="badge">Token valid until ${expiresFormatted}</div>

  <p style="font-size:13px;margin-bottom:8px;color:#c9a96e;">New Access Token:</p>
  <div class="token-box" id="token">${accessToken}</div>
  <button onclick="navigator.clipboard.writeText(document.getElementById('token').textContent);this.textContent='Copied!'" style="background:#c9a96e;color:#080808;border:none;padding:8px 20px;font-family:inherit;font-size:12px;cursor:pointer;margin-bottom:32px;">Copy Token</button>

  <h2 style="font-size:16px;color:#f5f0e8;margin-bottom:12px;">Update the token:</h2>
  <div class="step">1. Go to <a href="https://app.netlify.com" target="_blank">Netlify Dashboard</a> → Site Settings → Environment Variables</div>
  <div class="step">2. Update <code>LINKEDIN_ACCESS_TOKEN</code> with the token above</div>
  <div class="step">3. Trigger a redeploy (Deploys → Trigger deploy)</div>
  <div class="step">4. Test: visit <code>/api/publish-now</code> to publish today's scheduled post</div>

  <p class="warn">Set a calendar reminder to refresh before ${expiresFormatted} — LinkedIn tokens expire every 60 days.</p>
</body></html>`

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  })
}

export const config: Config = { path: '/api/auth/linkedin/callback' }
