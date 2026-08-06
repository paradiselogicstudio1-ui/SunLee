import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../../Logo.png'
import './home.css'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 240
const FRAME_SPEED = 1
const IMAGE_SCALE = 1

const frameSrc = (i: number) => `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`

type Section = {
  id: string
  align: 'left' | 'right'
  theme: 'light' | 'dark'
  animation: 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'rotate-in' | 'stagger-up' | 'clip-reveal'
  enter: number
  leave: number
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
    heading: 'Sourcing & Selection',
    body: 'We travel to quarries across five continents, evaluating block by block for veining, density, and character. Every material we recommend, natural or engineered, is chosen to match the story your project is telling.',
  },
  {
    id: 'production',
    align: 'right',
    theme: 'dark',
    animation: 'slide-right',
    enter: 29,
    leave: 45,
    heading: 'Production Oversight',
    body: 'From block to slab, we oversee cutting, polishing, and quality control on the factory floor, ensuring tolerances, finishes, and batch consistency meet the standard your design demands.',
  },
  {
    id: 'installation',
    align: 'left',
    theme: 'light',
    animation: 'scale-up',
    enter: 46,
    leave: 62,
    heading: 'Installation Mastery',
    body: 'On site, precision is everything. We supervise fabrication, templating, and fitting, coordinating with architects and contractors so every seam, edge, and reveal lands exactly as drawn.',
  },
  {
    id: 'maintenance',
    align: 'right',
    theme: 'dark',
    animation: 'rotate-in',
    enter: 63,
    leave: 79,
    heading: 'Enduring Maintenance',
    body: "Stone is a lifetime material when it's cared for. We design sealing, cleaning, and restoration programs that protect surfaces for decades, preserving the investment long after installation.",
  },
  {
    id: 'network',
    align: 'left',
    theme: 'light',
    animation: 'clip-reveal',
    enter: 80,
    leave: 96,
    heading: 'A Global Network',
    body: 'Decades of relationships with quarries, fabricators, and craftsmen worldwide mean rare materials and skilled hands are never out of reach, wherever your project is built.',
  },
]

const STATS_RANGE = { enter: 70, leave: 84 }
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const canvas = canvasRef.current!
    const canvasWrap = canvasWrapRef.current!
    const hero = heroRef.current!
    const overlay = overlayRef.current!
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
      const sample = document.createElement('canvas')
      sample.width = 4
      sample.height = 4
      const sampleCtx = sample.getContext('2d')
      if (!sampleCtx) return bgColor
      sampleCtx.drawImage(img, 0, 0, 4, 4)
      const pixel = sampleCtx.getImageData(0, 0, 1, 1).data
      return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
    }

    function drawFrame(index: number) {
      const img = images[index]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const scale = Math.max(viewportWidth / img.naturalWidth, viewportHeight / img.naturalHeight) * IMAGE_SCALE
      const width = img.naturalWidth * scale
      const height = img.naturalHeight * scale
      ctx2d.fillStyle = bgColor
      ctx2d.fillRect(0, 0, viewportWidth, viewportHeight)
      ctx2d.drawImage(img, (viewportWidth - width) / 2, (viewportHeight - height) / 2, width, height)
    }

    function loadImage(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(index)
        const done = () => resolve()
        img.onload = done
        img.onerror = done
        images[index] = img
      })
    }

    async function preloadFrames() {
      resizeCanvas()
      await Promise.all(Array.from({ length: 10 }, (_, index) => loadImage(index)))
      if (cancelled) return
      bgColor = sampleBgColor(images[0])
      currentFrame = 0
      drawFrame(0)

      const batchSize = 24
      for (let start = 10; start < FRAME_COUNT; start += batchSize) {
        const batch = []
        for (let index = start; index < Math.min(start + batchSize, FRAME_COUNT); index++) {
          batch.push(loadImage(index))
        }
        await Promise.all(batch)
        if (cancelled) return
      }

      finishLoading()
    }

    function finishLoading() {
      if (cancelled || loader.classList.contains('hidden')) return
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

      // ---- Master scroll-bound timeline ----
      const fadeRange = 0.04
      const overlayEnter = STATS_RANGE.enter / 100
      const overlayLeave = STATS_RANGE.leave / 100
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress

          // Bind scroll progress to the extracted New_Video frame sequence.
          const accelerated = Math.min(p * FRAME_SPEED, 1)
          const frameIndex = Math.min(Math.floor(accelerated * (FRAME_COUNT - 1)), FRAME_COUNT - 1)
          if (frameIndex !== currentFrame) {
            currentFrame = frameIndex
            requestAnimationFrame(() => drawFrame(frameIndex))
            if (frameIndex % 20 === 0 && images[frameIndex]?.complete) {
              bgColor = sampleBgColor(images[frameIndex])
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
        },
      })
    }, root)

    // ---- Hero intro (letters/words rise on load) ----
    function runHeroIntro() {
      ctx.add(() => {
        gsap.fromTo(
          hero.querySelectorAll('.hero-heading .word span'),
          { yPercent: 110 },
          { yPercent: 0, duration: 2.6, stagger: 0.2, ease: 'power4.out' }
        )
        gsap.fromTo(
          hero.querySelectorAll('.section-label, .hero-tagline, .scroll-indicator'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.4, ease: 'power3.out' }
        )
      })
    }

    // ---- Canvas resize handling ----
    function handleResize() {
      resizeCanvas()
      if (currentFrame >= 0) drawFrame(currentFrame)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    void preloadFrames()

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
        <img className="loader-logo" src={logo} alt="FUCINA CHIANI" />
        <div id="loader-bar-track">
          <div id="loader-bar" />
        </div>
      </div>

      {/* Hero */}
      <section className="hero-standalone" ref={heroRef}>
        <h1 className="hero-heading">
          {heroWords.map((word) => (
            <span className="word" key={word}>
              <span>{word}&nbsp;</span>
            </span>
          ))}
        </h1>
        <p className="hero-tagline">
          From quarry to finished surface, Sanli guides architects, designers, and fabricators through sourcing,
          production, and installation, end to end.
        </p>
        <div className="scroll-indicator">
          <span className="line" />
          Scroll
        </div>
      </section>

      {/* Scroll-controlled frame canvas */}
      <div className="canvas-wrap" ref={canvasWrapRef}>
        <canvas id="canvas" ref={canvasRef} aria-hidden="true" />
      </div>

      {/* Dark overlay */}
      <div id="dark-overlay" ref={overlayRef} />

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
              <h2 className="section-heading">{s.heading}</h2>
              <p className="section-body">{s.body}</p>
            </div>
          </section>
        ))}

      </div>

      <footer className="site-footer">
        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-text">
            NATURAL STONE, ENDURING DESIGN, ENGINEERED PRECISION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NATURAL STONE,
            ENDURING DESIGN, ENGINEERED PRECISION
          </div>
        </div>

        <section className="footer-stats" aria-label="Company statistics">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <span>
                  <span className="stat-number">{stat.value}</span>
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="footer-meta">
          <div className="footer-social" aria-label="Social media">
            <span className="footer-label">Social media</span>
            <span className="footer-link footer-placeholder">LinkedIn</span>
            <span className="footer-link footer-placeholder">Instagram</span>
          </div>
          <a className="footer-link" href="/production-consultancy">Contact us</a>
          <span className="footer-vat">P. IVA: [inserire numero]</span>
        </div>
      </footer>
    </div>
  )
}
