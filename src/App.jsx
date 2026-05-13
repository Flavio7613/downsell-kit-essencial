import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(480);
  const [showSticky, setShowSticky] = useState(false);
  const [closedSticky, setClosedSticky] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    const handleScroll = () => {
      if (closedSticky) return;
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom;
        setShowSticky(bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [closedSticky]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="page-wrapper">
      {/* Top Scarcity Bar */}
      <div className="scarcity-bar">
        ⚠️ Atenção: Esta oferta especial pode desaparecer ao sair da página.
      </div>

      <header className="hero section-padding" ref={heroRef}>
        <div className="container">
          <div className="hero-top reveal">
            <div className="timer-badge">
              <span>⏳ O DESCONTO EXPIRA EM:</span>
              <strong className={timeLeft < 180 ? 'urgent' : ''}>{formatTime(timeLeft)}</strong>
            </div>
            <div className="off-badge">80% OFF</div>
          </div>
          
          <h1 className="hero-headline reveal">
            Espere! Antes de sair, leve o <span>Kit Essencial</span> por apenas <span>R$5,90.</span>
          </h1>

          <div className="hero-grid">
            <div className="hero-visual reveal">
              <div className="mockup-container">
                <div className="mockup-glow"></div>
                <img 
                  src="https://i.imgur.com/8C4BoNt.png" 
                  alt="Kit Essencial para Diabéticos" 
                  className="main-mockup"
                />
                <div className="floating-badge badge-1">🚀 Acesso Imediato</div>
                <div className="floating-badge badge-2">📄 PDF Digital</div>
                <div className="floating-badge badge-3">📥 Download Instantâneo</div>
              </div>
            </div>

            <div className="hero-offer">
              <p className="hero-subheadline reveal">
                Pare de ficar perdido sem saber o que comer. Garanta agora a versão prática para organizar sua rotina alimentar e evite erros que podem piorar sua saúde.
              </p>
              
              <div className="pricing-box reveal">
                <div className="price-tag">Oferta liberada apenas agora</div>
                <div className="price-old">De R$29,90</div>
                <div className="price-new">Por apenas <strong>R$5,90</strong></div>
                <button className="cta-btn pulse main-cta">
                  SIM! QUERO GARANTIR POR R$5,90
                </button>
                <div className="decline-link">
                  <a href="#">Não, quero perder esta oportunidade única</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Authority Bar */}
      <div className="authority-bar reveal">
        <div className="container bar-content">
          <span>⚡ Acesso Imediato</span>
          <span>📚 Material Digital</span>
          <span>✅ Conteúdo Prático</span>
          <span>🎯 Fácil de Aplicar</span>
        </div>
      </div>

      {/* Transformation Section */}
      <section className="transformation section-padding">
        <div className="container">
          <h2 className="section-title reveal">Como esse kit ajuda no seu dia a dia</h2>
          <div className="feature-grid">
            <div className="feature-card reveal">
              <div className="icon">🛒</div>
              <h3>Ajuda no mercado</h3>
              <p>Saiba exatamente o que comprar e evite gastos desnecessários com itens que não ajudam sua saúde.</p>
            </div>
            <div className="feature-card reveal">
              <div className="icon">🥗</div>
              <h3>Ajuda nas refeições</h3>
              <p>Sugestões práticas e rápidas para você não precisar gastar horas na cozinha.</p>
            </div>
            <div className="feature-card reveal">
              <div className="icon">🛑</div>
              <h3>Reduz escolhas impulsivas</h3>
              <p>Com tudo planejado, você evita comer o que não deve por falta de opção.</p>
            </div>
            <div className="feature-card reveal">
              <div className="icon">⏱️</div>
              <h3>Facilita rotina alimentar</h3>
              <p>Otimize seu tempo com um guia focado no que realmente funciona para o seu controle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <h2 className="section-title reveal">O que estão dizendo</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="user-info">
                <div className="user-photo"></div>
                <div>
                  <h4>Maria Silva</h4>
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p>"O cardápio facilitou muito minha semana. Por R$5,90 foi o melhor investimento que fiz."</p>
            </div>
            <div className="testimonial-card reveal">
              <div className="user-info">
                <div className="user-photo"></div>
                <div>
                  <h4>João Pedro</h4>
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p>"As receitas são rápidas de verdade. Finalmente parei de comer sempre a mesma coisa."</p>
            </div>
            <div className="testimonial-card reveal">
              <div className="user-info">
                <div className="user-photo"></div>
                <div>
                  <h4>Luciana Ramos</h4>
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p>"A lista de compras me ajudou a economizar no mercado. Material muito prático e direto."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits List Recap */}
      <section className="recap-section section-padding">
        <div className="container">
          <div className="recap-box reveal">
            <h2>Esta é sua última chance de economizar.</h2>
            <p>Você não precisa sair de mãos vazias e continuar cometendo erros na sua alimentação.</p>
            <ul className="recap-list">
              <li>✅ Mini cardápio semanal completo</li>
              <li>✅ Lista de compras inteligente</li>
              <li>✅ Guia de substituições saudáveis</li>
              <li>✅ 30 Receitas rápidas e fáceis</li>
            </ul>
            <div className="final-price-display">
              <span className="old">R$29,90</span>
              <span className="new">R$5,90</span>
            </div>
            <button className="cta-btn pulse">QUERO APROVEITAR O DESCONTO</button>
            <p className="scarcity-note">Essa oferta pode não aparecer novamente ao fechar esta página.</p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`sticky-footer ${showSticky ? 'active' : ''}`}>
        <div className="sticky-content">
          <div className="sticky-timer-box">
            <span className="time">{formatTime(timeLeft)}</span>
            <span className="label">OFERTA ATIVA</span>
          </div>
          <button className="sticky-cta-btn">GARANTIR POR R$5,90</button>
          <button className="sticky-close" onClick={() => setClosedSticky(true)}>&times;</button>
        </div>
      </div>
    </div>
  );
}

export default App;
