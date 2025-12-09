// ==== 1. SCROLL SMOOTH LA LINK-URI DIN MENIU ====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ==== 2. NAVBAR SCROLL EFFECT + ACTIVE SECTION ====
const header = document.querySelector('#header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  // Schimbă background-ul când faci scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Activează secțiunea curentă din meniu
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (window.scrollY >= top && window.scrollY <= bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector(`nav a[href="#${id}"]`)?.classList.add('active');
    }
  });
});

// ==== 3. DARK MODE ====
const darkBtn = document.createElement('button');
darkBtn.innerText = '🌓';
darkBtn.classList.add('dark-toggle');
document.body.appendChild(darkBtn);

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ==== 4. HERO BACKGROUND SLIDESHOW ====
const hero = document.querySelector('.hero');
const heroImages = [
  'schimb1.jpg',
  'schimb2.jpeg',
  'schimb3.jpg',
  'schimb4.jpg' // Poti adauga cate vrei TU!!
];

let heroIndex = 0;
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  hero.style.background = `url('${heroImages[heroIndex]}') center/cover no-repeat`;
}, 5000); // la 5 secunde schimbă poza automat
// 🔄 HERO IMAGE SLIDESHOW – no gray on load
document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector('.hero');

  const heroImages = [
    "schimb1.jpg",
    "schimb2.jpeg",
    "schimb3.jpg"
  ];

  let index = 0;

  // pune direct prima imagine
  hero.style.backgroundImage = `url('${heroImages[0]}')`;

  // slideshow
  setInterval(() => {
    index = (index + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[index]}')`;
  }, 4000); // 4 secunde
});

// ==== 5. CAROUSEL MOTOARE – SLIDE CU BUTOANE ====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.style.display = 'none');
  slides[index].style.display = 'block';
}
// 🔄 CAROUSEL BUTTONS – MOVE by ONE ITEM
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  const width = items[0].offsetWidth + 20; // item width + gap
  carousel.scrollBy({ left: width, behavior: 'smooth' });
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  const width = items[0].offsetWidth + 20;
  carousel.scrollBy({ left: -width, behavior: 'smooth' });
});

// ==== 6. AUTO SLIDE la 6 secunde ====
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}, 6000);
// 🔹 STATS COUNTER – animă numerele când intră în view
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length) {
  const speed = 200; // mai mic = mai rapid

  const animateStats = () => {
    statNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      const current = +num.innerText;

      const increment = Math.max(1, Math.floor(target / speed));

      if (current < target) {
        num.innerText = current + increment;
        requestAnimationFrame(animateStats);
      } else {
        num.innerText = target;
      }
    });
  };

  // pornește animația doar când secțiunea intră în viewport
  const statsSection = document.querySelector('.stats-section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect(); // să nu tot repornească
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}
// 🔹 STATS COUNTER – animă numerele când secțiunea intră în viewport

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;

  const duration = 1500; // ms
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target; // asigurăm ultima valoare exactă
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector("#stats");
  const numbers = document.querySelectorAll(".stat-number");
  let started = false;

  if (!statsSection || !numbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          numbers.forEach(animateCount);
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  observer.observe(statsSection);
});


