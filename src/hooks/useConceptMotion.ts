import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Drives all motion for the concept single-pager: custom cursor, hero parallax,
 * the pinned word-by-word statement scrub, settle-in reveals, magnetic pills,
 * the drag/arrow portfolio carousel and the Vimeo lightbox.
 *
 * Ported from the approved concept's vanilla IIFE into a single mount effect so
 * it composes with React. Everything it touches is registered for teardown via
 * gsap.context() plus explicit listener removal, so StrictMode double-mounts and
 * route changes leave nothing behind.
 */
export function useConceptMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches
    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      /* custom cursor */
      if (fine && !reduced) {
        const cur = document.getElementById('cur')
        if (cur) {
          const onMove = (e: MouseEvent) => {
            gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' })
          }
          window.addEventListener('mousemove', onMove)
          cleanups.push(() => window.removeEventListener('mousemove', onMove))

          const targets = document.querySelectorAll<HTMLElement>('[data-cursor], .reel-card, .pill')
          targets.forEach((el) => {
            const enter = () => cur.classList.add('big')
            const leave = () => cur.classList.remove('big')
            el.addEventListener('mouseenter', enter)
            el.addEventListener('mouseleave', leave)
            cleanups.push(() => {
              el.removeEventListener('mouseenter', enter)
              el.removeEventListener('mouseleave', leave)
            })
          })
        }
      }

      /* hero parallax */
      if (!reduced) {
        gsap.to('#heroImg', {
          yPercent: 8,
          scale: 1.16,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      }

      /* pinned statement scrubber */
      const words = gsap.utils.toArray<HTMLElement>('[data-w]')
      const scrubFill = document.getElementById('scrubFill')
      ScrollTrigger.create({
        trigger: '#statement',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (scrubFill) scrubFill.style.width = p * 100 + '%'
          const per = 1 / words.length
          words.forEach((w, i) => {
            const t = Math.min(Math.max((p - i * per) / per, 0), 1)
            const isAccent = w.classList.contains('accent')
            w.style.color =
              t > 0.5
                ? isAccent
                  ? 'var(--terracotta)'
                  : 'var(--cream)'
                : 'var(--cream-faint)'
          })
        },
      })

      /* gentle settle-in (transform only, never opacity 0) */
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('.reel-card, .principle').forEach((el) => {
          gsap.from(el, {
            y: 28,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          })
        })
      }

      /* magnetic pills */
      if (fine && !reduced) {
        document.querySelectorAll<HTMLElement>('.pill').forEach((btn) => {
          const moveX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
          const moveY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect()
            moveX((e.clientX - r.left - r.width / 2) * 0.35)
            moveY((e.clientY - r.top - r.height / 2) * 0.35)
          }
          const reset = () => {
            moveX(0)
            moveY(0)
          }
          btn.addEventListener('mousemove', move)
          btn.addEventListener('mouseleave', reset)
          cleanups.push(() => {
            btn.removeEventListener('mousemove', move)
            btn.removeEventListener('mouseleave', reset)
          })
        })
      }
    })

    /* ---------- lightbox: real Vimeo playback ---------- */
    const lightbox = document.getElementById('lightbox')
    const lbEmbed = document.getElementById('lightboxEmbed')
    const lbClose = document.getElementById('lightboxClose')

    function openLightbox(vimeoId?: string | null, title?: string | null) {
      if (!vimeoId || !lbEmbed || !lightbox) return
      lbEmbed.innerHTML =
        '<iframe src="https://player.vimeo.com/video/' +
        vimeoId +
        '?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" frameborder="0" ' +
        'allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" ' +
        'referrerpolicy="strict-origin-when-cross-origin" title="' +
        (title || 'AIR film') +
        '"></iframe>'
      lightbox.classList.add('open')
      lightbox.setAttribute('aria-hidden', 'false')
      document.body.style.overflow = 'hidden'
    }
    function closeLightbox() {
      if (!lightbox || !lbEmbed) return
      lightbox.classList.remove('open')
      lightbox.setAttribute('aria-hidden', 'true')
      lbEmbed.innerHTML = ''
      document.body.style.overflow = ''
    }

    /* ---------- carousel: drag-to-scroll + arrows + index ---------- */
    const track = document.getElementById('track')
    if (track) {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('.reel-card'))
      const idxDot = document.getElementById('idxDot')
      const idxCurrent = document.getElementById('idxCurrent')
      const idxTotal = document.getElementById('idxTotal')
      const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement | null
      const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement | null
      if (idxTotal) idxTotal.textContent = String(cards.length).padStart(2, '0')

      const step = () => {
        const card = cards[0]
        const gap = parseFloat(getComputedStyle(track).gap) || 0
        return card.getBoundingClientRect().width + gap
      }
      const updateIndex = () => {
        const max = track.scrollWidth - track.clientWidth
        const p = max > 0 ? track.scrollLeft / max : 0
        if (idxDot) idxDot.style.left = p * 100 + '%'
        const n = Math.round(p * (cards.length - 1)) + 1
        if (idxCurrent) idxCurrent.textContent = String(n).padStart(2, '0')
        if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4
        if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 4
      }
      const onScroll = () => requestAnimationFrame(updateIndex)
      track.addEventListener('scroll', onScroll, { passive: true })
      updateIndex()
      cleanups.push(() => track.removeEventListener('scroll', onScroll))

      const onPrev = () => track.scrollBy({ left: -step(), behavior: 'smooth' })
      const onNext = () => track.scrollBy({ left: step(), behavior: 'smooth' })
      prevBtn?.addEventListener('click', onPrev)
      nextBtn?.addEventListener('click', onNext)
      cleanups.push(() => {
        prevBtn?.removeEventListener('click', onPrev)
        nextBtn?.removeEventListener('click', onNext)
      })

      let isDown = false
      let startX = 0
      let startScroll = 0
      let moved = false
      const down = (e: PointerEvent) => {
        isDown = true
        moved = false
        startX = e.clientX
        startScroll = track.scrollLeft
        track.classList.add('dragging')
        track.setPointerCapture(e.pointerId)
      }
      const pmove = (e: PointerEvent) => {
        if (!isDown) return
        const dx = e.clientX - startX
        if (Math.abs(dx) > 4) moved = true
        track.scrollLeft = startScroll - dx
      }
      const endDrag = () => {
        isDown = false
        track.classList.remove('dragging')
      }
      const onClick = (e: MouseEvent) => {
        if (moved) {
          e.preventDefault()
          moved = false
          return
        }
        const card = (e.target as HTMLElement).closest<HTMLElement>('.reel-card')
        if (card) {
          e.preventDefault()
          openLightbox(card.dataset.vimeo, card.dataset.title)
        }
      }
      track.addEventListener('pointerdown', down)
      track.addEventListener('pointermove', pmove)
      track.addEventListener('pointerup', endDrag)
      track.addEventListener('pointerleave', endDrag)
      track.addEventListener('click', onClick, true)
      cleanups.push(() => {
        track.removeEventListener('pointerdown', down)
        track.removeEventListener('pointermove', pmove)
        track.removeEventListener('pointerup', endDrag)
        track.removeEventListener('pointerleave', endDrag)
        track.removeEventListener('click', onClick, true)
      })
    }

    const onCloseClick = () => closeLightbox()
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === lightbox) closeLightbox()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    lbClose?.addEventListener('click', onCloseClick)
    lightbox?.addEventListener('click', onBackdrop)
    document.addEventListener('keydown', onKey)
    cleanups.push(() => {
      lbClose?.removeEventListener('click', onCloseClick)
      lightbox?.removeEventListener('click', onBackdrop)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    })

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])
}
