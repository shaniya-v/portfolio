import React from 'react'
import './About.css'

const Education = () => {
  return (
    <section id="education" className="section about">
      <h2 className="section-title">Education</h2>
      <p className="section-subtitle">My academic journey</p>
      
      <div className="about-content">
        <div className="about-education">
          <div className="education-item">
            <div className="education-header">
              <h4>B.E Computer Science and Engineering</h4>
              <span className="year">2023-2027</span>
            </div>
            <p className="institution">Stella Mary's College of Engineering</p>
            <p className="grade">CGPA: <strong>9.06</strong> (sem IV)</p>
          </div>
          
          <div className="education-item">
            <div className="education-header">
              <h4>Higher Secondary</h4>
              <span className="year">2023</span>
            </div>
            <p className="institution">St.Anthony's Higher Secondary School</p>
            <p className="grade">Score: <strong>83%</strong></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education