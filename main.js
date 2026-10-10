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
