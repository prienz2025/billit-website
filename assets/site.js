// site.js — shared behavior for all billit marketing pages.
// Safe to load on any page; every block guards for missing elements.
(function () {
  // Render Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Sticky header shadow on scroll
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
  }

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu')
          + '" class="ic" style="width:24px;height:24px"></i>';
      if (window.lucide) {
        lucide.createIcons();
      }
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i data-lucide="menu" class="ic" style="width:24px;height:24px"></i>';
        if (window.lucide) {
          lucide.createIcons();
        }
      }
    });
  }

  // FAQ accordion (works for one or many .faq-wrap groups)
  document.querySelectorAll('.faq-wrap').forEach((faqWrap) => {
    faqWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-q');
      if (!btn) {
        return;
      }
      const item = btn.parentElement;
      const isOpen = item.classList.contains('is-open');
      faqWrap.querySelectorAll('.faq-item').forEach((it) => {
        it.classList.remove('is-open');
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        it.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        const ans = item.querySelector('.faq-a');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
    // open any item pre-marked is-open
    const open = faqWrap.querySelector('.faq-item.is-open .faq-a');
    if (open) {
      open.style.maxHeight = open.scrollHeight + 'px';
    }
  });

  // Copyright year — start year stays fixed, end year auto-updates each year
  document.querySelectorAll('[data-since]').forEach((el) => {
    const since = parseInt(el.getAttribute('data-since'), 10);
    if (!since) {
      return;
    }
    const now = new Date().getFullYear();
    el.textContent = now > since ? since + '–' + now : String(since);
  });

  // Scroll reveal (IntersectionObserver, fire once)
  (() => {
    const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      return;
    }

    const singles = document.querySelectorAll(
        '.section-head, .stations-copy, .station-card, .faq-wrap, .package-note, '
        +
        '.cta-mark, .cta-band h2, .cta-band p, .cta-actions, .price-card, ' +
        '.step-row, .tip-card, .loc-feat, .expand-card, .station-hero-card, .contact-card, '
        +
        '.walk-row, .check-item, .notice-card, .guide-lead'
    );
    singles.forEach((el) => {
      el.classList.add('reveal');
    });

    ['.pain-grid', '.package-grid', '.steps-grid', '.why-grid', '.tips-grid',
      '.loc-feats'].forEach((sel) => {
      document.querySelectorAll(sel).forEach((grid) => {
        Array.prototype.forEach.call(grid.children, (child, i) => {
          child.classList.add('reveal');
          child.style.setProperty('--i', i);
        });
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) {
          return;
        }
        e.target.classList.add('in');
        io.unobserve(e.target);
        setTimeout(() => {
          e.target.classList.remove('reveal', 'in');
        }, 1100);
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});

    document.querySelectorAll('.reveal').forEach((el) => {
      io.observe(el);
    });
  })();
})();
