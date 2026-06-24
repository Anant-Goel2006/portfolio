import React from 'react';
import { motion } from 'framer-motion';
import styles from './Certificates.module.css';
import TiltCard from './TiltCard';

const certs = [
  { img: 'Google Data Analytics.jpg', issuer: 'Google', name: 'Google Data Analytics' },
  { img: 'Data Analysis With Python.jpg', issuer: 'IBM / Coursera', name: 'Data Analysis With Python' },
  { img: 'Data Visualization with Python.jpg', issuer: 'IBM / Coursera', name: 'Data Visualization with Python' },
  { img: 'machine learning with python.jpg', issuer: 'IBM / Coursera', name: 'Machine Learning with Python' },
  { img: 'IBM macjine learning certificate.jpg', issuer: 'IBM', name: 'Machine Learning Professional' },
  { img: 'Deloitte Data Analytics certificate.jpg', issuer: 'Deloitte', name: 'Data Analytics Certificate' },
  { img: 'GFG soft skills certificate.jpg', issuer: 'GeeksforGeeks', name: 'Soft Skills Training' },
  { img: 'REmarkskill.jpg', issuer: 'ReMarkSkill', name: 'Skills Certificate' },
];

const Certificates = () => {
  return (
    <section id="certificates" className="bg-primary">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">Credentials</div>
          <h2 className="section-heading">CERTIFICATIONS</h2>
        </div>

        <div className={styles.grid}>
          {certs.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard className={styles.card}>
                <div className={styles.imgBox}>
                  <img src={`/certificates/${cert.img}`} alt={cert.name} loading="lazy" />
                </div>
                <div className={styles.info}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <h4>{cert.name}</h4>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
