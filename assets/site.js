// site.js — shared behavior for all billit marketing pages.
// Safe to load on any page; every block guards for missing elements.
(function () {
  // Render Lucide icons
  if (window.lucide) lucide.createIcons();

  // Sticky header shadow on scroll
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '" class="ic" style="width:24px;height:24px"></i>';
      if (window.lucide) lucide.createIcons();
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i data-lucide="menu" class="ic" style="width:24px;height:24px"></i>';
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // FAQ accordion (works for one or many .faq-wrap groups)
  document.querySelectorAll('.faq-wrap').forEach(function (faqWrap) {
    faqWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-q');
      if (!btn) return;
      var item = btn.parentElement;
      var isOpen = item.classList.contains('is-open');
      faqWrap.querySelectorAll('.faq-item').forEach(function (it) {
        it.classList.remove('is-open');
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        it.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        var ans = item.querySelector('.faq-a');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
    // open any item pre-marked is-open
    var open = faqWrap.querySelector('.faq-item.is-open .faq-a');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  // Scroll reveal (IntersectionObserver, fire once)
  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    var singles = document.querySelectorAll(
      '.section-head, .stations-copy, .station-card, .faq-wrap, .package-note, ' +
      '.cta-mark, .cta-band h2, .cta-band p, .cta-actions, .price-card, ' +
      '.step-row, .tip-card, .loc-feat, .expand-card, .station-hero-card, .contact-card, ' +
      '.walk-row, .check-item, .notice-card, .guide-lead'
    );
    singles.forEach(function (el) { el.classList.add('reveal'); });

    ['.pain-grid', '.package-grid', '.steps-grid', '.why-grid', '.tips-grid', '.loc-feats'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (grid) {
        Array.prototype.forEach.call(grid.children, function (child, i) {
          child.classList.add('reveal');
          child.style.setProperty('--i', i);
        });
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        setTimeout(function () { e.target.classList.remove('reveal', 'in'); }, 1100);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  })();
})();
