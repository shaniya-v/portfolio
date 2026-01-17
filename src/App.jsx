import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import StarBackground from './components/StarBackground'
import CursorEffect from './components/CursorEffect'
import './App.css'

function App() {
  return (
    <div className="App">
      <StarBackground />
      <CursorEffect />
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Certifications />
        <Contact />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Shaniya V. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
