// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Custom Cursor Logic ---
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  
  let cursorX = 0, cursorY = 0;
  let targetX = 0, targetY = 0;
  const cursorLerp = 0.1;
  const cursorDotLerp = 0.25;
  
  let dotX = 0, dotY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Loop to animate custom cursor with smooth delay (lerp)
  function animCursor() {
    cursorX += (targetX - cursorX) * cursorLerp;
    cursorY += (targetY - cursorY) * cursorLerp;
    
    dotX += (targetX - dotX) * cursorDotLerp;
    dotY += (targetY - dotY) * cursorDotLerp;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    if (cursorDot) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Mouse hover class bindings
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .bento-card, .btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      if (el.classList.contains('work-media') || el.closest('.work-panel')) {
        document.body.classList.add('cursor-view');
      }
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-view');
    });
    el.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-click');
    });
    el.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-click');
    });
  });

  // --- Interactive Canvas Background ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 60;
    const connectionDist = 120;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.35)' : 'rgba(6, 182, 212, 0.35)'; // Purple/Cyan
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse repulsion physics
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- Bento Cards 3D Tilt & Light Reflection ---
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Custom properties for hover glare
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D rotation mechanics
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 12; // tilt sensitivity X
      const rotateY = (x - centerX) / 12;  // tilt sensitivity Y

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });
  });

  // --- Magnetic Button Effect ---
  const magneticButtons = document.querySelectorAll('.btn, .nav-cta, .logo');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Pull element toward cursor (strength factor 0.3)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      // Release element back to resting coordinates
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // --- GSAP & ScrollTrigger Animations ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load intro animations
    const loadTl = gsap.timeline();

    loadTl.to('.navbar', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out'
    });

    loadTl.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.8');

    // Title staggered letters/words slide-up
    loadTl.to('.hero-title span', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.6');

    loadTl.to('.hero-description', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.7');

    loadTl.to('.hero-cta', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8');

    loadTl.to('.scroll-indicator', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Bento Cards Entrance (reveal on scroll)
    gsap.from('.bento-card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#services',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Horizontal Scrolling Showcase Panels
    const panels = gsap.utils.toArray('.work-panel');
    const workSection = document.querySelector('#work');
    
    if (panels.length > 0 && workSection) {
      gsap.to('#work-wrap', {
        x: () => -(workSection.offsetWidth * (panels.length - 1)),
        ease: 'none',
        scrollTrigger: {
          trigger: '#work',
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${workSection.offsetWidth * (panels.length - 1)}`,
          invalidateOnRefresh: true
        }
      });
    }

    // Scroll reveal for Section tags and titles
    const titles = gsap.utils.toArray('.section-title span, .section-tag');
    titles.forEach(title => {
      gsap.from(title, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%'
        }
      });
    });

    // Contact Form reveal on scroll
    gsap.from('.contact-info-wrap', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%'
      }
    });

    gsap.from('.contact-form', {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%'
      }
    });
  }
});
