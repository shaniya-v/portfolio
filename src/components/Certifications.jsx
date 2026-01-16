import React from 'react'
import './Certifications.css'

const Certifications = () => {
  const certifications = [
    {
      name: 'AI & ML in Python & Numpy',
      provider: 'AWS Academy'
    },
    {
      name: 'Cloud Computing',
      provider: 'NPTEL'
    },
    {
      name: 'React Essentials for Freshstarters',
      provider: 'SMCE Freshmasters'
    },
    {
      name: 'Career Essentials in Software Development',
      provider: 'Microsoft & LinkedIn'
    }
  ]

  const achievements = [
    {
      title: 'Paper Presentation',
      description: 'National Level Technical Symposium held by Anantha College of Engineering'
    },
    {
      title: 'Toastmasters Speech Contest Winner',
      description: 'ISC, HSC, ITC (club level)'
    },
    {
      title: 'Topper Awards',
      description: 'School & College consistent Academic Excellence Award'
    }
  ]

  return (
    <section id="certifications" className="section certifications">
      <h2 className="section-title">Certifications & Achievements</h2>
      <p className="section-subtitle">Recognitions and accomplishments</p>
      
      <div className="cert-achievements-container">
        <div className="certifications-list">
          <h3 className="subsection-title">Certifications</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="cert-item">
              <div className="cert-icon">📜</div>
              <div className="cert-details">
                <h4>{cert.name}</h4>
                <p>{cert.provider}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-list">
          <h3 className="subsection-title">Achievements</h3>
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-details">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
