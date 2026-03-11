/**
 * Freepik Mystic image generation client
 * Generates an image from a text prompt, stores it in Supabase Storage,
 * and returns a public URL.
 *
 * Required env vars:
 *   FREEPIK_API_KEY    — From freepik.com/api
 *   SUPABASE_URL       — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY — Service role key for storage uploads
 */

const FREEPIK_BASE = 'https://api.freepik.com/v1/ai/text-to-image'
const POLL_INTERVAL_MS = 4000
const MAX_POLLS = 20 // 80 seconds max

interface FreepikTaskResponse {
  data: {
    task_id: string
    status: string
  }
}

interface FreepikResultResponse {
  data: {
    status: 'WAITING' | 'IN_PROGRESS' | 'DONE' | 'FAILED'
    generated?: Array<{ base64: string }>
  }
}

/**
 * Generate an image from a prompt and return a public Supabase Storage URL.
 */
export async function generateImage(prompt: string, revelationId: string): Promise<string> {
  // Step 1: Submit generation task
  const createRes = await fetch(FREEPIK_BASE, {
    method: 'POST',
    headers: {
      'x-freepik-api-key': process.env.FREEPIK_API_KEY!,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      prompt,
      num_images: 1,
      image: { size: 'square_1_1' },
      styling: {
        style: 'photo',
        color: 'desaturated',
        lightning: 'cinematic',
        framing: 'wide_angle',
      },
    }),
  })

  if (!createRes.ok) {
    const body = await createRes.text()
    throw new Error(`Freepik create task failed (${createRes.status}): ${body}`)
  }

  const createData: FreepikTaskResponse = await createRes.json()
  const taskId = createData.data.task_id

  // Step 2: Poll for completion
  let base64Image: string | null = null
  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(POLL_INTERVAL_MS)

    const pollRes = await fetch(`${FREEPIK_BASE}/${taskId}`, {
      headers: {
        'x-freepik-api-key': process.env.FREEPIK_API_KEY!,
        Accept: 'application/json',
      },
    })

    if (!pollRes.ok) continue

    const pollData: FreepikResultResponse = await pollRes.json()

    if (pollData.data.status === 'DONE' && pollData.data.generated?.[0]?.base64) {
      base64Image = pollData.data.generated[0].base64
      break
    }

    if (pollData.data.status === 'FAILED') {
      throw new Error(`Freepik generation failed for task ${taskId}`)
    }
  }

  if (!base64Image) {
    throw new Error(`Freepik image generation timed out after ${MAX_POLLS * POLL_INTERVAL_MS / 1000}s`)
  }

  // Step 3: Upload to Supabase Storage
  const imageBuffer = base64ToArrayBuffer(base64Image)
  const filename = `revelations/${revelationId}.png`

  const uploadRes = await fetch(
    `${process.env.SUPABASE_URL}/storage/v1/object/linkedin-images/${filename}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'image/png',
        'x-upsert': 'true',
      },
      body: imageBuffer,
    }
  )

  if (!uploadRes.ok) {
    const body = await uploadRes.text()
    throw new Error(`Supabase Storage upload failed (${uploadRes.status}): ${body}`)
  }

  // Return the public URL
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/linkedin-images/${filename}`
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  // Strip data URI prefix if present
  const raw = base64.replace(/^data:image\/\w+;base64,/, '')
  const binary = atob(raw)
  const buffer = new ArrayBuffer(binary.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i)
  }
  return buffer
}
