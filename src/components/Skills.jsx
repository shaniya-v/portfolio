import React from 'react'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['Python', 'Java', 'C', 'HTML', 'CSS']
    },
    {
      category: 'Frameworks & Libraries',
      skills: ['React', 'Remix', 'Flask', 'Pandas', 'Numpy', 'Matplotlib', 'Scikit-learn']
    },
    {
      category: 'Database & Data Analytics',
      skills: ['MySQL', 'PostgreSQL', 'Power BI', 'Data Analysis', 'Data Normalization', 'Data Parsing']
    },
    {
      category: 'AI, ML & NLP Tools',
      skills: ['RAG (Retrieval-Augmented Generation)', 'LangChain', 'NLP Basics']
    },
    {
      category: 'APIs & Automation Tools',
      skills: ['Google APIs', 'Open Router API', 'REST APIs', 'n8n']
    },
    {
      category: 'Version Control',
      skills: ['Git', 'GitHub']
    },
    {
      category: 'Soft Skills',
      skills: ['Team collaboration', 'Leadership & mentoring', 'Communication', 'Problem-solving', 'Critical thinking', 'Adaptability', 'Fast learning']
    }
  ]

  return (
    <section id="skills" className="section skills">
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">Technologies and tools I work with</p>
      
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-name">{category.category}</h3>
            <div className="skills-list">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
