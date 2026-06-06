import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PageTransition.css'

const FULL_NAME   = 'SHANIYA V'
const TYPE_SPEED  = 110   // ms per character
const HOLD_AFTER  = 700   // ms pause after full name is typed before exit

const PageTransition = () => {
  const [typed,   setTyped]   = useState('')          // currently visible characters
  const [cursor,  setCursor]  = useState(true)         // cursor blink toggle
  const [phase,   setPhase]   = useState('typing')    // 'typing' | 'hold' | 'exit' | 'done'
  const [subVisible, setSubVisible] = useState(false)  // subtitle lines

  /* ── Typing engine ─────────────────────────────────── */
  useEffect(() => {
    if (phase !== 'typing') return
    if (typed.length >= FULL_NAME.length) {
      // Done typing — show subtitle, then hold, then exit
      setSubVisible(true)
      setPhase('hold')
      return
    }
    const t = setTimeout(
      () => setTyped(FULL_NAME.slice(0, typed.length + 1)),
      TYPE_SPEED
    )
    return () => clearTimeout(t)
  }, [typed, phase])

  /* ── Hold then exit ────────────────────────────────── */
  useEffect(() => {
    if (phase !== 'hold') return
    const t = setTimeout(() => setPhase('exit'), HOLD_AFTER)
    return () => clearTimeout(t)
  }, [phase])

  /* ── Unmount after panels leave ────────────────────── */
  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => setPhase('done'), 1000)
    return () => clearTimeout(t)
  }, [phase])

  /* ── Cursor blink ──────────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(t)
  }, [])

  if (phase === 'done') return null

  const isExiting = phase === 'exit'

  return (
    <div className="pt-root" aria-hidden="true">

      {/* ── Back panel — exits downward */}
      <motion.div
        className="pt-panel pt-panel-back"
        animate={isExiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* ── Front panel — exits upward */}
      <motion.div
        className="pt-panel pt-panel-front"
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="pt-center">

          {/* Typing name */}
          <div className="pt-name-row">
            <span className="pt-logo-text">
              {typed}
            </span>
            <span
              className="pt-cursor"
              style={{ opacity: cursor ? 1 : 0 }}
            >|</span>
          </div>

          {/* Expanding bar — appears as soon as any character is typed */}
          <motion.div
            className="pt-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: typed.length > 0 ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Subtitle lines fade in after typing done */}
          <AnimatePresence>
            {subVisible && (
              <motion.div
                className="pt-subtitles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="pt-sub-line">Portfolio</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

    </div>
  )
}

export default PageTransition
