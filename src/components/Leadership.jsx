import React from 'react'
import './Leadership.css'

const Leadership = () => {
  const roles = [
    {
      title: 'Captain - Byte Bash Blitz',
      description: 'Led a community of tech enthusiasts, hosting events and mentoring members to collaborate effectively on projects. Onboarded new members and fostered teamwork, ensuring active participation and skill development. Managed technical initiatives from planning to execution, building a culture of learning and innovation.',
      icon: '👨‍💻',
      achievements: ['Built tech community', 'Mentored developers', 'Led technical initiatives']
    },
    {
      title: 'Coordinator - Smart India Hackathon',
      organization: "Stella Mary's College",
      description: 'Coordinated college-wide hackathon activities, guiding teams and ensuring smooth execution of events. Mentored peers on technical skills and project development, fostering collaboration and teamwork. Bridged communication between participants and organizers, ensuring effective workflow and support.',
      icon: '🚀',
      achievements: ['Organized hackathons', 'Guided teams', 'Bridged communication']
    },
    {
      title: "Secretary - Stella Mary's Toastmasters Club",
      period: '2024-2025',
      description: 'Managed club operations efficiently, including scheduling and coordinating meetings to improve meeting effectiveness. Provided constructive feedback and suggestions, enhancing communication skills for members. Collaborated closely with the Executive Committee, helping to build a supportive, organized environment for all participants.',
      icon: '🎤',
      achievements: ['Improved meetings', 'Enhanced communication', 'Built supportive environment']
    },
    {
      title: 'Treasurer - Computer Science Department',
      organization: "Stella Mary's College",
      description: 'Oversaw departmental finances, maintaining accurate records of collections, expenses, and balances. Ensured financial transparency and accountability, supporting smooth management of resources. Organized and tallied finances systematically, contributing to the department\'s structured operations.',
      icon: '💼',
      achievements: ['Managed finances', 'Ensured transparency', 'Organized records']
    }
  ]

  return (
    <section id="leadership" className="section leadership">
      <h2 className="section-title">Leadership</h2>
      <p className="section-subtitle">Roles where I made an impact</p>
      
      <div className="leadership-grid">
        {roles.map((role, index) => (
          <div key={index} className="leadership-card">
            {role.icon && <div className="leadership-icon">{role.icon}</div>}
            <div className="leadership-header">
              <h3 className="leadership-title">{role.title}</h3>
              {role.organization && (
                <p className="leadership-org">{role.organization}</p>
              )}
              {role.period && (
                <p className="leadership-period">{role.period}</p>
              )}
            </div>
            <p className="leadership-description">{role.description}</p>
            {role.achievements && (
              <div className="leadership-achievements">
                {role.achievements.map((achievement, i) => (
                  <span key={i} className="achievement-badge">✓ {achievement}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Leadership
