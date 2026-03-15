/**
 * LinkedIn API client — Posts API (w_member_social)
 * Handles image upload and post creation on a personal LinkedIn profile.
 *
 * Required env vars:
 *   LINKEDIN_ACCESS_TOKEN    — OAuth token with w_member_social scope
 *   LINKEDIN_PERSON_URN      — Obfuscated person URN (e.g. "HhJtXno6Ii")
 *   LINKEDIN_ORGANIZATION_ID — Numeric company page ID (fallback, needs w_organization_social)
 */

const REST_BASE = 'https://api.linkedin.com/rest'
const LINKEDIN_VERSION = '202503'

function headers(extra: Record<string, string> = {}) {
  return {
    Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
    'X-Restli-Protocol-Version': '2.0.0',
    'LinkedIn-Version': LINKEDIN_VERSION,
    ...extra,
  }
}

/** Returns the author URN for the Posts API. */
function getAuthorUrn(): string {
  if (process.env.LINKEDIN_PERSON_URN) {
    return `urn:li:person:${process.env.LINKEDIN_PERSON_URN}`
  }
  if (process.env.LINKEDIN_ORGANIZATION_ID) {
    return `urn:li:organization:${process.env.LINKEDIN_ORGANIZATION_ID}`
  }
  throw new Error('Set LINKEDIN_PERSON_URN or LINKEDIN_ORGANIZATION_ID')
}

/**
 * Upload an image from a public URL to LinkedIn's media store.
 * Returns the LinkedIn image URN (e.g. "urn:li:image:...").
 */
export async function uploadImageToLinkedIn(imageUrl: string): Promise<string> {
  const authorUrn = getAuthorUrn()

  // Step 1: Initialize the upload
  const initRes = await fetch(`${REST_BASE}/images?action=initializeUpload`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: authorUrn,
      },
    }),
  })

  if (!initRes.ok) {
    const body = await initRes.text()
    throw new Error(`LinkedIn initializeUpload failed (${initRes.status}): ${body}`)
  }

  const initData = await initRes.json()
  const uploadUrl: string = initData.value.uploadUrl
  const imageUrn: string = initData.value.image

  // Step 2: Fetch the image binary from the public URL
  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error(`Failed to fetch image from ${imageUrl}: ${imgRes.status}`)
  const imgBuffer = await imgRes.arrayBuffer()

  // Step 3: Upload binary to LinkedIn
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/octet-stream',
    },
    body: imgBuffer,
  })

  if (!uploadRes.ok && uploadRes.status !== 201) {
    const body = await uploadRes.text()
    throw new Error(`LinkedIn image upload failed (${uploadRes.status}): ${body}`)
  }

  return imageUrn
}

/**
 * Create a LinkedIn post (text + optional image).
 * Uses the Posts API (replaces deprecated UGC Posts API).
 * Returns the post URN.
 */
export async function createLinkedInPost(
  text: string,
  imageUrn?: string
): Promise<string> {
  const authorUrn = getAuthorUrn()

  const body: Record<string, unknown> = {
    author: authorUrn,
    commentary: text,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
    },
    lifecycleState: 'PUBLISHED',
  }

  if (imageUrn) {
    body.content = {
      media: { id: imageUrn },
    }
  }

  const res = await fetch(`${REST_BASE}/posts`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`LinkedIn post failed (${res.status}): ${errBody}`)
  }

  const postId = res.headers.get('x-restli-id') ?? 'unknown'
  return postId
}
