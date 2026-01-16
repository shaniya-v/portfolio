import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Shaniya V</span>
        </h1>
        <p className="hero-subtitle">
          B.E Computer Science and Engineering Student
        </p>
        <p className="hero-description">
          Driven tech enthusiast with strong leadership and communication skills.
          I love building innovative solutions and collaborating with teams to turn ideas into reality.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">
            Get In Touch
          </a>
          <a href="#projects" className="btn btn-secondary">
            View My Work
          </a>
        </div>
        <div className="hero-social">
          <a 
            href="https://github.com/shaniya-v" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/shaniya-v" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:shaniya1005200@gmail.com"
            className="social-link"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
