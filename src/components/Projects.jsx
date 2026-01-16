import React from 'react'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'Calomr - AI OMR Sheet Corrector',
      description: 'An intelligent OMR sheet correction system that automatically corrects OMR sheets and generates detailed answers for STEM questions using advanced AI models. Leverages RAG architecture with vector databases for accurate answer generation and grading.',
      technologies: ['PyTorch', 'pgVector', 'Supabase', 'Grok API', 'RAG', 'Python'],
      highlights: [
        'Automated OMR sheet correction',
        'STEM question answer generation',
        'Vector-based similarity search',
        'AI-powered grading system'
      ],
      icon: '📝'
    },
    {
      title: 'DocX - Intelligent Document Parser',
      description: 'Automate document archival, parsing, and routing by extracting attachments from emails, processing them, and generating summaries for relevant stakeholders. Built an intelligent and scalable manual effort using intelligent automation. Schedules single or recurring events automatically based on natural language prompts and provides direct Google Calendar links.',
      technologies: ['Python', 'Flask', 'React', 'n8n', 'Gmail API', 'PostgreSQL', 'RAG', 'Google Cloud Calendar'],
      highlights: [
        'Intelligent document parsing',
        'Automated email processing',
        'Natural language event scheduling',
        'Direct calendar integration'
      ],
      icon: '📄'
    },
    {
      title: 'Competition Registration Platform',
      description: 'Built a secure portal for churches to register participants for multiple competitions with role-based access for secretaries and admins. Enables efficient participant management with real-time filtering and monitoring.',
      technologies: ['PostgreSQL', 'React', 'Full Stack', 'Gmail/Google Authentication'],
      highlights: [
        'Role-based access control',
        'Real-time data filtering',
        'Secure authentication',
        'Multi-competition support'
      ],
      icon: '🏆'
    }
  ]

  return (
    <section id="projects" className="section projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">Things I've built</p>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {project.icon && <div className="project-icon">{project.icon}</div>}
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-highlights">
              {project.highlights.map((highlight, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-dot">•</span>
                  {highlight}
                </div>
              ))}
            </div>
            
            <div className="project-technologies">
              {project.technologies.map((tech, i) => (
                <span key={i} className="project-tech">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
