import React from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const Experience = () => {
  return (
    <section id="experience" className="bg-secondary">
      <div className="container">
        <div className={styles.layout}>
          
          <div className={styles.column}>
            <div className="section-header">
              <div className="section-tag">Career</div>
              <h2 className="section-heading">WORK EXPERIENCE</h2>
            </div>

            <motion.div 
              className={styles.record}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.recordHeader}>
                <h3 className={styles.title}>MedTourEasy</h3>
                <div className={styles.date}>Jul 2025 • Remote</div>
              </div>
              <div className="mono" style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Data Analyst Trainee</div>
              <ul className={styles.details}>
                <li>Analyzed and cleaned real-world healthcare and patient records using Python and SQL for data quality improvement</li>
                <li>Performed exploratory data analysis (EDA) and statistical evaluation to derive actionable insights from healthcare datasets</li>
                <li>Built interactive KPI dashboards to track key performance metrics and support operational decision-making</li>
                <li>Communicated data-driven insights to stakeholders to assist in process optimization and efficiency improvements</li>
              </ul>
            </motion.div>
          </div>

          <div className={styles.column}>
            <div className="section-header">
              <div className="section-tag">Education</div>
              <h2 className="section-heading">ACADEMIC BACKGROUND</h2>
            </div>

            <motion.div 
              className={styles.record}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.recordHeader}>
                <h3 className={styles.title}>K.R. Mangalam University</h3>
                <div className={styles.date}>Aug 2023 – Jun 2027</div>
              </div>
              <div className="mono" style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Bachelor of Technology (B.Tech) in CSE — Data Science</div>
              
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <span className="mono">SGPA</span>
                  <span className={styles.metricValue}>8.83/10.0</span>
                </div>
                <div className={styles.metric}>
                  <span className="mono">ACHIEVEMENT</span>
                  <span className={styles.metricValue}>Dean's List Recipient</span>
                </div>
                <div className={styles.metric}>
                  <span className="mono">SPECIALIZATION</span>
                  <span className={styles.metricValue}>Data Science</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
