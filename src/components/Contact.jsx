import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">Let's connect and build something amazing together</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-details">
              <h3>Email</h3>
              <a href="mailto:shaniya1005200@gmail.com">shaniya1005200@gmail.com</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div className="contact-details">
              <h3>Phone</h3>
              <p>+91 9360298244</p>
              <p>+91 9361542380</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div className="contact-details">
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/shaniya-v" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/shaniya-v
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💻</div>
            <div className="contact-details">
              <h3>GitHub</h3>
              <a href="https://github.com/shaniya-v" target="_blank" rel="noopener noreferrer">
                github.com/shaniya-v
              </a>
            </div>
          </div>
        </div>

        <div className="contact-cta">
          <h3>Ready to collaborate?</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <a href="mailto:shaniya1005200@gmail.com" className="btn btn-primary">
            Send me an email
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
