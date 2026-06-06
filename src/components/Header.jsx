import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [terminalLines, setTerminalLines] = useState(['shaniya@portfolio:~$ '])
  const [isTyping, setIsTyping] = useState(false)
  const terminalOutputRef = useRef(null)

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
    }
  }, [terminalLines])

  const navItems = [
    { name: 'About', href: '#about', command: 'about' },
    { name: 'Education', href: '#education', command: 'education' },
    { name: 'Experience', href: '#experience', command: 'experience' },
    { name: 'Projects', href: '#projects', command: 'projects' },
    { name: 'Skills', href: '#skills', command: 'skills' },
    { name: 'Leadership', href: '#leadership', command: 'leadership' },
    { name: 'Contact', href: '#contact', command: 'contact' },
  ]

  const typeCommand = async (command, sectionName, href) => {
    setIsTyping(true)
    setMenuOpen(false)
    
    // First scroll to terminal
    const terminalElement = document.querySelector('.terminal-content-area')
    if (terminalElement) {
      terminalElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const commandText = `cd ${command}`
    let currentText = ''
    
    // Type the command
    for (let i = 0; i < commandText.length; i++) {
      currentText += commandText[i]
      setTerminalLines(prev => {
        const newLines = [...prev]
        newLines[newLines.length - 1] = `shaniya@portfolio:~$ ${currentText}`
        return newLines
      })
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    // Add output lines
    await new Promise(resolve => setTimeout(resolve, 200))
    setTerminalLines(prev => [...prev, ''])
    await new Promise(resolve => setTimeout(resolve, 100))
    setTerminalLines(prev => [...prev, `> Redirecting to ${sectionName}...`])
    await new Promise(resolve => setTimeout(resolve, 150))
    setTerminalLines(prev => [...prev, `> Loading Shaniya V Portfolio/${sectionName}`])
    await new Promise(resolve => setTimeout(resolve, 150))
    setTerminalLines(prev => [...prev, `> Success! ✓`])
    await new Promise(resolve => setTimeout(resolve, 300))
    setTerminalLines(prev => [...prev, 'shaniya@portfolio:~$ '])
    
    setIsTyping(false)
    
    // Then scroll to section
    await new Promise(resolve => setTimeout(resolve, 300))
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (e, item) => {
    e.preventDefault()
    if (!isTyping) {
      typeCommand(item.command, item.name, item.href)
    }
  }

  return (
    <>
      <motion.header
        className="header terminal-header"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="terminal-navbar">
          <div className="terminal-titlebar">
            <div className="terminal-buttons">
              <span className="terminal-btn close"></span>
              <span className="terminal-btn minimize"></span>
              <span className="terminal-btn maximize"></span>
            </div>
            <div className="terminal-title">shaniya@portfolio:~$</div>
          </div>
          
          <nav className={`terminal-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="terminal-link"
                onClick={(e) => handleNavClick(e, item)}
              >
                [{item.name}]
              </a>
            ))}
          </nav>

          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.header>
      
      <motion.div
        className="terminal-content-area"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
      >
        <div className="terminal-hero">
          <div className="terminal-profile-img-placeholder" id="header-profile-img-placeholder" />
          <div className="terminal-hero-text">
            <h1 className="terminal-name">SHANIYA V</h1>
            <p className="terminal-description">
              B.E Computer Science and Engineering Student<br/>
              Full Stack Developer | Software Engineer | Tech Leader<br/>
              Building innovative solutions with passion and dedication
            </p>
          </div>
        </div>
        
        <div className="terminal-output" ref={terminalOutputRef}>
          {terminalLines.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default Header
