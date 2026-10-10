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
