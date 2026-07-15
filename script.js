const stars = document.getElementById('stars');
for (let i = 0; i < 68; i += 1) {
  const star = document.createElement('i');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty('--d', `${3.2 + Math.random() * 5}s`);
  star.style.animationDelay = `${Math.random() * 5}s`;
  const size = Math.random() > .9 ? 2.5 : 1.25;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  stars.appendChild(star);
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .1 });
reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const header = document.getElementById('siteHeader');
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 28);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const stage = document.getElementById('heroStage');
const phone = document.getElementById('phoneMockup');
if (matchMedia('(pointer:fine)').matches) {
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    phone.style.transform = `rotate(-2.3deg) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) translate(${x * 4}px, ${y * 3}px)`;
  });
  stage.addEventListener('mouseleave', () => {
    phone.style.transform = 'rotate(-2.3deg)';
  });
}
