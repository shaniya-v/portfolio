import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import docxImg from '../../assets/DocX.jpeg'
import calomrImg from '../../assets/calomr.jpeg'
import churchregImg from '../../assets/churchreg.jpeg'
import vitrakImg from '../../assets/vitrak.jpeg'
import emotionaiImg from '../../assets/emotionai.jpeg'
import emailtrackerImg from '../../assets/emailplantracker.jpeg'
import calendarImg from '../../assets/calendar.jpeg'
import aurachatImg from '../../assets/aurachat.jpeg'
import doctaiImg from '../../assets/DoctAi.jpeg'
import './Projects.css'

const projectsData = [
  {
    title: 'CalOmr',
    tagline: 'AI-Powered STEM Question Solver',
    category: 'AI Application',
    description: 'An AI application using PyTorch, FastAPI, and React 18 to solve STEM questions from images and evaluate OMR answer sheets. Incorporates automated grading and problem-solving workflows using RAG with PostgreSQL/pgvector for intelligent data retrieval.',
    github: 'https://github.com/shaniya-v/CalOmr',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React 18', 'Groq API', 'RAG', 'PostgreSQL', 'pgvector', 'Supabase'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 75%, #4f46e5 100%)',
    image: calomrImg,
  },
  {
    title: 'Doc.X',
    tagline: 'Intelligent Document Parser',
    category: 'Automation Pipeline',
    description: 'Architected an automated document ingestion pipeline utilizing n8n automation, Gmail API, and MinIO object storage. Integrates a RAG-driven classification system using Python and FastAPI to parse, summarize, and semantically route attachments to target departments.',
    github: 'https://github.com/shaniya-v/Doc.X-Intelligent',
    technologies: ['Python', 'FastAPI', 'React', 'n8n', 'Gmail API', 'PostgreSQL', 'MinIO', 'RAG'],
    gradient: 'linear-gradient(135deg, #062f4f 0%, #114b7a 40%, #1f6b9c 75%, #2d8ebc 100%)',
    image: docxImg,
  },
  {
    title: 'Church Registration Platform',
    tagline: 'Competition Management Portal',
    category: 'Web Application',
    description: 'Built a secure portal for churches to register participants for multiple competitions. Features role-based access control for secretaries and admins, enabling efficient participant management, real-time filtering, and monitoring.',
    github: 'https://github.com/shaniya-v/Church-Registration',
    technologies: ['PostgreSQL', 'React', 'Full Stack', 'Gmail/Google Authentication'],
    highlights: ['Role-based access control', 'Real-time data filtering', 'Secure authentication', 'Multi-competition support'],
    gradient: 'linear-gradient(135deg, #1f1235 0%, #3d1b5a 40%, #612c85 75%, #883fa8 100%)',
    image: churchregImg,
  },
  {
    title: 'Vitrak Logistics Platform',
    tagline: 'Real-Time Geospatial Logistics App',
    category: 'Geospatial Web Service',
    description: 'Co-developed core backend logistics features for the Vitrak platform. Real-time driver mapping filters candidates within a 50 km radius according to user locations. Integrated Stripe, Google Maps/OneMap, Google OAuth, and Twilio APIs.',
    github: 'https://github.com/shaniya-v/Vitrak-Logistics',
    technologies: ['NestJS', 'Node.js', 'WebSockets', 'Supabase', 'PostGIS', 'Stripe', 'Google Maps', 'Twilio'],
    gradient: 'linear-gradient(135deg, #093a3e 0%, #126367 40%, #1e8f92 75%, #35b6b9 100%)',
    image: vitrakImg,
  },
  {
    title: 'Emotion AI',
    tagline: 'Stateful Context Conversation App',
    category: 'AI Chat Assistant',
    description: 'Developed an Emotion AI system deploying advanced RAG pipelines and InjectMem for stateful context tracking. A leisure application that replies to users dynamically by understanding and classifying their expressed emotions.',
    github: 'https://github.com/shaniya-v/Emotion-AI',
    technologies: ['Node.js', 'NestJS', 'React Native', 'Supabase', 'PostGIS', 'MongoDB', 'Stripe', 'Twilio', 'Google APIs'],
    gradient: 'linear-gradient(135deg, #4c0519 0%, #881337 40%, #be123c 75%, #e11d48 100%)',
    image: emotionaiImg,
  },
  {
    title: 'Email Plan Tracker',
    tagline: 'Multi-Agent n8n Catching Pipeline',
    category: 'LLM Automation Flow',
    description: 'An automated email plan tracking system. Sends plan changes to catchers, catches updates through manager forwards via n8n triggers, processes with RAG to evaluate milestones, and emails stakeholder summaries.',
    github: 'https://github.com/shaniya-v/Email-Plan-Tracker',
    technologies: ['n8n', 'RAG', 'Email Automation', 'Python', 'OpenAI', 'LangChain'],
    gradient: 'linear-gradient(135deg, #182825 0%, #22577a 40%, #38a3a5 75%, #57cc99 100%)',
    image: emailtrackerImg,
  },
  {
    title: 'Calendar Bot',
    tagline: 'NLP Event Creator via OpenRouter',
    category: 'AI Assistant Integration',
    description: 'A dual-implementation assistant system supporting Flask (Web UI) and MCP (AI integration). Integrates Google Calendar API using OAuth2, parsing natural language events dynamically via OpenRouter API with setup documentation.',
    github: 'https://github.com/shaniya-v/Calendar-Bot',
    technologies: ['Python', 'Flask', 'Google Calendar API', 'OAuth2', 'OpenRouter', 'MCP'],
    gradient: 'linear-gradient(135deg, #301b3f 0%, #3c2a4d 40%, #b4a5a5 75%, #d3c4d1 100%)',
    image: calendarImg,
  },
  {
    title: 'AURA Chat',
    tagline: 'Social Media Messaging Mimicker',
    category: 'Real-Time Web Application',
    description: 'A social media mimicker focusing on core interactive features. Integrates custom Instagram-like text notes, YouTube-style shorts display, and instant messaging pipelines powered by custom WebSocket servers.',
    github: 'https://github.com/shaniya-v/AURA-Chat',
    technologies: ['React', 'Node.js', 'WebSockets', 'MongoDB', 'Tailwind CSS', 'CSS Glassmorphism'],
    gradient: 'linear-gradient(135deg, #370617 0%, #6a040f 40%, #900c3f 75%, #c70039 100%)',
    image: aurachatImg,
  },
  {
    title: 'DoctAI',
    tagline: 'Health-Tech App & Cloud Infrastructure',
    category: 'Health-Tech Mobile App',
    description: 'Co-developed the DoctAI application deploying React Native on mobile frontends and Python Flask backend services. Integrated OpenAI APIs with Supabase and PostgreSQL for secure, RAG-driven medical diagnostics data retrieval.',
    github: 'https://github.com/shaniya-v/DoctAI',
    playstore: 'https://play.google.com/store/apps/details?id=com.doctai.app',
    technologies: ['Python', 'Flask', 'React Native', 'Supabase', 'PostgreSQL', 'OpenAI API', 'Cloud Migration'],
    gradient: 'linear-gradient(135deg, #03045e 0%, #0077b6 40%, #00b4d8 75%, #90e0ef 100%)',
    image: doctaiImg,
  }
]

const ProjectMockup = ({ index }) => {
  // Renders a high-fidelity visual UI mockup for each project based on its index
  switch (index) {
    case 0: // CalOmr
      return (
        <div className="mockup-screen calomr-mock">
          <div className="mock-omr">
            <div className="omr-row headers"><span>Q.No</span><span className="bubbles">A B C D</span><span>Grade</span></div>
            <div className="omr-row correct"><span>01</span><span className="bubbles"><b className="correct">A</b> B C D</span><span className="correct-tag">✓</span></div>
            <div className="omr-row correct"><span>02</span><span className="bubbles">A B <b className="correct">C</b> D</span><span className="correct-tag">✓</span></div>
            <div className="omr-row incorrect"><span>03</span><span className="bubbles">A <b className="incorrect">B</b> C D</span><span className="incorrect-tag">✗</span></div>
            <div className="omr-row correct"><span>04</span><span className="bubbles">A B C <b className="correct">D</b></span><span className="correct-tag">✓</span></div>
          </div>
          <div className="mock-console">
            <div className="console-line text-cyan">&gt; PyTorch evaluating STEM image...</div>
            <div className="console-line text-green">&gt; OMR grading success: 19/20 (95%)</div>
          </div>
        </div>
      )
    case 1: // Doc.X
      return (
        <div className="mockup-screen docx-mock">
          <div className="nodes-flow">
            <div className="flow-node">📥 Gmail Ingest</div>
            <div className="flow-connector">↓</div>
            <div className="flow-node highlight">🤖 FastAPI Classifier</div>
            <div className="flow-connector">↓</div>
            <div className="flow-grid-nodes">
              <div className="flow-node small">💾 MinIO</div>
              <div className="flow-node small">🗂️ RAG router</div>
            </div>
          </div>
        </div>
      )
    case 2: // Church Registration
      return (
        <div className="mockup-screen church-mock">
          <div className="mock-table-header">
            <span>Participant</span><span>Competition</span><span>Status</span>
          </div>
          <div className="mock-table-row">
            <span>John Doe</span><span>Oratorical</span><span className="badge badge-green">Approved</span>
          </div>
          <div className="mock-table-row">
            <span>Sara Smith</span><span>Bible Quiz</span><span className="badge badge-green">Approved</span>
          </div>
          <div className="mock-table-row">
            <span>David Miller</span><span>Solo Singing</span><span className="badge badge-purple">Pending</span>
          </div>
          <div className="mock-rbac-footer">
            <span className="rbac-badge">🔑 Admin Session</span>
            <span className="rbac-badge">🔑 Secretary Portal</span>
          </div>
        </div>
      )
    case 3: // Vitrak Logistics
      return (
        <div className="mockup-screen vitrak-mock">
          <div className="map-grid">
            <div className="map-circle-50km">
              <div className="center-dot">📍 User</div>
              <div className="driver-dot driver-1">🚗 12km</div>
              <div className="driver-dot driver-2">🚗 34km</div>
              <div className="driver-dot driver-3">🚗 48km</div>
            </div>
          </div>
          <div className="map-overlay">
            <span className="text-cyan">PostGIS GeoQuery:</span>
            <span>Drivers in 50km: 3</span>
          </div>
        </div>
      )
    case 4: // Emotion AI
      return (
        <div className="mockup-screen emotion-mock">
          <div className="chat-area">
            <div className="chat-bubble user">"I feel exhausted today..."</div>
            <div className="chat-bubble bot">
              <span className="emoji">😔</span> 
              <span>I understand. Let's take it easy. Here's a relaxation exercise.</span>
            </div>
          </div>
          <div className="emotion-meter">
            <span>Sadness: 78%</span><div className="meter-bar"><div className="fill bar-sad" /></div>
            <span>Calm: 22%</span><div className="meter-bar"><div className="fill bar-calm" /></div>
          </div>
        </div>
      )
    case 5: // Email Plan Tracker
      return (
        <div className="mockup-screen tracker-mock">
          <div className="email-card">
            <div className="email-header"><b>From:</b> Project Manager</div>
            <div className="email-subject"><b>Subject:</b> Fwd: Plan Updates for Project A</div>
            <div className="email-body">"Forwarding the approved scope. Let's start routing..."</div>
          </div>
          <div className="automation-status">
            <div className="status-item done">✓ n8n Email Caught</div>
            <div className="status-item done">✓ RAG analyzed status</div>
            <div className="status-item progress">⚡ Emailing Updates...</div>
          </div>
        </div>
      )
    case 6: // Calendar Bot
      return (
        <div className="mockup-screen calendar-mock">
          <div className="calendar-card">
            <div className="calendar-title">📅 June 2026</div>
            <div className="calendar-grid-mock">
              <div className="day">1</div><div className="day">2</div><div className="day">3</div>
              <div className="day event-day active">4<div className="event-dot" /></div>
              <div className="day">5</div><div className="day">6</div>
            </div>
            <div className="calendar-details-card">
              <span className="ev-time">10:00 AM</span>
              <span className="ev-title">AI event: Sync via NLP</span>
            </div>
          </div>
        </div>
      )
    case 7: // AURA Chat
      return (
        <div className="mockup-screen aura-mock">
          <div className="notes-tray">
            <div className="note-avatar active">💬<span>coding...</span></div>
            <div className="note-avatar">☕<span>coffee</span></div>
            <div className="note-avatar">🎮<span>AFK</span></div>
          </div>
          <div className="shorts-tray">
            <div className="mock-short">📹 Short Video Feed</div>
          </div>
          <div className="chat-status">
            <span>WebSockets: Connected ✓</span>
          </div>
        </div>
      )
    case 8: // DoctAI
      return (
        <div className="mockup-screen doctai-mock">
          <div className="medical-dash">
            <div className="dash-header">⚕️ DoctAI Diagnostics</div>
            <div className="vital-row">
              <span>Heart Rate: 72 bpm</span>
              <div className="pulse-wave" />
            </div>
            <div className="openai-rag">
              <div className="rag-title">OpenAI RAG Report:</div>
              <p className="rag-text">"Based on data retrieval, recommend follow-up check..."</p>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    // Set up observer to track the active project card on scroll
    const options = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // detects when card centers on viewport
      threshold: 0.15
    }

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10)
          setActiveIndex(index)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    
    // Select all showcase cards to observe
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.showcase-card')
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-section-header">
        <h2 className="projects-section-title">Curated Work</h2>
        <p className="projects-section-subtitle">A list of projects I have engineered and deployed</p>
      </div>

      <div className="projects-showcase" ref={containerRef}>
        
        {/* Left Column: Sticky Illustration / Browser Mockup Panel (Desktop only) */}
        <div className="showcase-sticky-panel">
          <div className="showcase-sticky-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="showcase-browser-frame"
                style={{ background: projectsData[activeIndex].gradient }}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -35, scale: 0.95 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Browser Toolbar Controls */}
                <div className="browser-toolbar">
                  <div className="toolbar-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url">
                    shaniya-v.github.io/projects/{projectsData[activeIndex].title.toLowerCase()}
                  </div>
                </div>

                {/* Dashboard / Console Workspace */}
                <div className="browser-workspace">
                  {projectsData[activeIndex].image ? (
                    <img
                      src={projectsData[activeIndex].image}
                      alt={projectsData[activeIndex].title}
                      className="project-screenshot-img"
                    />
                  ) : (
                    <ProjectMockup index={activeIndex} />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Scrollable Content List */}
        <div className="showcase-scroll-list">
          {projectsData.map((project, index) => {
            const isActive = index === activeIndex
            const indexStr = (index + 1).toString().padStart(2, '0')

            return (
              <div
                key={index}
                className={`showcase-card ${isActive ? 'active' : ''}`}
                data-index={index}
              >
                {/* Mobile Preview Panel (Inline mockup, shown only on screens < 1024px) */}
                <div className="mobile-mockup-panel" style={{ background: project.gradient }}>
                  <div className="browser-toolbar">
                    <div className="toolbar-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                  </div>
                  <div className="browser-workspace">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-screenshot-img"
                      />
                    ) : (
                      <ProjectMockup index={index} />
                    )}
                  </div>
                </div>

                {/* Content details */}
                <div className="card-header-row">
                  <span className="card-index-num">{indexStr}</span>
                  <div className="card-divider-line"></div>
                  <span className="card-category-lbl">{project.category}</span>
                </div>

                <h3 className="project-display-title">
                  {project.title}
                </h3>
                <h4 className="project-display-tagline">
                  {project.tagline}
                </h4>

                <p className="project-display-desc">
                  {project.description}
                </p>

                {project.highlights && (
                  <ul className="project-display-highlights">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="highlight-item">
                        <span className="highlight-bullet">&gt;</span>
                        <p>{highlight}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="project-display-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-display-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn github-btn"
                  >
                    📂 Github Repo
                  </a>
                  
                  {project.playstore && (
                    <a
                      href={project.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn playstore-btn"
                    >
                      🤖 View on Play Store
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects
