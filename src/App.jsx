import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import StarBackground from './components/StarBackground'
import CursorEffect from './components/CursorEffect'
import PageTransition from './components/PageTransition'
import aboutImage from '../about_me.png'
import './App.css'

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

const FloatingImage = () => {
  const [coords, setCoords] = useState(null)
  const { scrollY } = useScroll()

  const updateCoords = () => {
    const headerEl = document.getElementById('header-profile-img-placeholder')
    const aboutEl = document.getElementById('about-profile-img-placeholder')

    if (!headerEl || !aboutEl) return

    const headerRect = headerEl.getBoundingClientRect()
    const aboutRect = aboutEl.getBoundingClientRect()

    const scrollYCurrent = window.scrollY
    const scrollXCurrent = window.scrollX

    setCoords({
      header: {
        x: headerRect.left + scrollXCurrent,
        y: headerRect.top + scrollYCurrent,
        w: headerRect.width,
        h: headerRect.height,
      },
      about: {
        x: aboutRect.left + scrollXCurrent,
        y: aboutRect.top + scrollYCurrent,
        w: aboutRect.width,
        h: aboutRect.height,
      }
    })
  }

  useEffect(() => {
    updateCoords()
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords)
    window.addEventListener('load', updateCoords)

    // Run multiple timeouts to ensure we capture layout updates
    const timers = [
      setTimeout(updateCoords, 100),
      setTimeout(updateCoords, 500),
      setTimeout(updateCoords, 1200),
      setTimeout(updateCoords, 2500)
    ]

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
      window.removeEventListener('load', updateCoords)
      timers.forEach(clearTimeout)
    }
  }, [])

  // Complete transition by the time we scroll from header to about
  const targetScrollY = coords ? Math.max(100, coords.about.y - window.innerHeight * 0.45) : 100

  const x = useTransform(scrollY, (latest) => {
    if (!coords) return 0
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return coords.header.x + (coords.about.x - coords.header.x) * p
  })

  const y = useTransform(scrollY, (latest) => {
    if (!coords) return 0
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return coords.header.y + (coords.about.y - coords.header.y) * p
  })

  const w = useTransform(scrollY, (latest) => {
    if (!coords) return 0
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return coords.header.w + (coords.about.w - coords.header.w) * p
  })

  const h = useTransform(scrollY, (latest) => {
    if (!coords) return 0
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return coords.header.h + (coords.about.h - coords.header.h) * p
  })

  const borderRadius = useTransform(scrollY, (latest) => {
    if (!coords) return '12px'
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    const radius = 12 + (24 - 12) * p
    return `${radius}px`
  })

  const borderWidth = useTransform(scrollY, (latest) => {
    if (!coords) return 3
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return 3 * (1 - p)
  })

  const shadow = useTransform(scrollY, (latest) => {
    if (!coords) return '0 0 20px rgba(0, 191, 255, 0.4)'
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    const size = 20 * (1 - p)
    const opacity = 0.4 * (1 - p)
    return `0 0 ${size}px rgba(0, 191, 255, ${opacity})`
  })

  const opacityHeader = useTransform(scrollY, (latest) => {
    if (!coords) return 1
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return p > 0.7 ? 0 : 1 - (p / 0.7)
  })

  const opacityAbout = useTransform(scrollY, (latest) => {
    if (!coords) return 0
    const p = Math.max(0, Math.min(1, latest / targetScrollY))
    return p < 0.3 ? 0 : (p - 0.3) / 0.7
  })

  if (!coords) return null

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: w,
        height: h,
        borderRadius,
        borderStyle: 'solid',
        borderColor: '#00bfff',
        borderWidth,
        boxShadow: shadow,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 99
      }}
    >
      {/* Header Image */}
      <motion.img
        src="/Id.png"
        alt="Shaniya"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: opacityHeader
        }}
      />
      {/* About Image */}
      <motion.img
        src={aboutImage}
        alt="About Me"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: opacityAbout
        }}
      />
    </motion.div>
  )
}

function App() {
  return (
    <motion.div className="App" initial="hidden" animate="visible" variants={pageVariants}>
      <PageTransition />
      <StarBackground />
      <CursorEffect />
      <Header />
      <motion.main initial="hidden" animate="visible" transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Certifications />
        <Contact />
      </motion.main>
      <FloatingImage />
      <footer className="footer">
        <p>&copy; 2026 Shaniya V. All rights reserved.</p>
      </footer>
    </motion.div>
  )
}

export default App
