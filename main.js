/ ===== Testimonials slider =====
const slides = document.querySelectorAll('.slide');
const dotsBox = document.getElementById('dots');
let current = 0, timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
  dot.addEventListener('click', () => { show(i); restart(); });
  dotsBox.appendChild(dot);
});

function show(n) {
  current = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  [...dotsBox.children].forEach((d, i) => d.classList.toggle('on', i === current));
}
function restart() { clearInterval(timer); timer = setInterval(() => show(current + 1), 6000); }

document.getElementById('prevBtn').addEventListener('click', () => { show(current - 1); restart(); });
document.getElementById('nextBtn').addEventListener('click', () => { show(current + 1); restart(); });
show(0); restart();

// ===== FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    // close all, then open the clicked one if it was closed
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.style.maxHeight = null;
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== Close mobile menu after tapping a link =====
document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// ===== Contact form validation =====
const form = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('input, textarea').forEach(f => {
    const ok = f.value.trim() !== '' && f.checkValidity();
    f.classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });
  if (valid) {
    statusMsg.textContent = 'Thanks! We will reply within a few hours.';
    statusMsg.className = 'mt-3 mb-0 ok';
    form.reset();
  } else {
    statusMsg.textContent = '';
  }
});
