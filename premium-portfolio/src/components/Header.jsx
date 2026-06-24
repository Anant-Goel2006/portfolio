import React from 'react';
import styles from './Header.module.css';

const Header = ({ scrolled }) => {
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <a href="#hero" className={styles.logo}>
          Anant<span className={styles.dot}>_</span>
        </a>
        <ul className={styles.links}>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact" className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: '4px' }}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
