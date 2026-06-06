import React from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi'
import './Contact.css'

const contacts = [
  {
    id: 'phone',
    label: 'Phone',
    icon: FiPhone,
    value: '+91 9360208244',
    sub: '+91 93615 42380',
    href: 'tel:+919486353225',
  },
  {
    id: 'email',
    label: 'Gmail',
    icon: FiMail,
    value: 'shaniya10052006@gmail.com',
    href: 'mailto:shaniya1005200@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: FiGithub,
    value: 'github.com/shaniya-v',
    href: 'https://github.com/shaniya-v',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: FiLinkedin,
    value: 'https://www.linkedin.com/in/shaniya-v-02b514280/',
    href: 'https://www.linkedin.com/in/shaniya-v-02b514280/',
  },
]

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">

      {/* ── Section Title (portfolio VT323 style) ── */}
      <div className="contact-header">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">Let's connect and build something amazing together</p>
      </div>

      {/* ── 4-card horizontal row ── */}
      <div className="contact-cards-row">
        {contacts.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.a
              key={c.id}
              href={c.href}
              target={c.id !== 'phone' && c.id !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              whileHover="hovered"
            >
              {/* Top row: icon square + arrow */}
              <div className="contact-card-top">
                {/* Icon in a glowing square */}
                <div className="contact-icon-box">
                  <Icon size={22} />
                </div>

                {/* Arrow link icon — top right */}
                <motion.div
                  className="contact-arrow-box"
                  variants={{
                    hovered: { x: 4, y: -4 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FiArrowUpRight size={16} />
                </motion.div>
              </div>

              {/* Label */}
              <p className="contact-card-label">{c.label}</p>

              {/* Value */}
              <p className="contact-card-value">{c.value}</p>
              {c.sub && <p className="contact-card-sub">{c.sub}</p>}

              {/* Hover glow bottom bar */}
              <motion.div
                className="contact-card-bar"
                variants={{ hovered: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}

export default Contact
