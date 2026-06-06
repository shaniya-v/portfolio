import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'

/* ── Typing config ─────────────────────────────────────── */
const LINES = [
  { text: 'Hi, I\'m',     class: 'ht-greeting' },
  { text: 'Shaniya V',    class: 'ht-name'     },
]

const Hero = () => {
  const [lineIdx,  setLineIdx]  = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)
  const [done,     setDone]     = useState(false)
  const [showRest, setShowRest] = useState(false)

  useEffect(() => {
    if (done) return
    const currentLine = LINES[lineIdx]
    if (charIdx <= currentLine.text.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), lineIdx === 0 ? 80 : 95)
      return () => clearTimeout(t)
    }
    // finished this line
    if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 420)
      return () => clearTimeout(t)
    }
    // all lines done
    const t = setTimeout(() => { setDone(true); setShowRest(true) }, 300)
    return () => clearTimeout(t)
  }, [lineIdx, charIdx, done])

  return (
    <motion.section
      id="home"
      className="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
      }}
    >
      <div className="intro-container">
        <div className="hero-container">

          {/* ── Left: ID card ── */}
          <motion.div
            className="hero-left"
            variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
          >
            <div className="id-card">
              <img src="/Id.png" alt="Shaniya's ID" className="id-image" />
            </div>
          </motion.div>

          {/* ── Right: typing + content ── */}
          <motion.div
            className="hero-right"
            variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
          >
            {/* Typing block */}
            <div className="hero-typing-block">

              {/* Line 0: greeting */}
              <p className="ht-greeting">
                {LINES[0].text.slice(0, lineIdx === 0 ? charIdx : LINES[0].text.length)}
                {lineIdx === 0 && !done && <span className="ht-cursor">|</span>}
              </p>

              {/* Line 1: name — only renders once line 0 finishes */}
              {lineIdx >= 1 && (
                <h1 className="ht-name">
                  {LINES[1].text.slice(0, lineIdx === 1 ? charIdx : LINES[1].text.length)
                    .split('').map((ch, i) => (
                      <motion.span
                        key={i}
                        className={ch === ' ' ? 'ht-space' : 'ht-char'}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                      >
                        {ch}
                      </motion.span>
                    ))
                  }
                  {!done && <span className="ht-cursor">|</span>}
                  {done && <span className="ht-cursor ht-cursor-idle">|</span>}
                </h1>
              )}

            </div>

            {/* Description + buttons fade in after typing is done */}
            <AnimatePresence>
              {showRest && (
                <>
                  <motion.div
                    className="hero-description-box"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    <p className="hero-description">
                      I'm a B.E Computer Science and Engineering student with a passion for technology and innovation.
                      I'm a driven tech enthusiast with strong leadership and communication skills.
                      I love building innovative solutions and collaborating with teams to turn ideas into reality.
                    </p>
                    <p className="hero-description">
                      My journey in computer science has been filled with exciting projects, leadership roles,
                      and continuous learning. I'm always eager to take on new challenges and contribute to
                      meaningful technological advancements.
                    </p>
                  </motion.div>

                  <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
                  >
                    <a href="#contact" className="btn btn-primary">Get In Touch</a>
                    <a href="#projects" className="btn btn-secondary">View My Work</a>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}

export default Hero
