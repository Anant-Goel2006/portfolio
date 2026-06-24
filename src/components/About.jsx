import React from 'react';
import { motion } from 'framer-motion';
import HangingIDCard from './HangingIDCard';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className="bg-primary">
      <div className="container">
        <div className={styles.layout}>
          
          <motion.div 
            className={styles.textCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="section-tag" style={{ marginBottom: '16px' }}>About Me</div>
            <h3 className="section-heading" style={{ fontSize: 'var(--text-2xl)', textAlign: 'left', marginBottom: 'var(--space-4)' }}>
              TURNING DATA <br/>INTO DECISIONS.
            </h3>
            
            <div className={styles.contentBox}>
              <p>
                I'm a B.Tech Computer Science student specializing in Data Science at K.R. Mangalam University, Gurgaon. With a strong foundation in Python, SQL, and statistical analysis, I transform complex datasets into clear, actionable insights.
              </p>
              <p>
                My experience spans data cleaning, exploratory analysis, machine learning, and building interactive dashboards. I've completed analytics projects at MedTourEasy and built end-to-end applications integrating ML models with full-stack deployments.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '32px' }}>
                <div className={styles.infoBlock}>
                    <div className="mono">University</div>
                    <div className={styles.infoValue}>K.R. Mangalam University</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className="mono">Degree</div>
                    <div className={styles.infoValue}>B.Tech CSE (Data Science)</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className="mono">SGPA</div>
                    <div className={styles.infoValue}>8.83 / 10.0</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className="mono">Location</div>
                    <div className={styles.infoValue}>Delhi, India</div>
                </div>
            </div>

            {/* 
            <a href="/Resume_Updated.pdf" className="btn btn-outline" style={{ marginTop: 'var(--space-5)' }} target="_blank" rel="noreferrer">
               Download Resume
            </a>
            */}
          </motion.div>

          <motion.div 
            className={styles.imageCol}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <HangingIDCard 
              imageSrc="/assets/real_profile.jpg" 
              name="Anant Goel" 
              title="" 
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
