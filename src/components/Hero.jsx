import React, { useState, useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, this is Shaniya";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="intro-container">
        <div className="hero-container">
          <div className="hero-left">
            <div className="id-card">
              <img src="/Id.png" alt="Shaniya's ID" className="id-image" />
            </div>
          </div>
        
          <div className="hero-right">
            <h1 className="hero-typing">
              {text}<span className="cursor-blink">|</span>
            </h1>
            <div className={`hero-description-box ${isTypingComplete ? 'fade-in' : ''}`}>
              <p className="hero-description">
                I'm a B.E Computer Science and Engineering student with a passion for technology and innovation. 
                I'm a driven tech enthusiast with strong leadership and communication skills. 
                I love building innovative solutions and collaborating with teams to turn ideas into reality.
              </p>
              <p className="hero-description">
                My journey in computer science has been filled with exciting projects, leadership roles, 
                and continuous learning. I'm always eager to take on new challenges and contribute to 
                meaningful technological advancements.
              </p>
            </div>
            <div className={`hero-buttons ${isTypingComplete ? 'fade-in' : ''}`}>
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="#projects" className="btn btn-secondary">
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
