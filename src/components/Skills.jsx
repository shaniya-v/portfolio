import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SiPython, SiHtml5, SiCss3, SiReact, SiRemix, SiFlask, SiPandas, SiNumpy, 
  SiMysql, SiPostgresql, SiGoogle, SiGit, SiGithub, SiOpenai, SiLangchain, 
  SiScikitlearn, SiN8N, SiC
} from 'react-icons/si'
import { FaJava, FaUsers, FaLightbulb, FaComments, FaBrain } from 'react-icons/fa'
import { TbMapPin, TbPlugConnected, TbBrain, TbChartBar, TbBrandSocketIo } from 'react-icons/tb'
import './Skills.css'

const skillsData = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', color: '#3776AB', icon: SiPython },
      { name: 'Java', color: '#5382A1', icon: FaJava },
      { name: 'C', color: '#A8B9CC', icon: SiC },
      { name: 'HTML', color: '#E34F26', icon: SiHtml5 },
      { name: 'CSS', color: '#1572B6', icon: SiCss3 }
    ]
  },
  {
    category: 'Framework & Libraries',
    skills: [
      { name: 'React', color: '#61DAFB', icon: SiReact },
      { name: 'Remix', color: '#FFFFFF', icon: SiRemix },
      { name: 'Flask', color: '#445566', icon: SiFlask },
      { name: 'Pandas', color: '#150458', icon: SiPandas },
      { name: 'Numpy', color: '#013243', icon: SiNumpy },
      { name: 'Scikit-learn', color: '#F7931E', icon: SiScikitlearn },
      { name: 'Matplotlib', color: '#11557C', icon: TbChartBar }
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', color: '#4479A1', icon: SiMysql },
      { name: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql },
      { name: 'PostGIS', color: '#3182CC', icon: TbMapPin },
      { name: 'Power BI', color: '#F2C811', icon: TbChartBar }
    ]
  },
  {
    category: 'AI Engineering',
    skills: [
      { name: 'RAG (Retrieval-Augmented)', color: '#10A37F', icon: SiOpenai },
      { name: 'LangChain', color: '#FFFFFF', icon: SiLangchain },
      { name: 'MCP (Model Context Protocol)', color: '#00bfff', icon: TbPlugConnected },
      { name: 'InjectMem', color: '#be123c', icon: TbBrain },
      { name: 'NLP Basics', color: '#c084fc', icon: FaBrain }
    ]
  },
  {
    category: 'API & Tools',
    skills: [
      { name: 'Websockets(Realtime)', color: '#00bfff', icon: TbBrandSocketIo },
      { name: 'n8n', color: '#FF6C37', icon: SiN8N },
      { name: 'Google APIs', color: '#4285F4', icon: SiGoogle },
      { name: 'Open Router API', color: '#ff5f56', icon: SiOpenai },
      { name: 'REST APIs', color: '#27c93f', icon: TbPlugConnected }
    ]
  },
  {
    category: 'Tools & Soft Skills',
    skills: [
      { name: 'Git', color: '#F05032', icon: SiGit },
      { name: 'GitHub', color: '#FFFFFF', icon: SiGithub },
      { name: 'Team collaboration', color: '#4ade80', icon: FaUsers },
      { name: 'Leadership & mentoring', color: '#fbbf24', icon: FaLightbulb },
      { name: 'Communication', color: '#38bdf8', icon: FaComments }
    ]
  }
]

const SkillBadge = ({ name, color, Icon }) => {
  return (
    <motion.div
      className="skill-badge-item"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.15 }}
    >
      <div className="skill-icon-container">
        <Icon className="skill-brand-icon" style={{ color }} />
      </div>
      <span className="skill-text">{name}</span>
    </motion.div>
  )
}

const MarqueeRow = ({ skills, direction }) => {
  const containerRef = useRef(null)
  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setScrollWidth(containerRef.current.scrollWidth / 2)
      }
    }

    const observer = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    updateWidth()
    return () => observer.disconnect()
  }, [skills])

  // Duplicating the skills array to ensure infinite wrapping covers the viewport without gaps
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills]

  return (
    <div className="skills-marquee-wrapper">
      <motion.div
        ref={containerRef}
        className="skills-marquee-track"
        animate={scrollWidth > 0 ? {
          x: direction === 'right' ? [0, -scrollWidth] : [-scrollWidth, 0]
        } : {}}
        transition={{
          repeat: Infinity,
          duration: scrollWidth > 0 ? scrollWidth / 35 : 0,
          ease: 'linear'
        }}
      >
        {repeatedSkills.map((skill, index) => (
          <SkillBadge
            key={`${skill.name}-${index}`}
            name={skill.name}
            color={skill.color}
            Icon={skill.icon}
          />
        ))}
      </motion.div>
    </div>
  )
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Skills')

  const categoriesList = ['All Skills', ...skillsData.map(c => c.category)]

  const displayedCategories = selectedCategory === 'All Skills'
    ? skillsData
    : skillsData.filter(cat => cat.category === selectedCategory)

  return (
    <section id="skills" className="section skills-section">
      {/* Header + Filter Pills in one row */}
      <div className="skills-header-row">
        <div className="skills-section-header">
          <h2 className="skills-section-title">Skills</h2>
          <p className="skills-section-subtitle">Technologies and tools I work with</p>
        </div>

        {/* Filter Pills — right side */}
        <div className="skills-filter-pills">
          {categoriesList.map((category) => (
            <motion.button
              key={category}
              className={`skills-pill ${selectedCategory === category ? 'skills-pill-active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Marquee Rows listing skills */}
      <div className="skills-categories-container">
        {displayedCategories.map((cat, idx) => {
          const direction = idx % 2 === 0 ? 'right' : 'left'
          return (
            <div key={cat.category} className="skills-marquee-row-group">
              <h3 className="skills-category-title">{cat.category}</h3>
              <MarqueeRow skills={cat.skills} direction={direction} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
