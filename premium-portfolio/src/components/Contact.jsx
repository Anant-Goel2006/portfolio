import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section id="contact" className="bg-secondary">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-heading">LET'S CONNECT</h2>
        </div>

        <div className={styles.layout}>
          <motion.div 
            className={styles.infoCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.cardBox}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '16px', color: '#fff' }}>
                BUILD SOMETHING DATA-DRIVEN.
              </h3>
              <p style={{ color: '#999', lineHeight: 1.6, marginBottom: '32px' }}>
                I'm actively seeking Data Analyst or entry-level Data Science roles. Whether you have a project, internship, or collaboration in mind — let's talk.
              </p>
              
              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Email</span>
                  <span className={styles.value}>goel.anant2006@gmail.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Phone</span>
                  <span className={styles.value}>+91 99716 49876</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Location</span>
                  <span className={styles.value}>Delhi, India</span>
                </div>
              </div>

              <div className={styles.socials}>
                <a href="https://www.linkedin.com/in/anant-goel-01049a354" target="_blank" rel="noreferrer" className={styles.socialLink}>LINKEDIN</a>
                <a href="mailto:goel.anant2006@gmail.com" className={styles.socialLink}>EMAIL</a>
                <a href="#" className={styles.socialLink}>GITHUB</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.formCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className={styles.formBox}>
              <div className={styles.formGroup}>
                <label>YOUR NAME</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label>YOUR EMAIL</label>
                <input type="email" placeholder="john@example.com" />
              </div>
              <div className={styles.formGroup}>
                <label>SUBJECT</label>
                <input type="text" placeholder="Job Opportunity" />
              </div>
              <div className={styles.formGroup}>
                <label>MESSAGE</label>
                <textarea rows="5" placeholder="Tell me about the opportunity..."></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                SEND MESSAGE
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
