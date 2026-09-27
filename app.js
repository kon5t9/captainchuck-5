// Progressive enhancement only — the log reads fine with JS off.
// 1. marks elements for a quiet page-reveal fade
// 2. keeps the .stamp SVG in sync with prefers-reduced-motion
(function () {
  document.documentElement.classList.add('js');

  var targets = document.querySelectorAll('.entry-body, .logtable tbody tr, .cred-grid > *, .station, .band-grid > *, .muster-step, .faq details, .cform, .torn-mount');
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
  targets.forEach(function (el) { io.observe(el); });
})();
