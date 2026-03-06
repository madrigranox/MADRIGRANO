/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — SCRIPT.JS
   Scroll reveals · Particle canvas · 3D tilt · Magnetic btns
   ═══════════════════════════════════════════════════════════ */

; (function () {
  'use strict';

  /* ─── [1] DOM READY ─── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollReveal();
    initNavbar();
    initMobileMenu();
    initCursorGlow();
    initTiltCards();
    initMagneticButtons();
    initHeroCanvas();
    initSmoothScroll();
    initDemoModal();
    initThemeToggle();
  }

  /* ═══════════════════════════════════════════
     [2] SCROLL REVEAL (Intersection Observer)
     ═══════════════════════════════════════════ */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.anim-reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ═══════════════════════════════════════════
     [3] NAVBAR — scroll state
     ═══════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ═══════════════════════════════════════════
     [4] MOBILE MENU
     ═══════════════════════════════════════════ */
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════
     [4.5] THEME TOGGLE (Kindergarten)
     ═══════════════════════════════════════════ */
  function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Check saved preference
    const isKinder = localStorage.getItem('theme-kindergarten') === 'true';
    if (isKinder) {
      document.body.classList.add('theme-kindergarten');
      applyCampTranslations(true);
    }

    btn.addEventListener('click', () => {
      const isEnabled = document.body.classList.toggle('theme-kindergarten');
      localStorage.setItem('theme-kindergarten', isEnabled);
      applyCampTranslations(isEnabled);
    });
  }

  // --- Camp Translations Dictionary ---
  const magicTranslations = {
    "MADRIGRANO": "TIO MADRI",
    "Tecnologia que viabiliza. Soluções que transformam.": "Baú de Brinquedos! Invenções divertidas.",
    "Desenhamos caminhos através das tecnologias emergentes para destravar o crescimento do seu negócio e transformar lacunas de gestão em eficiência operacional.": "Vem brincar com a gente na nossa fábrica mágica de ideias! Aqui construímos castelos e robôs super legais.",
    "Conheça nossas soluções": "Quero ver os brinquedos!",
    "Capacidades & Case Studies": "Caixa de Ferramentas Mágicas",
    "Cada projeto é desenhado sob medida. Apresentamos abaixo algumas das nossas arquiteturas funcionais demonstrativas.": "Aperte os botões coloridos para ligar os nossos construtores digitais divertidos.",
    "Como trabalhamos": "Nossa Hora de Brincar",
    "Missão": "Nossa Magia",
    "Visão": "Nossa Escolinha",
    "Valores": "Nossas Regras",
    "Omniscient Logistics Core": "Frotinha Fantástica",
    "ESG Neural Engine": "Planeta Verde Feliz",
    "Quantum Fleet Sync": "Aviõezinhos Sincronizados",
    "Algorithmic Workforce": "Os Roboizinhos Construindo",
    "Autonomous RAG Oracle": "O Baú que Sabe Tudo",
    "Predictive C-Level Matrix": "A Lousa Mágica do Chefe"
  };

  function applyCampTranslations(isKinder) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      const origText = node.nodeValue.trim();
      if (!origText) continue;

      if (isKinder) {
        // Save original text if not saved
        if (!node.parentElement.hasAttribute('data-orig-text')) {
          node.parentElement.setAttribute('data-orig-text', origText);
        }
        // Replace if in dictionary
        const translation = magicTranslations[origText] || Object.entries(magicTranslations).find(([k, v]) => origText.includes(k));
        if (translation) {
          node.nodeValue = typeof translation === 'string' ? translation : origText.replace(translation[0], translation[1]);
        }
      } else {
        // Restore original
        if (node.parentElement.hasAttribute('data-orig-text')) {
          node.nodeValue = node.parentElement.getAttribute('data-orig-text');
          // Keep attribute for future toggles
        }
      }
    }
  }

  /* ═══════════════════════════════════════════
     [5] CURSOR GLOW (desktop only)
     ═══════════════════════════════════════════ */
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || !matchMedia('(pointer: fine)').matches) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    (function animate() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(animate);
    })();
  }

  /* ═══════════════════════════════════════════
     [6] 3D TILT CARDS
     ═══════════════════════════════════════════ */
  function initTiltCards() {
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ═══════════════════════════════════════════
     [7] MAGNETIC BUTTONS
     ═══════════════════════════════════════════ */
  function initMagneticButtons() {
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ═══════════════════════════════════════════
     [8] HERO CANVAS — Dot Grid Particles
     ═══════════════════════════════════════════ */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles;
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT_DESKTOP = 80;
    const PARTICLE_COUNT_MOBILE = 35;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += dx * force * 0.02;
            p.y += dy * force * 0.02;
          }
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    createParticles();
    draw();
  }

  /* ═══════════════════════════════════════════
     [9] SMOOTH SCROLL (nav links)
     ═══════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══════════════════════════════════════════
  //    [10] DEMO MODAL (Iframe logic)
  //    ═══════════════════════════════════════════ */
  function initDemoModal() {
    const triggers = document.querySelectorAll('.demo-trigger');
    const modal = document.getElementById('demoModal');
    const closeBtn = document.getElementById('demoClose');
    const titleEl = document.getElementById('demoTitle');
    const iframe = document.getElementById('demoIframe');

    if (!modal || !triggers.length) return;

    // Map of demo IDs to local Hyper-Tech React App routes
    const demoRoutes = {
      'logistica': './demos/react-app/dist/index.html#/logistica',
      'emissoes': './demos/react-app/dist/index.html#/emissoes',
      'voos': './demos/react-app/dist/index.html#/voos',
      'escala': './demos/react-app/dist/index.html#/escala',
      'faq': './demos/react-app/dist/index.html#/faq',
      'bi': './demos/react-app/dist/index.html#/bi'
    };

    function openModal(demoId, cardTitle) {
      // 1. Set text
      titleEl.textContent = `Demo: ${cardTitle}`;

      // 2. Set iframe src
      // In a real scenario, these would point to specialized anonymous deployments.
      let url = demoRoutes[demoId] || 'about:blank';

      // Pass the magical theme query if it's active
      if (document.body.classList.contains('theme-kindergarten') && url !== 'about:blank') {
        url += '?theme=kinder';
      }

      iframe.src = url;

      // 3. Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';

      // Delay clearing iframe so it doesn't flash white while animating out
      setTimeout(() => {
        iframe.src = '';
      }, 300);
    }

    // Attach to triggers
    triggers.forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent if they clicked a standard link inside the card somehow
        if (e.target.closest('a')) return;

        const demoId = card.getAttribute('data-demo');
        const cardTitle = card.querySelector('.card-title').textContent;
        openModal(demoId, cardTitle);
      });
    });

    // Close on button click
    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

})();
