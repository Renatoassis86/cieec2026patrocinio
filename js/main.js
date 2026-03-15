// Animação de Números (Dashboard)
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // quanto menor, mais rápido

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const count = +counter.innerText;

  // Calculo de incremento
  const inc = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + inc);
    setTimeout(() => animateCounter(counter), 10);
  } else {
    counter.innerText = target.toLocaleString('pt-BR');
  }
};

// Intersection Observer para ativar quando entrar na tela
const observerOptions = {
  threshold: 0.5, // 50% da seção visível
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('dashboard-card')) {
        const number = entry.target.querySelector('.stat-number');
        if (number.innerText === '0') {
          animateCounter(number);
        }
      } else {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.dashboard-card').forEach(card => observer.observe(card));

// Observer para Reveal suave em outras seções
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-section');
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// Efeito Mouse Move em cards glassmorphism
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
