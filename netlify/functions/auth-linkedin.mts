/**
 * LinkedIn OAuth — Step 1: Redirect to LinkedIn authorization
 * Visit /api/auth/linkedin in a browser to start the flow.
 *
 * Before using: add your callback URL in LinkedIn Developer Portal → Auth tab → Redirect URLs:
 *   https://<your-netlify-domain>/api/auth/linkedin/callback
 */

import type { Config } from '@netlify/functions'

export default async function handler(req: Request): Promise<Response> {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  if (!clientId) {
    return new Response('LINKEDIN_CLIENT_ID env var is not set', { status: 500 })
  }

  // process.env.URL is provided by Netlify (e.g. https://your-site.netlify.app)
  const siteUrl = process.env.URL || 'http://localhost:8888'
  const redirectUri = `${siteUrl}/api/auth/linkedin/callback`
  const scope = 'w_organization_social r_organization_social'
  const state = crypto.randomUUID()

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', scope)
  authUrl.searchParams.set('state', state)

  return Response.redirect(authUrl.toString(), 302)
}

export const config: Config = { path: '/api/auth/linkedin' }
