import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">Get to know me better</p>
      
      <div className="about-content">
        <div className="about-text">
          <p>
            Driven and curious tech enthusiast with strong leadership and clear communication skills, 
            always eager to learn and take initiative. I enjoy solving real-world problems with technology 
            while inspiring teamwork and positive collaboration.
          </p>
          <p>
            I'm committed to staying consistently productive and keeping up with the latest innovations 
            in software development, data analysis, and intelligent automation.
          </p>
        </div>
        
        <div className="about-education">
          <h3>Education</h3>
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

export default About
