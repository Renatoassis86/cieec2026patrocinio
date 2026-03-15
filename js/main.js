// Animação de Números (Dashboard)
const counters = document.querySelectorAll('.stat-number');
const speed = 200; 

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const count = +counter.innerText.replace(/\./g, '');
  const inc = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + inc).toLocaleString('pt-BR');
    setTimeout(() => animateCounter(counter), 10);
  } else {
    counter.innerText = target.toLocaleString('pt-BR');
  }
};

const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Se for contador
      if (entry.target.classList.contains('stat-number')) {
        if (entry.target.innerText === '0' || entry.target.innerText === '') {
          animateCounter(entry.target);
        }
      }
      // Se for Barra de Progresso
      if (entry.target.classList.contains('progress-bar-fill')) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth;
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number, .progress-bar-fill').forEach(el => observer.observe(el));

const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active-section'); });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Carrossel Contínuo Geral
const photos = [
  'TRB_8011.jpg', 'TRB_8048.jpg', 'TRB_8055.jpg', 'TRB_8062.jpg', 'TRB_8168.jpg',
  'TRB_8186.jpg', 'TRB_8233.jpg', 'TRB_8250.jpg', 'TRB_8360.jpg',
  'TRB_8402.jpg', 'TRB_8524.jpg', 'TRB_8575.jpg', 'TRB_8588.jpg', 'TRB_8599.jpg',
  'TRB_8604.jpg', 'TRB_8624.jpg', 'TRB_8675.jpg', 'TRB_8739.jpg',
  'TRB_8875.jpg', 'TRB_8991.jpg', 'TRB_9013.jpg', 'TRB_9026.jpg',
  'TRB_9366.jpg', 'TRB_9372.jpg', 'TRB_9410.jpg', 'TRB_9428.jpg',
  'TRB_9461.jpg', 'TRB_9500.jpg', 'TRB_9505.jpg', 'TRB_9557.jpg', 'TRB_9559.jpg'
];

const trackLand = document.getElementById('carousel-landscape');
if (trackLand) {
  const cards = photos.map(img => `<div class="auto-slide land" style="background-image: url('imagens/${img}');"></div>`).join('');
  trackLand.innerHTML = cards + cards; // Duplicado para loop infinito
}
