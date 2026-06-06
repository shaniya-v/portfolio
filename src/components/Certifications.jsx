import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import nationalpaper from '../../assets/nationalpaper.jpeg'
import bestEvaluator from '../../assets/best evaluator.jpeg'
import awsImg from '../../assets/aws.jpeg'
import nptelImg from '../../assets/nptel.jpeg'
import microsoftImg from '../../assets/microsoft.jpeg'
import toastmastersMilestone from '../../assets/toastmastersmilestone.jpeg'
import speechwinner from '../../assets/speechwinner.jpeg'
import academictopper from '../../assets/academictopper.jpeg'
import './Certifications.css'

const items = [
  {
    id: 0,
    num: '01',
    type: 'Achievement',
    title: 'National Level Capextreme Hackathon Finalist',
    issuer: 'CapExtreme',
    image: nationalpaper,
  },
  {
    id: 1,
    num: '02',
    type: 'Achievement',
    title: 'Best Evaluator - Toastmasters',
    issuer: 'Toastmasters International',
    image: bestEvaluator,
  },
  {
    id: 2,
    num: '03',
    type: 'Certification',
    title: 'AWS Cloud Computing Certificate',
    issuer: 'AWS Academy  ·  53% Grade',
    image: awsImg,
  },
  {
    id: 3,
    num: '04',
    type: 'Certification',
    title: 'NPTEL Career Essentials',
    issuer: 'IIT Patna - 53% Grade',
    image: nptelImg,
  },
  {
    id: 4,
    num: '05',
    type: 'Certification',
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft  &  LinkedIn',
    image: microsoftImg,
  },
  {
    id: 5,
    num: '06',
    type: 'Achievement',
    title: 'Toastmasters Milestone — Level 3 Presentation Mastery',
    issuer: 'Toastmasters International',
    image: toastmastersMilestone,
  },
  {
    id: 6,
    num: '07',
    type: 'Achievement',
    title: 'Speech Contest Winner',
    issuer: 'ISC · HSC · IEC  —  Club Level',
    image: speechwinner,
  },
  {
    id: 7,
    num: '08',
    type: 'Achievement',
    title: 'National Level Paper Presentation',
    issuer: 'National Level Technical Symposium',
    image: nationalpaper,
  },
  {
    id: 8,
    num: '09',
    type: 'Achievement',
    title: 'Consistent Topper Award',
    issuer: 'School & Amrutha College of Engineering',
    image: academictopper,
  },
]

const Certifications = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const containerRef = useRef(null)

  // Spring-smoothed cursor Y position for the floating image
  const rawY = useMotionValue(0)
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.6 })

  const handleMouseMove = useCallback((e) => {
    rawY.set(e.clientY)
  }, [rawY])

  const hoveredItem = items.find(i => i.id === hoveredId)

  return (
    <section
      id="certifications"
      className="section cert-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Section header — portfolio VT323 style */}
      <div className="cert-section-header">
        <h2 className="cert-section-title">Certifications &amp; Achievements</h2>
        <p className="cert-section-subtitle">Recognitions, milestones &amp; accomplishments</p>
      </div>

      {/* Items list */}
      <ul className="cert-list" role="list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`cert-row ${hoveredId === item.id ? 'cert-row-hovered' : ''} ${hoveredId !== null && hoveredId !== item.id ? 'cert-row-dimmed' : ''}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="cert-row-inner">
              {/* Number */}
              <span className="cert-num">.{item.num}</span>

              {/* Main content */}
              <div className="cert-row-body">
                <div className="cert-title-line">
                  <h3 className="cert-title">{item.title}</h3>
                  {/* Arrow icon on hover */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <motion.span
                        className="cert-arrow"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.18 }}
                      >
                        ▶
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="cert-meta">
                  <span className="cert-type">{item.type}</span>
                  <span className="cert-dot-sep">●</span>
                  <span className="cert-issuer">{item.issuer}</span>
                </div>
              </div>
            </div>

            {/* Divider line */}
            {index < items.length - 1 && <div className="cert-divider" />}
          </li>
        ))}
      </ul>

      {/* Floating image panel — follows cursor Y, fixed to right side */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className="cert-float-img"
            style={{ y: smoothY, translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.88, x: 30 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <img
              src={hoveredItem.image}
              alt={hoveredItem.title}
              className="cert-float-img-el"
            />
            <div className="cert-float-overlay">
              <span className="cert-float-type">{hoveredItem.type}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certifications
