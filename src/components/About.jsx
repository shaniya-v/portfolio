import React, { useState } from 'react'
import { motion } from 'framer-motion'
import aboutImage from '../../about_me.png'
import './About.css'

const leftPoints = [
  { icon: '🔨', text: 'Crafting solutions with a builder mindset in every project.' },
  { icon: '🤝', text: 'Leading teams with clarity, collaboration, and empathy.' },
  { icon: '💡', text: 'Solving problems using code, data, and creative systems.' },
  { icon: '📚', text: 'Staying curious and learning new tools every day.' },
]

const rightPoints = [
  { icon: '🎨', text: 'Designing clean, impactful user experiences.' },
  { icon: '🚀', text: 'Turning ideas into practical software products.' },
  { icon: '🤖', text: 'Bringing automation and AI into real workflows.' },
  { icon: '⭐', text: 'Committed to growth, consistency, and excellence.' },
]

/* ── Card variants ─────────────────────────────────────── */
const cardVariantLeft = {
  hidden: { opacity: 0, x: -60, scale: 0.9 },
  visible: i => ({
    opacity: 1, x: 0, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: i * 0.12 }
  })
}
const cardVariantRight = {
  hidden: { opacity: 0, x: 60, scale: 0.9 },
  visible: i => ({
    opacity: 1, x: 0, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: i * 0.12 }
  })
}

const imageVariant = {
  hidden:   { opacity: 0, scale: 0.88, rotate: -4 },
  visible:  { opacity: 1, scale: 1,    rotate: 0,
    transition: { duration: 0.9, ease: 'easeOut' } }
}

/* ── Single Point Card ─────────────────────────────────── */
const PointCard = ({ point, index, side }) => {
  const [hovered, setHovered] = useState(false)
  const variant = side === 'left' ? cardVariantLeft : cardVariantRight

  return (
    <motion.div
      className={`about-point apc-${side}`}
      custom={index}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()  => setHovered(false)}
      animate={hovered ? {
        scale: 1.04,
        boxShadow: '0 0 22px rgba(0,191,255,0.3)',
        borderColor: 'rgba(0,191,255,0.6)',
      } : {}}
      transition={{ duration: 0.25 }}
    >
      {/* Animated icon */}
      <motion.div
        className="about-point-icon"
        animate={hovered
          ? { rotate: [0, -10, 10, -6, 6, 0], scale: 1.2 }
          : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {point.icon}
      </motion.div>

      <p>{point.text}</p>

      {/* Shimmer line on hover */}
      <motion.div
        className="apc-shimmer"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ transformOrigin: 'left center' }}
      />
    </motion.div>
  )
}

/* ── Main Component ────────────────────────────────────── */
const About = () => {
  return (
    <motion.section
      id="about"
      className="section about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
    >
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title minecraft-title about-clean-title">About Me</h2>
        <p className="section-subtitle">Get to know the builder behind the portfolio.</p>
      </motion.div>

      <div className="about-layout">

        {/* Left points */}
        <div className="about-points about-points-left">
          {leftPoints.map((point, idx) => (
            <PointCard key={idx} point={point} index={idx} side="left" />
          ))}
        </div>

        {/* Centre image */}
        <motion.div
          className="about-image-card"
          variants={imageVariant}
          whileHover={{ y: -6, scale: 1.03, rotate: 1 }}
        >
          <div className="about-me-image-placeholder" id="about-profile-img-placeholder" />
          <div className="minecraft-badge">about_me.png</div>

          {/* Rotating ring decoration */}
          <motion.div
            className="abt-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Right points */}
        <div className="about-points about-points-right">
          {rightPoints.map((point, idx) => (
            <PointCard key={idx} point={point} index={idx} side="right" />
          ))}
        </div>

      </div>
    </motion.section>
  )
}

export default About
