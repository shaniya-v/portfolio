import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import sem1Img from '../../assets/sem1.jpeg'
import sem3Img from '../../assets/sem3.jpeg'
import sem4Img from '../../assets/sem4.jpeg'
import sem5Img from '../../assets/sem5.jpeg'
import './Education.css'

/* ─── Data ───────────────────────────────────────────────── */
const milestones = [
  {
    id: 'hs',
    label: 'Higher Secondary',
    institution: "St. Anthony's Higher Secondary School",
    location: 'Chennai, Tamil Nadu',
    score: '83%',
    scoreLabel: 'Score',
    year: '2021 – 2022',
    highlight: 'State Board · Science Stream',
    icon: '🏫',
    accent: '#a3e635',
  },
  {
    id: 's1',
    label: 'Semester 1',
    institution: "Stella Mary's College of Engineering",
    location: 'Chennai, Tamil Nadu',
    score: '9.12',
    scoreLabel: 'GPA',
    year: '2022 – 2023',
    highlight: 'B.E Computer Science & Engineering',
    icon: '📘',
    accent: '#00bfff',
    image: sem1Img,
  },
  {
    id: 's2',
    label: 'Semester 2',
    institution: "Stella Mary's College of Engineering",
    location: 'Chennai, Tamil Nadu',
    score: '9.18',
    scoreLabel: 'GPA',
    year: '2022 – 2023',
    highlight: "Dean's List · Top Performer",
    icon: '📗',
    accent: '#38bdf8',
  },
  {
    id: 's3',
    label: 'Semester 3',
    institution: "Stella Mary's College of Engineering",
    location: 'Chennai, Tamil Nadu',
    score: '9.24',
    scoreLabel: 'GPA',
    year: '2023 – 2024',
    highlight: 'Consistent Academic Excellence',
    icon: '📙',
    accent: '#00bfff',
    image: sem3Img,
  },
  {
    id: 's4',
    label: 'Semester 4',
    institution: "Stella Mary's College of Engineering",
    location: 'Chennai, Tamil Nadu',
    score: '9.06',
    scoreLabel: 'GPA',
    year: '2023 – 2024',
    highlight: 'Project Leadership · Innovation',
    icon: '📕',
    accent: '#38bdf8',
    image: sem4Img,
  },
  {
    id: 's5',
    label: 'Semester 5',
    institution: "Stella Mary's College of Engineering",
    location: 'Chennai, Tamil Nadu',
    score: '9.30',
    scoreLabel: 'GPA',
    year: '2024 – 2025',
    highlight: 'Highest CGPA · AI & ML Focus',
    icon: '🎓',
    accent: '#f59e0b',
    image: sem5Img,
  },
]

/* ─── Card ───────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.92, rotate: 2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 10,
      mass: 0.9
    }
  }
}

const Card = ({ m, index, onImageClick }) => (
  <motion.div
    className="edc-card"
    style={{ '--accent': m.accent }}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.15 }}
    whileHover={{ y: -8, scale: 1.03 }}
  >
    <div className="edc-accent-bar" />

    <div className="edc-card-head">
      <span className="edc-icon">{m.icon}</span>
      <div>
        <p className="edc-label">{m.label}</p>
        <p className="edc-year">{m.year}</p>
      </div>
    </div>

    <h3 className="edc-school">{m.institution}</h3>
    <p  className="edc-location">📍 {m.location}</p>

    <div className="edc-score-row">
      <span className="edc-score-val">{m.score}</span>
      <span className="edc-score-lbl">{m.scoreLabel}</span>
    </div>

    <p className="edc-note">
      <span className="edc-dot-small" />
      {m.highlight}
    </p>

    {m.image && (
      <div
        className="edc-transcript-thumb"
        onClick={() => onImageClick(m.image, m.label)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onImageClick(m.image, m.label)}
        aria-label={`View ${m.label} transcript`}
      >
        <img src={m.image} alt={`${m.label} transcript`} className="edc-transcript-img" />
        <div className="edc-transcript-overlay">
          <span className="edc-transcript-zoom">🔍 View Transcript</span>
        </div>
      </div>
    )}
  </motion.div>
)

/* ═══════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════ */
export default function Education() {
  const [lightbox, setLightbox] = useState(null) // { src, label }
  const outerRef = useRef(null)   // the full-page-height outer div
  const stickyRef = useRef(null)  // the 100vh pinned panel
  const trackRef  = useRef(null)  // the wide sliding strip

  /* maxX in a ref — avoids stale closures in event handlers */
  const maxXRef = useRef(0)

  /* Progress 0 → 1, spring-smoothed */
  const raw    = useMotionValue(0)
  const smooth = useSpring(raw, { stiffness: 55, damping: 20, restDelta: 0.0005 })

  /* ✅ Callback form — reads maxXRef every frame, no stale value */
  const x = useTransform(smooth, (p) => -p * maxXRef.current)

  /* ── Measure scrollable width ── */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      /* The track's full painted width minus the viewport width */
      maxXRef.current = Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
    }
    requestAnimationFrame(() => requestAnimationFrame(measure))
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* ══════════════════════════════════════════════════════════
     Wheel / trackpad interception
     
     FIX 1: Attach to the STICKY DIV element, not window.
             This fires only when the user's cursor is over
             the Education section — no global rect checks needed.
     
     FIX 2: Use both deltaY (mouse wheel / vertical trackpad)
             AND deltaX (horizontal trackpad swipe).
             Pick the dominant axis.
             This stops horizontal swipes from "leaving the site."
     
     FIX 3: Only engage when section has reached viewport top.
             Check stickyRef rect, not outerRef.
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const sticky = stickyRef.current
    if (!sticky) return

    const onWheel = (e) => {
      /* Which axis has more movement? Use that to drive journey. */
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)
      const delta = absX > absY ? e.deltaX : e.deltaY

      const p = raw.get()

      /* At journey start scrolling backward → release to prev section */
      if (p <= 0 && delta < 0) return
      /* At journey end scrolling forward → release to next section */
      if (p >= 0.999 && delta > 0) return

      /* ── Lock page scroll, drive horizontal progress ── */
      e.preventDefault()
      e.stopPropagation()

      /* 1200 = total scroll "effort" in px to complete journey.
         Tune up for slower, down for faster.                  */
      raw.set(Math.max(0, Math.min(1, p + delta / 1200)))
    }

    /* Attach directly to the sticky panel — fires only on hover */
    sticky.addEventListener('wheel', onWheel, { passive: false })
    return () => sticky.removeEventListener('wheel', onWheel)
  }, [raw])

  /* ── Touch support ── */
  useEffect(() => {
    const sticky = stickyRef.current
    if (!sticky) return

    let lastX = 0
    let lastY = 0

    const onStart = (e) => {
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }

    const onMove = (e) => {
      const dx = lastX - e.touches[0].clientX
      const dy = lastY - e.touches[0].clientY
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY

      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy
      const p = raw.get()

      if (p <= 0 && delta < 0) return
      if (p >= 0.999 && delta > 0) return

      e.preventDefault()
      raw.set(Math.max(0, Math.min(1, p + delta / 800)))
    }

    sticky.addEventListener('touchstart', onStart, { passive: true })
    sticky.addEventListener('touchmove',  onMove,  { passive: false })
    return () => {
      sticky.removeEventListener('touchstart', onStart)
      sticky.removeEventListener('touchmove',  onMove)
    }
  }, [raw])

  return (
    /*
      outerRef: the tall scroll canvas.
      Height is 400vh so the sticky panel has room to pin.
      useScroll is NOT used here — we drive progress manually via wheel events.
    */
    <div ref={outerRef} id="education" className="edc-outer">

      {/*
        stickyRef: pinned to viewport while outerRef scrolls.
        overflow:hidden clips the wide track.
        Wheel listener attaches here.
      */}
      <div ref={stickyRef} className="edc-sticky">

        {/* Heading */}
        <div className="edc-head">
          <h2 className="edc-title">EDUCATION</h2>
          <p  className="edc-subtitle">Scroll to journey through my academic path →</p>
        </div>

        {/* Horizontal journey strip */}
        <div className="edc-viewport">
          <motion.div ref={trackRef} className="edc-track" style={{ x }}>

            {/* Row 1: All cards perfectly level */}
            <div className="edc-cards-row">
              {milestones.map((m, i) => (
                <Card key={m.id} m={m} index={i} onImageClick={(src, label) => setLightbox({ src, label })} />
              ))}
            </div>

            {/* Row 2: Road line + one node centered under each card */}
            <div className="edc-road-row">
              <div className="edc-road-line" />
              {milestones.map((m, i) => (
                <motion.div
                  key={m.id}
                  className="edc-node"
                  style={{ '--accent': m.accent }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                    delay: i * 0.1 + 0.3,
                  }}
                >
                  <div className="edc-node-core" />
                  <span className="edc-node-idx">{i === 0 ? 'HS' : `S${i}`}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        <p className="edc-hint">↓ Scroll down to journey horizontally →</p>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="edc-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="edc-lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="edc-lightbox-label">{lightbox.label} — Official Transcript</p>
              <img src={lightbox.src} alt={lightbox.label} className="edc-lightbox-img" />
              <button className="edc-lightbox-close" onClick={() => setLightbox(null)}>✕ Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}