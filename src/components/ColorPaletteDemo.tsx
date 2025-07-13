import React from 'react';
import '../styles/corporate-theme.scss';

/**
 * 🎨 Professional Color Palette Demo Component
 * Demonstrates the usage patterns from the professional UI/UX guide
 */
export const ColorPaletteDemo: React.FC = () => {
  return (
    <div className="bg-page-primary" style={{ minHeight: '100vh', padding: '2rem' }}>
      {/* Navbar Example - Primary Dark Background */}
      <nav className="navbar-corporate" style={{ padding: '1rem 2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--color-white)' }}>Brand Logo</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link active">About</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section Example - Main Background with Primary Dark Text */}
      <section className="hero-corporate" style={{ padding: '3rem 2rem', borderRadius: '0.75rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Professional Color Palette in Action
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Demonstrating the strategic use of #27005D, #9400FF, #AED2FF, and #E4F1FF for modern web interfaces
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="hero-cta btn-primary-corporate">
            Primary CTA Button
          </button>
          <button className="btn-secondary-corporate">
            Secondary Action
          </button>
          <button className="btn-outline-corporate">
            Outline Button
          </button>
        </div>
      </section>

      {/* Card Grid Example - Alternating Backgrounds */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card-corporate" style={{ padding: '1.5rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Primary Dark Color</h3>
          <p className="card-content" style={{ marginBottom: '1rem' }}>
            <strong>#27005D</strong> - Used for headings, navigation bars, and primary button hover states.
            Provides strong visual impact and readability.
          </p>
          <div style={{ backgroundColor: '#27005D', height: '40px', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
          <span style={{ color: 'var(--color-text-accent)', fontWeight: 500 }}>rgb(39, 0, 93)</span>
        </div>

        <div className="card-corporate card-alternate" style={{ padding: '1.5rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Vibrant Accent Color</h3>
          <p className="card-content" style={{ marginBottom: '1rem' }}>
            <strong>#9400FF</strong> - Perfect for interactive elements, CTA buttons, and highlights.
            Use sparingly to preserve impact.
          </p>
          <div style={{ backgroundColor: '#9400FF', height: '40px', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
          <span style={{ color: 'var(--color-text-accent)', fontWeight: 500 }}>rgb(148, 0, 255)</span>
        </div>

        <div className="card-corporate" style={{ padding: '1.5rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Secondary Background</h3>
          <p className="card-content" style={{ marginBottom: '1rem' }}>
            <strong>#AED2FF</strong> - Ideal for section backgrounds, cards, and creating visual depth
            while maintaining a clean aesthetic.
          </p>
          <div style={{ backgroundColor: '#AED2FF', height: '40px', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
          <span style={{ color: 'var(--color-text-accent)', fontWeight: 500 }}>rgb(174, 210, 255)</span>
        </div>

        <div className="card-corporate card-alternate" style={{ padding: '1.5rem' }}>
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Main Background</h3>
          <p className="card-content" style={{ marginBottom: '1rem' }}>
            <strong>#E4F1FF</strong> - The foundation color for global backgrounds, forms,
            and content sections. Ensures excellent readability.
          </p>
          <div style={{ backgroundColor: '#E4F1FF', height: '40px', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
          <span style={{ color: 'var(--color-text-accent)', fontWeight: 500 }}>rgb(228, 241, 255)</span>
        </div>
      </div>

      {/* Interactive Elements Demo */}
      <section className="bg-section-secondary" style={{ padding: '2rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Interactive Elements</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {/* Form Example */}
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Form Elements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Enter your name..." 
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              <textarea 
                placeholder="Your message..." 
                rows={3}
                style={{ padding: '0.75rem', fontSize: '1rem', resize: 'vertical' }}
              />
              <button className="btn-primary-corporate">Submit Form</button>
            </div>
          </div>

          {/* Link Examples */}
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Link Styles</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" className="link-corporate">Standard Corporate Link</a>
              <a href="#" style={{ color: 'var(--color-text-accent)', textDecoration: 'underline' }}>
                Accent Color Link
              </a>
              <a href="#" className="text-primary-corporate" style={{ fontWeight: 600 }}>
                Primary Text Link
              </a>
            </div>
          </div>

          {/* Interactive States */}
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Interactive States</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="interactive-corporate" style={{ padding: '0.75rem', border: '1px solid var(--color-light)', borderRadius: '0.5rem' }}>
                Hover me for interactive effect
              </div>
              <div className="active-corporate" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                Active/Selected State
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Example */}
      <footer className="footer-corporate" style={{ padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Professional Footer</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Support</a>
        </div>
        <div className="divider-corporate" style={{ margin: '1rem 0' }}></div>
        <p style={{ margin: 0, opacity: 0.8 }}>© 2024 Professional Color Palette Demo</p>
      </footer>
    </div>
  );
};

export default ColorPaletteDemo; 