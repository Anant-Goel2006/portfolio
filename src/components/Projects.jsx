import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import TiltCard from './TiltCard';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const ExternalLinkIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

const projectsData = [
  {
    id: 1,
    title: 'NeuroLab',
    categoryLabel: 'Deep Learning',
    image: '/assets/neurolab.png',
    desc: 'A premium interactive simulation suite with 7 neural network modules including Perceptron, Forward/Backward Propagation, Hopfield Networks, OpenCV Detection Hub, Sentiment Analysis, and LSTM Applications.',
    tech: ['Python', 'Streamlit', 'YOLOv8', 'MediaPipe', 'LSTM'],
    liveLink: 'https://neurolab.streamlit.app/',
    githubLink: 'https://github.com/Anant-Goel2006/Neural-Network-Lab-Tool-Box'
  },
  {
    id: 2,
    title: 'AirPulse',
    categoryLabel: 'Machine Learning',
    image: '/assets/airpulse.png',
    desc: 'Full-stack AQI dashboard serving live air quality data for 150+ cities worldwide using WAQI API integration, deployed on Render with interactive maps and ML-powered health guidance.',
    tech: ['Python', 'Flask', 'Scikit-learn', 'Chart.js', 'Leaflet.js'],
    liveLink: 'https://airpulse-minor-project.onrender.com/',
    githubLink: 'https://github.com/Anant-Goel2006/AirPulse-Minor-Project'
  },
  {
    id: 3,
    title: 'Netflix Analytics',
    categoryLabel: 'Data Visualization',
    image: '/assets/netflix.png',
    desc: 'Interactive Power BI dashboard analyzing 8,809 Netflix titles across ratings, genres, countries, and years (2008–2021) with comprehensive KPIs and trend analysis.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Modeling'],
    liveLink: null,
    githubLink: 'https://github.com/Anant-Goel2006/Netflix_Dashboard_Power_BI'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="bg-secondary">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">Case Studies</div>
          <h2 className="section-heading">Featured <span className="gradient-text">Works</span></h2>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ perspective: "2000px" }}
            >
              <TiltCard className={styles.card}>
                <div className={styles.imageBox}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.overlay}>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                        <ExternalLinkIcon size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                        <GithubIcon size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.info}>
                  <span className={styles.category}>{project.categoryLabel}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className={styles.tech}>
                    {project.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
