/**
 * LinkedIn API client
 * Handles image upload and UGC post creation for the AIR CO company page.
 *
 * Required env vars:
 *   LINKEDIN_ACCESS_TOKEN   — OAuth token with w_organization_social scope
 *   LINKEDIN_ORGANIZATION_ID — Numeric company page ID (e.g. "12345678")
 */

const BASE = 'https://api.linkedin.com/v2'

function headers(extra: Record<string, string> = {}) {
  return {
    Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
    'X-Restli-Protocol-Version': '2.0.0',
    ...extra,
  }
}

/**
 * Upload an image from a public URL to LinkedIn's media store.
 * Returns the LinkedIn asset URN (e.g. "urn:li:digitalmediaAsset:...").
 */
export async function uploadImageToLinkedIn(imageUrl: string): Promise<string> {
  const orgUrn = `urn:li:organization:${process.env.LINKEDIN_ORGANIZATION_ID}`

  // Step 1: Register the upload
  const registerRes = await fetch(`${BASE}/assets?action=registerUpload`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      registerUploadRequest: {
        recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
        owner: orgUrn,
        serviceRelationships: [
          {
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent',
          },
        ],
      },
    }),
  })

  if (!registerRes.ok) {
    const body = await registerRes.text()
    throw new Error(`LinkedIn registerUpload failed (${registerRes.status}): ${body}`)
  }

  const registerData = await registerRes.json()
  const uploadUrl: string =
    registerData.value.uploadMechanism[
      'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
    ].uploadUrl
  const assetUrn: string = registerData.value.asset

  // Step 2: Fetch the image binary from the public URL
  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error(`Failed to fetch image from ${imageUrl}: ${imgRes.status}`)
  const imgBuffer = await imgRes.arrayBuffer()

  // Step 3: Upload binary to LinkedIn
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: headers({ 'Content-Type': 'image/png' }),
    body: imgBuffer,
  })

  if (!uploadRes.ok && uploadRes.status !== 201) {
    const body = await uploadRes.text()
    throw new Error(`LinkedIn image upload failed (${uploadRes.status}): ${body}`)
  }

  return assetUrn
}

/**
 * Create a LinkedIn UGC post (text + optional image) on the company page.
 * Returns the post URN.
 */
export async function createLinkedInPost(
  text: string,
  imageAssetUrn?: string
): Promise<string> {
  const orgUrn = `urn:li:organization:${process.env.LINKEDIN_ORGANIZATION_ID}`

  const media = imageAssetUrn
    ? [
        {
          status: 'READY',
          description: { text: '' },
          media: imageAssetUrn,
          title: { text: '' },
        },
      ]
    : undefined

  const body = {
    author: orgUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: imageAssetUrn ? 'IMAGE' : 'NONE',
        ...(media ? { media } : {}),
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  }

  const res = await fetch(`${BASE}/ugcPosts`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`LinkedIn ugcPosts failed (${res.status}): ${errBody}`)
  }

  const postId = res.headers.get('x-restli-id') ?? 'unknown'
  return postId
}
