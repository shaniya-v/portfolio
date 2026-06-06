import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Leadership.css'

const roles = [
  {
    title: 'Captain - Byte Bash Blitz',
    organization: 'Byte Bash Technologies',
    period: '2023 - 2024',
    award: 'Best Captain Bash Award in Byte Bash Technologies',
    description: 'Led a community of tech enthusiasts, hosting events and mentoring members to collaborate effectively on projects. Onboarded new members and fostered teamwork, ensuring active participation and skill development. Managed technical initiatives from planning to execution, building a culture of learning and innovation.',
    icon: '👨‍💻',
    achievements: ['Built tech community', 'Mentored developers', 'Led technical initiatives']
  },
  {
    title: 'Coordinator - Smart India Hackathon',
    organization: "Stella Mary's College",
    period: '2024',
    description: 'Coordinated college-wide hackathon activities, guiding teams and ensuring smooth execution of events. Mentored peers on technical skills and project development, fostering collaboration and teamwork. Bridged communication between participants and organizers, ensuring effective workflow and support.',
    icon: '🚀',
    achievements: ['Organized hackathons', 'Guided teams', 'Bridged communication']
  },
  {
    title: "Secretary - Stella Mary's Toastmasters Club",
    organization: "Stella Mary's College",
    period: '2024 - 2025',
    description: 'Managed club operations efficiently, including scheduling and coordinating meetings to improve meeting effectiveness. Provided constructive feedback and suggestions, enhancing communication skills for members. Collaborated closely with the Executive Committee, helping to build a supportive, organized environment for all participants.',
    icon: '🎤',
    achievements: ['Improved meetings', 'Enhanced communication', 'Built supportive environment']
  },
  {
    title: 'Treasurer - Computer Science Department',
    organization: "Stella Mary's College",
    period: '2023 - 2024',
    description: 'Oversaw departmental finances, maintaining accurate records of collections, expenses, and balances. Ensured financial transparency and accountability, supporting smooth management of resources. Organized and tallied finances systematically, contributing to the department\'s structured operations.',
    icon: '💼',
    achievements: ['Managed finances', 'Ensured transparency', 'Organized records']
  }
]

const Leadership = () => {
  const containerRef = useRef(null)
  
  // Track scroll position of this container in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Map the scroll progress to timeline line height and dot vertical offset
  const timelineHeight = useTransform(scrollYProgress, [0.15, 0.8], ["0%", "100%"])
  const dotTop = useTransform(scrollYProgress, [0.15, 0.8], ["0%", "100%"])

  return (
    <section id="leadership" className="section leadership-section" ref={containerRef}>
      <div className="leadership-section-header">
        <h2 className="leadership-section-title">Leadership</h2>
        <p className="leadership-section-subtitle">Roles where I made an impact</p>
      </div>

      <div className="leadership-timeline-container">
        {/* Center Timeline Line (Desktop only, shifts to left on mobile) */}
        <div className="leadership-timeline-track">
          <div className="leadership-timeline-line-bg"></div>
          <motion.div 
            className="leadership-timeline-line-active"
            style={{ height: timelineHeight }}
          />
          <motion.div 
            className="leadership-timeline-dot"
            style={{ top: dotTop }}
          />
        </div>

        {/* Timeline Stacked Cards */}
        <div className="leadership-timeline-list">
          {roles.map((role, index) => {
            // Replicates splitting the starting year for display
            const displayYear = role.period ? (role.period.includes(' - ') ? role.period.split(' - ')[0] : role.period) : ''

            return (
              <motion.div 
                key={index} 
                className="leadership-timeline-box"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
              >
                {/* Left Column: Role Title, Org, and Period Year */}
                <div className="leadership-timeline-in">
                  <div className="leadership-timeline-role">
                    <div className="leadership-role-header">
                      <span className="leadership-icon-badge">{role.icon}</span>
                      <h4 className="leadership-role-title">{role.title}</h4>
                    </div>
                    {role.organization && (
                      <h5 className="leadership-role-org">
                        {role.organization} {role.period && `(${role.period})`}
                      </h5>
                    )}
                    {role.award && (
                      <div className="leadership-award-box">
                        <span className="award-trophy">🏆</span>
                        <span className="award-text">{role.award}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="leadership-timeline-year">{displayYear}</h3>
                </div>

                {/* Right Column: Description & Badges */}
                <div className="leadership-timeline-desc">
                  <p className="leadership-desc-text">{role.description}</p>
                  {role.achievements && (
                    <div className="leadership-timeline-achievements">
                      {role.achievements.map((achievement, i) => (
                        <span key={i} className="leadership-achievement-badge">
                          ✓ {achievement}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Leadership
