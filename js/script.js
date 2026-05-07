      const cursor = document.getElementById('cursor');
      const ring = document.getElementById('cursorRing');
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      });

      const scrollBtn = document.getElementById('scrollTop');
      window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.scrollY > 400);
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.15 });

      document.querySelectorAll('.pilar-card, .tip-item, .apd-card, .regulasi-card').forEach((el, i) => {
        el.style.transitionDelay = (i % 3) * 0.12 + 's';
        observer.observe(el);
      });

      function animateCounter(el, target) {
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString('id-ID');
          if (current >= target) clearInterval(timer);
        }, 24);
      }

      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target, parseInt(e.target.dataset.target));
            counterObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        });
      });
