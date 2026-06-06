import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import akinfoImg      from '../../assets/Akinfopark.jpeg'
import byteBashImg    from '../../assets/Byte_Bash_offerletter.jpeg'
import j3Img          from '../../assets/j3OfferLetter.jpeg'
import './Experience.css'

/* ─── Map images to each experience ─────────────────────── */
const experiences = [
  {
    period: '2023 – 2024',
    title: 'Technical Community Member & Activity Leader',
    company: 'Byte-Bash-Blitz & Toastmasters',
    details: [
      'Joined Byte-Bash-Blitz technical community.',
      "Joined Stella Mary's Toastmasters club.",
      '15/02/2024: Attended two days Blender workshop at St. Xavier\'s College of Engineering.',
      '03/05/2024: Attended Python and digital Marketing workshop in Technopark Trivandrum.',
      'Participated in national level technical symposiums and hackathons.'
    ],
    technologies: ['Blender', 'Python', 'Digital Marketing', 'Public Speaking', 'Leadership'],
    docs: [
      { label: 'Offer Letter', src: byteBashImg },
    ],
  },
  {
    period: '13/01/2025 – 02/02/2025',
    title: 'Data Science & Visualisation Intern',
    company: 'AK Infopark, Nagercoil',
    details: [
      'Done internship in Data Science with Python.',
      'Learned to clean datasets, import data, and visualize it using Power BI.',
      'Applied data concepts to build a simple banking application.'
    ],
    technologies: ['Python', 'NumPy', 'Pandas', 'MySQL', 'Xaamp', 'Power BI', 'OOP Concepts'],
    docs: [
      { label: 'Internship Certificate', src: akinfoImg },
    ],
  },
  {
    period: 'Since 25 September 2025',
    title: 'Software Developer',
    company: 'Byte Bash Technologies, Kodaikanal',
    details: [
      'Working as a software developer on real-world scalable projects, including websites, web applications, and cross-platform mobile apps.',
      'Contributed to the development of the Emotion AI platform.',
      'Developed core logistics and routing features for the Vitrak Logistics platform.'
    ],
    technologies: ['PostGIS', 'Websockets (real-time)', 'Supabase', 'PostgreSQL', 'MongoDB', 'Object Storage S3', 'React Native', 'NestJS API', 'RAG', 'InjectMem'],
    docs: [
      { label: 'Offer Letter', src: byteBashImg },
    ],
  },
  {
    period: 'Jan 2026 – Feb 2026',
    title: 'Software Engineer Intern',
    company: 'Extended Internship (6 Months)',
    details: [
      'Selected for a 6-month extended internship.',
      'Learned to migrate codebases from server to cloud environments.',
      'Developed core features for the DoctAI application.'
    ],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.doctai.app',
    technologies: ['RAG', 'React Native', 'React', 'Google Cloud', 'Supabase'],
    docs: [
      { label: 'Offer Letter', src: j3Img },
    ],
  }
]

const cardVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } }
}

/* ─── Lightbox ───────────────────────────────────────────── */
const Lightbox = ({ doc, onClose }) => (
  <motion.div
    className="exp-lightbox-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="exp-lightbox-box"
      initial={{ scale: 0.84, opacity: 0 }}
      animate={{ scale: 1,    opacity: 1 }}
      exit={{ scale: 0.84, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      onClick={e => e.stopPropagation()}
    >
      <p className="exp-lb-label">{doc.label}</p>
      <img src={doc.src} alt={doc.label} className="exp-lb-img" />
      <button className="exp-lb-close" onClick={onClose}>✕ Close</button>
    </motion.div>
  </motion.div>
)

/* ─── Experience component ──────────────────────────────── */
const Experience = () => {
  const [lightbox, setLightbox] = useState(null)   // { src, label }

  return (
    <section id="experience" className="section experience">
      <div className="timemachine-header">
        <h2 className="timemachine-title">MY EXPERIENCE</h2>
        <p className="timemachine-subtitle">My professional timeline and key milestones</p>
      </div>

      <div className="card-stack">
        {experiences.map((exp, index) => {
          const topOffset = `${7 + index * 3.2}rem`
          const zIndex    = 10 + index

          return (
            <div
              key={index}
              className="timemachine-card"
              style={{ top: topOffset, zIndex }}
            >
              <motion.div
                className="timemachine-card-inner"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
              >
                {/* Header bar */}
                <div className="card-header-bar">
                  <span className="card-period">{exp.period}</span>
                  <span className="card-role-tag">{exp.title}</span>
                  <span className="card-index">{(index + 1).toString().padStart(2, '0')}</span>
                </div>

                {/* Body */}
                <div className="card-body">
                  <h3 className="card-company">{exp.company}</h3>

                  <ul className="card-details">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="card-detail-item">
                        <span className="card-detail-bullet">&gt;</span>
                        <p>{detail}</p>
                      </li>
                    ))}
                  </ul>

                  {/* ── Document thumbnails ── */}
                  {exp.docs && exp.docs.length > 0 && (
                    <div className="exp-docs-row">
                      {exp.docs.map((doc, di) => (
                        <motion.button
                          key={di}
                          className="exp-doc-thumb"
                          onClick={() => setLightbox(doc)}
                          whileHover={{ scale: 1.04, boxShadow: '0 0 18px rgba(0,191,255,0.28)' }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={`View ${doc.label}`}
                        >
                          <img
                            src={doc.src}
                            alt={doc.label}
                            className="exp-doc-img"
                          />
                          <div className="exp-doc-footer">
                            <span className="exp-doc-icon">📄</span>
                            <span className="exp-doc-lbl">{doc.label}</span>
                            <span className="exp-doc-view">View →</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Play Store button */}
                  {exp.playStoreUrl && (
                    <div className="card-action-row">
                      <a
                        href={exp.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="playstore-btn"
                      >
                        <span className="playstore-icon">🤖</span> View DoctAI on Play Store
                      </a>
                    </div>
                  )}

                  {/* Tech tags */}
                  <div className="card-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="card-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox doc={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Experience
