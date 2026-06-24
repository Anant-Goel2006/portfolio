import React, { Suspense } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import './styles/global.css';
import './styles/app.css';

// Lazy load the 3D Canvas so it doesn't block initial render
const CanvasBackground = React.lazy(() => import('./components/CanvasBackground'));

function App() {
  return (
    <>
      <CustomCursor />
      <Suspense fallback={<div style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'#000', zIndex:-1 }}></div>}>
        <CanvasBackground />
      </Suspense>
      
      <main className="app-container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <footer className="main-footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-brand">Anant Goel<span style={{ color: '#666' }}>.</span></span>
            <p className="footer-text">© 2026 Anant Goel. Built for Data.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
