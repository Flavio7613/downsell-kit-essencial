import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [showSticky, setShowSticky] = useState(false);
  const heroPricingRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Sticky CTA logic
  useEffect(() => {
    const handleScroll = () => {
      if (heroPricingRef.current) {
        const pricingPos = heroPricingRef.current.getBoundingClientRect().bottom;
        setShowSticky(pricingPos < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isUrgent = timeLeft < 180; // 3 minutes

  return (
    <div className="page-wrapper">
      {/* 1. Scarcity Top Bar */}
      <div className="scarcity-top-bar">
        ⚠️ Oferta disponível apenas nesta página.
      </div>

      {/* 2. Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-header-badges reveal">
            <div className={`timer-box ${isUrgent ? 'urgent' : ''}`}>
              <span>⚠️ Desconto expira em</span>
              <strong>{formatTime(timeLeft)}</strong>
            </div>
            <div className="offer-badge">Oferta Especial</div>
          </div>

          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-headline reveal">
                Espere! Antes de sair, leve o <span>Kit Essencial</span> por apenas <span>R$5,90.</span>
              </h1>
              
              <p className="hero-subheadline reveal">
                Uma condição especial foi liberada para você não sair sem uma solução prática para organizar sua alimentação no dia a dia.
              </p>

              <div className="mockup-area reveal mobile-only">
                 <picture>
                   <source 
                     srcset="https://images.weserv.nl/?url=i.imgur.com/8C4BoNt.png&w=500&output=webp&q=75" 
                     type="image/webp" 
                   />
                   <img 
                     src="https://images.weserv.nl/?url=i.imgur.com/8C4BoNt.png&w=500&q=75" 
                     alt="Kit Essencial para Diabéticos" 
                     width="500"
                     height="500"
                     loading="eager"
                     style={{ objectFit: 'contain' }}
                   />
                 </picture>
              </div>

              <div className="hero-pricing reveal" ref={heroPricingRef}>
                <div className="price-container">
                  <span className="price-old">De R$29,90</span>
                  <div className="price-new">
                    Por apenas <strong>R$5,90</strong>
                  </div>
                </div>

                <a href="https://pay.kirvano.com/424550e5-87f4-4a81-94a2-07a4c0dd979f" target="_self" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                  <button className="main-cta-btn">
                    SIM! QUERO GARANTIR POR R$5,90
                  </button>
                </a>

                <a href="#" className="decline-link">Não, quero perder esta oportunidade</a>
                <p className="scarcity-micro">Oferta disponível apenas nesta página.</p>
              </div>
            </div>

            <div className="hero-visual reveal desktop-only">
               <div className="mockup-area">
                 <picture>
                   <source 
                     srcset="https://images.weserv.nl/?url=i.imgur.com/8C4BoNt.png&w=800&output=webp&q=80" 
                     type="image/webp" 
                   />
                   <img 
                     src="https://images.weserv.nl/?url=i.imgur.com/8C4BoNt.png&w=800&q=80" 
                     alt="Kit Essencial para Diabéticos" 
                     width="800"
                     height="800"
                     loading="eager"
                     style={{ objectFit: 'contain' }}
                   />
                 </picture>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Emotional Section */}
      <section className="section-padding reveal">
        <div className="container">
          <div className="emotional-box">
            <h2 className="section-title">Você não precisa sair de mãos vazias</h2>
            <p>
              Essa oferta foi liberada apenas porque você chegou até aqui. 
              Depois que sair desta página, essa condição pode não aparecer novamente. 
              Por apenas R$5,90, você leva um kit prático para facilitar sua rotina alimentar.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Deliverables Section */}
      <section className="section-padding reveal">
        <div className="container">
          <h2 className="section-title">Veja tudo que vai receber agora</h2>
          <div className="feature-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">📅</div>
              <div className="feature-info">
                <h3>Mini cardápio semanal</h3>
                <p>Planejamento pronto para você não ter que pensar no que comer.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">🛒</div>
              <div className="feature-info">
                <h3>Lista de compras inteligente</h3>
                <p>Compre apenas o necessário e economize no mercado.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">🔄</div>
              <div className="feature-info">
                <h3>Guia de substituições</h3>
                <p>Aprenda a trocar ingredientes sem perder o sabor.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">📖</div>
              <div className="feature-info">
                <h3>30 Receitas rápidas</h3>
                <p>Pratos práticos e acessíveis para o seu dia a dia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Perceived Value Section */}
      <section className="value-section reveal">
        <div className="container">
          <div className="value-box">
            <span className="total-value">Valor total: R$35,60</span>
            <div className="today-value">
              Hoje por apenas
              <strong>R$5,90</strong>
            </div>
            <div className="savings-badge">ECONOMIA DE MAIS DE 80%</div>
          </div>
        </div>
      </section>

      {/* 6. Why it's worth it Section */}
      <section className="section-padding reveal">
        <div className="container">
          <h2 className="section-title">Por que esse kit vale a pena?</h2>
          <div className="feature-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">✅</div>
              <div className="feature-info">
                <h3>Organiza sua semana</h3>
                <p>Tenha clareza total sobre sua alimentação diária.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">✅</div>
              <div className="feature-info">
                <h3>Evita ficar perdido</h3>
                <p>Não perca mais tempo decidindo o que comprar no mercado.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">✅</div>
              <div className="feature-info">
                <h3>Trocas inteligentes</h3>
                <p>Ajuda nas escolhas certas para o controle glicêmico.</p>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">✅</div>
              <div className="feature-info">
                <h3>Acessibilidade</h3>
                <p>Receitas com ingredientes que você já tem em casa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="section-padding reveal">
        <div className="container">
          <h2 className="section-title">Quem já garantiu aprovou</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <p>"Me ajudou muito a organizar minhas refeições da semana de forma simples."</p>
              <div className="testimonial-author">Maria S.</div>
            </div>
            <div className="testimonial-card reveal">
              <p>"Gostei porque é direto ao ponto. Pelo valor de um café, valeu muito a pena."</p>
              <div className="testimonial-author">José R.</div>
            </div>
            <div className="testimonial-card reveal">
              <p>"As receitas são práticas e os ingredientes fáceis de encontrar. Recomendo!"</p>
              <div className="testimonial-author">Ana P.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Scarcity / CTA */}
      <section className="section-padding reveal" style={{background: 'var(--bg-soft)', paddingBottom: '120px'}}>
        <div className="container" style={{textAlign: 'center'}}>
          <h2 className="section-title">Não saia sem uma alternativa simples para começar hoje.</h2>
          <p style={{marginBottom: '30px', color: 'var(--text-muted)', fontWeight: '500'}}>
            Esta é uma oportunidade única para você levar o Kit Essencial por um preço simbólico.
          </p>
          <a href="https://pay.kirvano.com/424550e5-87f4-4a81-94a2-07a4c0dd979f" target="_self" rel="noopener noreferrer" style={{textDecoration: 'none', maxWidth: '500px', display: 'block', margin: '0 auto'}}>
            <button className="main-cta-btn">
              QUERO MEU ACESSO POR R$5,90
            </button>
          </a>
          <p className="scarcity-micro" style={{marginTop: '20px'}}>Oferta disponível apenas agora.</p>
        </div>
      </section>

      {/* 9. Sticky CTA */}
      <div className={`sticky-cta ${showSticky ? 'active' : ''}`}>
        <div className="sticky-timer">
          <span className="time">{formatTime(timeLeft)}</span>
          <span className="label">OFERTA ATIVA</span>
        </div>
        <a href="https://pay.kirvano.com/424550e5-87f4-4a81-94a2-07a4c0dd979f" target="_self" rel="noopener noreferrer" style={{flex: 1, textDecoration: 'none'}}>
          <button className="sticky-btn">GARANTIR POR R$5,90</button>
        </a>
      </div>
    </div>
  );
}

export default App;
