"use client"

import { useEffect, useRef } from "react"

// ─── Config — adjust these to taste ────────────────────────────────────────
const GRAIN_INTENSITY = 0.55   // canvas element opacity 0→1 (higher = more grain)
const DRIFT_SPEED     = 0.028  // oscillation speed in rad/s (lower = slower drift)
const GRAIN_REFRESH   = 5      // regenerate noise every N frames (lower = more "alive")
const GRAIN_SCALE     = 0.48   // offscreen canvas scale vs screen (lower = chunkier grain)
// ────────────────────────────────────────────────────────────────────────────

export default function FilmGrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Capture as non-nullable so inner functions satisfy TypeScript
    const el: HTMLCanvasElement = canvas

    const ctx = el.getContext("2d")
    if (!ctx) return

    const offscreen = document.createElement("canvas")
    let gCtx: CanvasRenderingContext2D | null = null
    let animId = 0
    let frame  = 0
    const t0   = Date.now()

    function resize() {
      el.width  = window.innerWidth
      el.height = window.innerHeight
      offscreen.width  = Math.ceil(el.width  * GRAIN_SCALE)
      offscreen.height = Math.ceil(el.height * GRAIN_SCALE)
      gCtx = offscreen.getContext("2d")
      if (gCtx) generateGrain()
    }

    function generateGrain() {
      if (!gCtx) return
      const w = offscreen.width
      const h = offscreen.height
      const img = gCtx.createImageData(w, h)
      const d   = img.data

      for (let i = 0; i < d.length; i += 4) {
        // ~58 % of pixels contribute to the grain, the rest stay transparent
        if (Math.random() < 0.42) {
          d[i + 3] = 0
          continue
        }
        const v   = (Math.random() * 255) | 0
        d[i]      = v
        d[i + 1]  = v
        d[i + 2]  = v
        // Vary each visible pixel's alpha for non-uniform density
        d[i + 3]  = ((Math.random() * 160 + 95) | 0)
      }

      gCtx.putImageData(img, 0, 0)
    }

    function render() {
      animId = requestAnimationFrame(render)
      frame++

      if (frame % GRAIN_REFRESH === 0) generateGrain()

      // Slow, smooth sinusoidal drift — almost imperceptible
      const t  = (Date.now() - t0) / 1000
      const dx = Math.sin(t * DRIFT_SPEED)        * el.width  * 0.007
      const dy = Math.cos(t * DRIFT_SPEED * 0.61) * el.height * 0.005

      ctx.clearRect(0, 0, el.width, el.height)
      ctx.save()
      ctx.translate(dx, dy)
      ctx.drawImage(offscreen, 0, 0, el.width, el.height)
      ctx.restore()
    }

    resize()
    render()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <>
      {/* Layer 1 — nebulous base gradients (mimics soft spray/airbrush shapes) */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background: `
            radial-gradient(ellipse 60% 54% at 17% 26%, #7e7e7e 0%, #3c3c3c 36%, #161616 66%, transparent 84%),
            radial-gradient(ellipse 46% 42% at  5% 88%, #565656 0%, #282828 50%, transparent 80%),
            radial-gradient(ellipse 30% 32% at 70% 11%, #252525 0%, transparent 66%),
            radial-gradient(ellipse 48% 44% at 90% 80%, #131313 0%, transparent 74%),
            #0f0f0f
          `,
        }}
      />

      {/* Layer 2 — soft vignette to deepen edges */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Layer 3 — animated grain canvas composited via overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: GRAIN_INTENSITY,
        }}
      />
    </>
  )
}
