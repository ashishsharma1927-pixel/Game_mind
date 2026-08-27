import './Portfolio.css';

export const Portfolio = () => {
  return (
    <div className="portfolio-section">
      <nav className="portfolio-nav">
        <div className="nav-logo">
          <img src="/logo.jpg" alt="GAMER_MIND Logo" className="brand-logo" />
        </div>
      </nav>
      <div className="portfolio-container">
        <header id="about" className="portfolio-header">
          <h1 className="glitch-text">ACCESS GRANTED.</h1>
          <p className="portfolio-bio">
            I am a specialized developer building high-performance 3D environments, 
            artificial intelligence integrations, and immersive web experiences. 
            Below is an archive of my systems.
          </p>
        </header>

        {/* Projects Grid */}
        <section id="work" className="portfolio-projects">
          <h2 className="section-title">&gt; INITIATING_PROJECTS</h2>
          
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-image-placeholder project-1"></div>
              <div className="project-content">
                <h3>NEURAL NPC SYSTEM</h3>
                <p>Advanced AI behavioral models integrated directly into a WebGL engine for realistic character interactions.</p>
                <div className="project-tags">
                  <span>TypeScript</span>
                  <span>Three.js</span>
                  <span>TensorFlow.js</span>
                </div>
                <a href="#" className="project-link">VIEW SOURCE</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-image-placeholder project-2"></div>
              <div className="project-content">
                <h3>CYBERPUNK CITY GEN</h3>
                <p>Procedural city generation algorithm capable of building infinite sci-fi environments at 60FPS in the browser.</p>
                <div className="project-tags">
                  <span>React Three Fiber</span>
                  <span>GLSL</span>
                  <span>Algorithms</span>
                </div>
                <a href="#" className="project-link">VIEW SOURCE</a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-image-placeholder project-3"></div>
              <div className="project-content">
                <h3>QUANTUM ENGINE</h3>
                <p>A custom 3D rendering pipeline designed for lighting optimization and advanced post-processing effects.</p>
                <div className="project-tags">
                  <span>WebGL</span>
                  <span>C++</span>
                  <span>WASM</span>
                </div>
                <a href="#" className="project-link">VIEW SOURCE</a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Stats */}
        <section id="skills" className="portfolio-skills">
          <h2 className="section-title">&gt; SYSTEM_CAPABILITIES</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>[ LANGUAGES ]</h3>
              <ul>
                <li>TypeScript <span>98%</span></li>
                <li>Python <span>90%</span></li>
                <li>C++ <span>85%</span></li>
                <li>Rust <span>70%</span></li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>[ FRAMEWORKS ]</h3>
              <ul>
                <li>React / Next.js <span>95%</span></li>
                <li>Three.js / R3F <span>92%</span></li>
                <li>Node.js <span>88%</span></li>
                <li>WebGL <span>80%</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer id="contact" className="portfolio-footer">
          <h2 className="section-title">&gt; ESTABLISH_CONNECTION</h2>
          <p>Ready to build the next generation of interactive experiences?</p>
          <div className="contact-links">
            <a href="mailto:hello@example.com" className="btn-primary">INITIALIZE EMAIL</a>
            <a href="#" className="btn-secondary">GITHUB</a>
            <a href="#" className="btn-secondary">LINKEDIN</a>
          </div>
          <p className="copyright">SYSTEM STATUS: ONLINE. © {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  );
};
