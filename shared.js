/**
 * ARX Systems v2.0 — Shared JavaScript
 * Nav scroll, scroll reveal, modal, form handling
 */
'use strict';

/* ---- NAV ---- */
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- SCROLL REVEAL ---- */
(function() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ---- MODAL ---- */
function openModal(id) {
  const m = document.getElementById(id || 'auditModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id || 'auditModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
(function() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay.id));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id)); });
})();

/* ---- FORM SUBMISSION ---- */
(function() {
  document.querySelectorAll('.arx-form').forEach(form => {
    const submitBtn = form.querySelector('.form-submit');
    if (!submitBtn) return;
    submitBtn.addEventListener('click', function() {
      const data = {};
      form.querySelectorAll('[id]').forEach(el => { if (el.value !== undefined) data[el.id] = el.value; });
      data.submittedAt = new Date().toISOString();
      data.page = window.location.pathname;
      console.log('[ARX] Form submission:', JSON.stringify(data, null, 2));
      // TODO: replace with fetch('/api/inquire', { method:'POST', body:JSON.stringify(data) })
      this.textContent = 'Submitted \u2713 We\u2019ll be in touch shortly.';
      this.style.opacity = '.7';
      this.disabled = true;
      setTimeout(() => closeModal(), 2500);
    });
  });
  // Dynamic "other" fields
  document.querySelectorAll('select[data-specify]').forEach(sel => {
    sel.addEventListener('change', function() {
      const target = document.getElementById(this.dataset.specify);
      if (target) target.style.display = this.value === 'other' ? 'flex' : 'none';
    });
  });
})();

/* ---- STAFF REPLACEMENT CALCULATOR (home page widget) ---- */
(function() {
  const widget = document.getElementById('staffCalc');
  if (!widget) return;
  const slider = widget.querySelector('#staffSpend');
  const dispSpend = widget.querySelector('#staffSpendVal');
  const dispSave = widget.querySelector('#staffSaveVal');
  const dispKeep = widget.querySelector('#staffKeepVal');

  function update() {
    const spend = parseInt(slider.value);
    // ARX Elite General: $499/mo. Savings = staff_spend - arx_cost
    const arxCost = 499;
    const save = Math.max(0, spend - arxCost);
    const pct = Math.min(100, ((spend - 499) / spend * 100));
    dispSpend.textContent = '$' + spend.toLocaleString() + '/mo';
    dispSave.textContent  = '$' + save.toLocaleString() + '/mo';
    dispKeep.textContent  = Math.round(pct) + '% saved';
    // fill
    const fill = ((spend - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(to right, var(--gen-lime) ${fill}%, #27272E ${fill}%)`;
  }
  slider.addEventListener('input', update);
  update();
})();

/* ---- PRICING TOGGLE (pricing page) ---- */
(function() {
  const toggleBtns = document.querySelectorAll('[data-pricing-toggle]');
  const panels = document.querySelectorAll('[data-pricing-panel]');
  if (!toggleBtns.length) return;
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.pricingToggle;
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      panels.forEach(p => {
        p.style.display = p.dataset.pricingPanel === target ? 'block' : 'none';
      });
    });
  });
})();
