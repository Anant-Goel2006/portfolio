import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const coreSkills = [
  { name: 'Python & Pandas', val: 92 },
  { name: 'SQL & Database', val: 88 },
  { name: 'Machine Learning', val: 85 },
  { name: 'Power BI & Tableau', val: 88 },
  { name: 'Deep Learning (LSTM, YOLO)', val: 80 }
];

const frameworks = [
  'Streamlit', 'Flask', 'OpenCV', 'Scikit-learn', 'Matplotlib', 'Excel', 'Git', 'Chart.js', 'Jupyter', 'NLP'
];

const Skills = () => {
  return (
    <section id="skills" className="bg-primary">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">Technical Arsenal</div>
          <h2 className="section-heading">SKILLS & TECHNOLOGIES</h2>
        </div>

        <div className={styles.layout}>
          
          <motion.div 
            className={styles.barsCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={styles.subHeading}>CORE COMPETENCIES</h3>
            <div className={styles.barsWrapper}>
              {coreSkills.map((skill, i) => (
                <div key={skill.name} className={styles.barItem}>
                  <div className={styles.barHeader}>
                    <span className="mono">{skill.name}</span>
                    <span className="mono">{skill.val}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <motion.div 
                      className={styles.barFill} 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className={styles.tagsCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className={styles.subHeading}>FRAMEWORKS & TOOLS</h3>
            <div className={styles.tagsWrapper}>
              {frameworks.map((tag, i) => (
                <motion.span 
                  key={tag} 
                  className={styles.tag}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
