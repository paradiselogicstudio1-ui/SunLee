import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './home.css'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 240
const FRAME_SPEED = 2.0
const IMAGE_SCALE = 0.85

const frameSrc = (i: number) => `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`

type Section = {
  id: string
  align: 'left' | 'right'
  theme: 'light' | 'dark'
  animation: 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'rotate-in' | 'stagger-up' | 'clip-reveal'
  enter: number
  leave: number
  label: string
  heading: string
  body: string
}

const sections: Section[] = [
  {
    id: 'sourcing',
    align: 'left',
    theme: 'light',
    animation: 'fade-up',
    enter: 12,
    leave: 28,
    label: '001 / Sourcing & Selection',
    heading: 'Sourcing & Selection',
    body: 'We travel to quarries across five continents, evaluating block by block for veining, density, and character. Every material we recommend — natural or engineered — is chosen to match the story your project is telling.',
  },
  {
    id: 'production',
    align: 'right',
    theme: 'dark',
    animation: 'slide-right',
    enter: 24,
    leave: 40,
    label: '002 / Production Oversight',
    heading: 'Production Oversight',
    body: 'From block to slab, we oversee cutting, polishing, and quality control on the factory floor — ensuring tolerances, finishes, and batch consistency meet the standard your design demands.',
  },
  {
    id: 'installation',
    align: 'left',
    theme: 'light',
    animation: 'scale-up',
    enter: 36,
    leave: 52,
    label: '003 / Installation Mastery',
    heading: 'Installation Mastery',
    body: 'On site, precision is everything. We supervise fabrication, templating, and fitting — coordinating with architects and contractors so every seam, edge, and reveal lands exactly as drawn.',
  },
  {
    id: 'maintenance',
    align: 'right',
    theme: 'dark',
    animation: 'rotate-in',
    enter: 48,
    leave: 64,
    label: '004 / Enduring Maintenance',
    heading: 'Enduring Maintenance',
    body: "Stone is a lifetime material when it's cared for. We design sealing, cleaning, and restoration programs that protect surfaces for decades — preserving the investment long after installation.",
  },
  {
    id: 'network',
    align: 'left',
    theme: 'light',
    animation: 'clip-reveal',
    enter: 60,
    leave: 76,
    label: '005 / Global Network',
    heading: 'A Global Network',
    body: 'Decades of relationships with quarries, fabricators, and craftsmen worldwide mean rare materials and skilled hands are never out of reach — wherever your project is built.',
  },
]

const STATS_RANGE = { enter: 72, leave: 88 }
const CTA_RANGE = { enter: 84, leave: 100 }
const MARQUEE_RANGE = { enter: 28, leave: 70 }

const stats = [
  { value: 18, suffix: '', label: 'Years of Consultancy' },
  { value: 240, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Quarry Partners' },
  { value: 12, suffix: '', label: 'Countries Served' },
]

const heroWords = ['Crafted', 'in', 'Stone']

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const marqueeWrapRef = useRef<HTMLDivElement>(null)
  const marqueeTextRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const loaderBarRef = useRef<HTMLDivElement>(null)
  const loaderPercentRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = rootRef.current!
    const canvas = canvasRef.current!
    const canvasWrap = canvasWrapRef.current!
    const hero = heroRef.current!
    const overlay = overlayRef.current!
    const marqueeWrap = marqueeWrapRef.current!
    const marqueeText = marqueeTextRef.current!
    const scrollContainer = scrollContainerRef.current!
    const loader = loaderRef.current!

    const ctx2d = canvas.getContext('2d')!
    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    let bgColor = '#14130f'
    let currentFrame = -1
    let cancelled = false

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function sampleBgColor(img: HTMLImageElement) {
      const s = document.createElement('canvas')
      s.width = 4
      s.height = 4
      const sctx = s.getContext('2d')
      if (!sctx) return bgColor
      sctx.drawImage(img, 0, 0, 4, 4)
      const d = sctx.getImageData(0, 0, 1, 1).data
      return `rgb(${d[0]}, ${d[1]}, ${d[2]})`
    }

    function drawFrame(index: number) {
      const img = images[index]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const cw = window.innerWidth
      const ch = window.innerHeight
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx2d.fillStyle = bgColor
      ctx2d.fillRect(0, 0, cw, ch)
      ctx2d.drawImage(img, dx, dy, dw, dh)
    }

    // ---- Frame preloading ----
    let loadedCount = 0
    function loadImage(i: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(i)
        const done = () => {
          loadedCount++
          if (!cancelled) setProgress(Math.round((loadedCount / FRAME_COUNT) * 100))
          resolve()
        }
        img.onload = done
        img.onerror = done
        images[i] = img
      })
    }

    async function preload() {
      resizeCanvas()
      // Phase 1: fast first paint
      await Promise.all(Array.from({ length: 10 }, (_, i) => loadImage(i)))
      if (cancelled) return
      bgColor = sampleBgColor(images[0])
      drawFrame(0)

      // Phase 2: load the rest in batches
      const BATCH = 24
      for (let start = 10; start < FRAME_COUNT; start += BATCH) {
        const batch = []
        for (let i = start; i < Math.min(start + BATCH, FRAME_COUNT); i++) {
          batch.push(loadImage(i))
        }
        await Promise.all(batch)
        if (cancelled) return
      }

      if (cancelled) return
      finishLoading()
    }

    function finishLoading() {
      loader.classList.add('hidden')
      ScrollTrigger.refresh()
      runHeroIntro()
    }

    // ---- Lenis smooth scroll ----
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // ---- Position scroll sections at the midpoint of their enter/leave range ----
    const sectionEls = Array.from(root.querySelectorAll<HTMLElement>('.scroll-section[data-enter]'))
    sectionEls.forEach((el) => {
      const enter = parseFloat(el.dataset.enter || '0')
      const leave = parseFloat(el.dataset.leave || '0')
      const mid = (enter + leave) / 2
      el.style.top = `${mid}%`
      el.style.transform = 'translateY(-50%)'
    })

    // All gsap/ScrollTrigger animations are created inside this context so that
    // ctx.revert() can cleanly undo inline styles on cleanup (required for
    // React StrictMode's mount -> cleanup -> mount double-invoke in dev).
    const ctx = gsap.context(() => {
      // ---- Section entrance animations ----
      sectionEls.forEach((el) => {
        const type = el.dataset.animation
        const persist = el.dataset.persist === 'true'
        const children = el.querySelectorAll('.section-label, .section-heading, .section-body, .cta-actions, .stat')

        const scrollTrigger = {
          trigger: el,
          start: 'top 78%',
          end: 'bottom 22%',
          toggleActions: persist ? 'play none none none' : 'play none none reverse',
        }
        switch (type) {
          case 'fade-up':
            gsap.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger })
            break
          case 'slide-left':
            gsap.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out', scrollTrigger })
            break
          case 'slide-right':
            gsap.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out', scrollTrigger })
            break
          case 'scale-up':
            gsap.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power2.out', scrollTrigger })
            break
          case 'rotate-in':
            gsap.from(children, { y: 40, rotation: 3, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger })
            break
          case 'stagger-up':
            gsap.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger })
            break
          case 'clip-reveal':
            gsap.from(children, { clipPath: 'inset(100% 0 0 0)', opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power4.inOut', scrollTrigger })
            break
        }
      })

      // ---- Counter animations ----
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.value || '0')
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: decimals === 0 ? 1 : 0.01 },
            scrollTrigger: {
              trigger: el.closest('.scroll-section') as Element,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // ---- Master scroll-bound timeline ----
      const fadeRange = 0.04
      const overlayEnter = STATS_RANGE.enter / 100
      const overlayLeave = STATS_RANGE.leave / 100
      const marqueeEnter = MARQUEE_RANGE.enter / 100
      const marqueeLeave = MARQUEE_RANGE.leave / 100

      ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress

          // Frame playback
          const accelerated = Math.min(p * FRAME_SPEED, 1)
          const index = Math.min(Math.floor(accelerated * (FRAME_COUNT - 1)), FRAME_COUNT - 1)
          if (index !== currentFrame) {
            currentFrame = index
            requestAnimationFrame(() => drawFrame(index))
            if (index % 20 === 0 && images[index]?.complete) {
              bgColor = sampleBgColor(images[index])
            }
          }

          // Hero fade + circle-wipe reveal
          hero.style.opacity = String(Math.max(0, 1 - p * 15))
          hero.style.pointerEvents = p > 0.02 ? 'none' : 'auto'
          const wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.06))
          const radius = wipeProgress * 75
          canvasWrap.style.clipPath = `circle(${radius}% at 50% 50%)`

          // Dark overlay (stats section)
          let opacity = 0
          if (p >= overlayEnter - fadeRange && p <= overlayEnter) {
            opacity = (p - (overlayEnter - fadeRange)) / fadeRange
          } else if (p > overlayEnter && p < overlayLeave) {
            opacity = 0.9
          } else if (p >= overlayLeave && p <= overlayLeave + fadeRange) {
            opacity = 0.9 * (1 - (p - overlayLeave) / fadeRange)
          }
          overlay.style.opacity = String(opacity)

          // Marquee slide + fade
          marqueeText.style.transform = `translateX(${p * -120}%)`
          let mOpacity = 0
          if (p >= marqueeEnter - fadeRange && p <= marqueeEnter) {
            mOpacity = (p - (marqueeEnter - fadeRange)) / fadeRange
          } else if (p > marqueeEnter && p < marqueeLeave) {
            mOpacity = 1
          } else if (p >= marqueeLeave && p <= marqueeLeave + fadeRange) {
            mOpacity = 1 - (p - marqueeLeave) / fadeRange
          }
          marqueeWrap.style.opacity = String(mOpacity)
        },
      })
    }, root)

    // ---- Hero intro (letters/words rise on load) ----
    function runHeroIntro() {
      ctx.add(() => {
        gsap.fromTo(
          hero.querySelectorAll('.hero-heading .word span'),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out' }
        )
        gsap.fromTo(
          hero.querySelectorAll('.section-label, .hero-tagline, .scroll-indicator'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.4, ease: 'power3.out' }
        )
      })
    }

    // ---- Resize handling ----
    function handleResize() {
      resizeCanvas()
      if (currentFrame >= 0) drawFrame(currentFrame)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    preload()

    return () => {
      cancelled = true
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <div className="home-page" ref={rootRef}>
      {/* Loader */}
      <div id="loader" ref={loaderRef}>
        <div className="loader-brand">Sanli</div>
        <div id="loader-bar-track">
          <div id="loader-bar" ref={loaderBarRef} style={{ width: `${progress}%` }} />
        </div>
        <div id="loader-percent" ref={loaderPercentRef}>{progress}%</div>
      </div>

      {/* Hero */}
      <section className="hero-standalone" ref={heroRef}>
        <span className="section-label">Sanli — Stone Consultancy</span>
        <h1 className="hero-heading">
          {heroWords.map((word) => (
            <span className="word" key={word}>
              <span>{word}&nbsp;</span>
            </span>
          ))}
        </h1>
        <p className="hero-tagline">
          From quarry to finished surface — Sanli guides architects, designers, and fabricators through sourcing,
          production, and installation, end to end.
        </p>
        <div className="scroll-indicator">
          <span className="line" />
          Scroll
        </div>
      </section>

      {/* Canvas */}
      <div className="canvas-wrap" ref={canvasWrapRef}>
        <canvas id="canvas" ref={canvasRef} />
      </div>

      {/* Dark overlay */}
      <div id="dark-overlay" ref={overlayRef} />

      {/* Marquee */}
      <div className="marquee-wrap" ref={marqueeWrapRef}>
        <div className="marquee-text" ref={marqueeTextRef}>
          NATURAL STONE — ENGINEERED PRECISION — ENDURING DESIGN — NATURAL STONE — ENGINEERED PRECISION —
        </div>
      </div>

      {/* Scroll-driven sections */}
      <div className="scroll-container" ref={scrollContainerRef}>
        {sections.map((s) => (
          <section
            key={s.id}
            className={`scroll-section section-content align-${s.align} theme-${s.theme}`}
            data-enter={s.enter}
            data-leave={s.leave}
            data-animation={s.animation}
          >
            <div className="section-inner">
              <span className="section-label">{s.label}</span>
              <h2 className="section-heading">{s.heading}</h2>
              <p className="section-body">{s.body}</p>
            </div>
          </section>
        ))}

        {/* Stats */}
        <section
          className="scroll-section section-stats"
          data-enter={STATS_RANGE.enter}
          data-leave={STATS_RANGE.leave}
          data-animation="stagger-up"
        >
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <span>
                  <span className="stat-number" data-value={stat.value} data-decimals="0">0</span>
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="scroll-section section-content align-right theme-dark"
          data-enter={CTA_RANGE.enter}
          data-leave={CTA_RANGE.leave}
          data-animation="slide-left"
          data-persist="true"
        >
          <div className="section-inner">
            <span className="section-label">006 / Begin Your Project</span>
            <h2 className="section-heading">Let's Build Something Lasting</h2>
            <p className="section-body">
              Whether you're sourcing rare material or refining a production line, our consultants are ready to talk
              through your project.
            </p>
            <div className="cta-actions">
              <Link to="/materials-consultancy" className="cta-button primary">Materials Consultancy</Link>
              <Link to="/production-consultancy" className="cta-button secondary">Production Consultancy</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
