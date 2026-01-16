import React from 'react'
import './Experience.css'

const Experience = () => {
  const experiences = [
    {
      title: 'React Developer Intern',
      company: 'Byte Bash Technologies',
      period: 'Since September 2024',
      description: 'Worked as a React Developer Intern, contributing to building responsive and user-friendly web and mobile interfaces. Contributed to cutting-edge projects including Emotion AI platform, Vitrak Mobile Application, and Vitrak Web Application.',
      technologies: ['React', 'React Native', 'RAG', 'Vector Databases', 'PostgreSQL', 'Express.js', 'NestJS', 'MongoDB', 'SLM'],
      projects: ['Emotion AI Platform', 'Vitrak Mobile App', 'Vitrak Web App']
    },
    {
      title: 'AK Infopark Intern',
      company: 'AK Infopark',
      period: '13-01-2025 to 02-02-2025',
      description: 'Curious and detail-oriented data enthusiast with practical experience in data analysis and visualization. Worked with Python, MySQL, Power BI, and libraries like Pandas, Matplotlib, and Scikit-learn to transform data into actionable insights.',
      technologies: ['Python', 'MySQL', 'Power BI', 'Pandas', 'Matplotlib', 'Scikit-learn']
    }
  ]

  return (
    <section id="experience" className="section experience">
      <h2 className="section-title">Experience</h2>
      <p className="section-subtitle">My professional journey</p>
      
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="exp-header">
                <h3>{exp.title}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <h4 className="exp-company">{exp.company}</h4>
              <p className="exp-description">{exp.description}</p>
              <div className="exp-technologies">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              {exp.projects && (
                <div className="exp-projects">
                  <strong>Projects:</strong>
                  <ul>
                    {exp.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
