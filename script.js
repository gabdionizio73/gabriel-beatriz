const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const progressFill = document.getElementById('page-progress-fill');
const timeline = document.getElementById('timeline');
const timelineFill = document.getElementById('timeline-fill');
let scrollScheduled = false;

function updateScrollEffects() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pageProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressFill.style.transform = `scaleX(${Math.min(1, Math.max(0, pageProgress))})`;

  const rect = timeline.getBoundingClientRect();
  const traveled = window.innerHeight * 0.62 - rect.top;
  timelineFill.style.height = `${Math.min(rect.height, Math.max(0, traveled))}px`;
  scrollScheduled = false;
}

window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    window.requestAnimationFrame(updateScrollEffects);
    scrollScheduled = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollEffects);
updateScrollEffects();

const modal = document.getElementById('letter-modal');
const openButton = document.getElementById('open-letter');
const closeButton = document.getElementById('close-letter');
let previousFocus = null;

function openLetter() {
  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeButton.focus();
}

function closeLetter() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
}

openButton.addEventListener('click', openLetter);
closeButton.addEventListener('click', closeLetter);
modal.querySelector('[data-close-letter]').addEventListener('click', closeLetter);
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeLetter();
  if (event.key !== 'Tab') return;
  const focusable = [...modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const photos = [
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.26 (2).jpeg', alt: 'Gabriel e Beatriz juntinhos à mesa, sorrindo', caption: 'A minha foto favorita de nós dois. ♡︎' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.21.jpeg', alt: 'Gabriel e Beatriz se beijando em uma selfie no espelho', caption: 'Um beijo e mais uma lembrança nossa.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.21 (1).jpeg', alt: 'Beatriz beijando o rosto de Gabriel em uma selfie com flores', caption: 'Flores, carinho e nós dois.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.22.jpeg', alt: 'Gabriel e Beatriz sorrindo em uma selfie com flores', caption: 'O sorriso que fica na memória.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.22 (1).jpeg', alt: 'Gabriel e Beatriz juntos à mesa com uma pizza', caption: 'Até a pizza fica melhor com você.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.22 (2).jpeg', alt: 'Beatriz beijando o rosto de Gabriel à noite', caption: 'Mais um beijo para guardar.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.23.jpeg', alt: 'Gabriel e Beatriz juntos em uma selfie à noite', caption: 'A gente e os nossos momentos.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.23 (1).jpeg', alt: 'Gabriel e Beatriz em outra selfie à noite', caption: 'Mais uma noite boa ao seu lado.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.23 (2).jpeg', alt: 'Gabriel e Beatriz à mesa com bebidas quentes', caption: 'Um momento quentinho para lembrar.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.23 (3).jpeg', alt: 'Gabriel e Beatriz juntos no jardim, mostrando as alianças', caption: 'Um sim que eu quero guardar para sempre.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.24.jpeg', alt: 'Gabriel e Beatriz juntos em um jardim florido', caption: 'Nós dois entre as flores.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.24 (1).jpeg', alt: 'Gabriel e Beatriz se beijando no jardim', caption: 'Um beijo no meio do jardim.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.24 (2).jpeg', alt: 'Gabriel e Beatriz sentados juntos em um sofá vermelho', caption: 'Sempre bom estar perto de você.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.25.jpeg', alt: 'Gabriel e Beatriz abraçados em uma ponte', caption: 'De mãos dadas pelos caminhos da vida.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.25 (1).jpeg', alt: 'Gabriel e Beatriz juntos em uma ponte', caption: 'Mais uma aventura para nós dois.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.26.jpeg', alt: 'Gabriel e Beatriz juntos ao pôr do sol', caption: 'Um pôr do sol ao seu lado.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 17.04.26 (1).jpeg', alt: 'Gabriel e Beatriz juntos perto de uma moto ao pôr do sol', caption: 'Nós dois, a estrada e o pôr do sol.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.25.11.jpeg', alt: 'Gabriel e Beatriz juntos perto do mar', caption: 'Um abraço e o mundo inteiro pela frente.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.25.12.jpeg', alt: 'Gabriel e Beatriz sorrindo com doces', caption: 'Até os momentos simples viram lembrança.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.22.26 (2).jpeg', alt: 'Gabriel e Beatriz juntos diante de um jardim', caption: 'Lado a lado, do nosso jeito.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.25.11 (1).jpeg', alt: 'Gabriel e Beatriz sorrindo para uma selfie', caption: 'O tipo de sorriso que eu quero guardar.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.22.26 (1).jpeg', alt: 'Beatriz beijando o rosto de Gabriel à noite', caption: 'Um beijo, um sorriso e mais uma memória nossa.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.25.11 (2).jpeg', alt: 'Gabriel e Beatriz fazendo caretas numa selfie', caption: 'Porque a gente também sabe ser bobo junto.' },
  { src: 'imagens/WhatsApp Image 2026-11-09 at 16.22.26.jpeg', alt: 'Gabriel e Beatriz se beijando ao ar livre', caption: 'E, no meio do caminho, sempre nós.' }
];

const albumImage = document.getElementById('album-image');
const albumCaption = document.getElementById('album-caption');
const albumCounter = document.getElementById('album-counter');
const albumThumbs = document.getElementById('album-thumbs');
const albumOpen = document.getElementById('album-open');
let currentPhoto = 0;

photos.forEach((photo, index) => {
  const button = document.createElement('button');
  const img = document.createElement('img');
  button.type = 'button';
  button.className = 'album-thumb';
  button.setAttribute('aria-label', `Ver foto ${index + 1}: ${photo.alt}`);
  img.src = photo.src;
  img.alt = '';
  img.loading = 'lazy';
  button.append(img);
  button.addEventListener('click', () => showPhoto(index));
  albumThumbs.append(button);
});

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  albumImage.src = photo.src;
  albumImage.alt = photo.alt;
  albumCaption.textContent = photo.caption;
  albumCounter.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  albumOpen.setAttribute('aria-label', `Ampliar foto ${currentPhoto + 1}`);
  [...albumThumbs.children].forEach((button, index) => button.setAttribute('aria-current', String(index === currentPhoto)));
}

document.getElementById('album-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.getElementById('album-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
albumOpen.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

let touchStartX = 0;
let suppressAlbumClick = false;
albumOpen.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
albumOpen.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 55) {
    suppressAlbumClick = true;
    showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
    window.setTimeout(() => { suppressAlbumClick = false; }, 400);
  }
}, { passive: true });
showPhoto(0);

const photoModal = document.getElementById('photo-modal');
const photoModalImage = document.getElementById('photo-modal-image');
const photoModalCaption = document.getElementById('photo-modal-caption');
const photoModalClose = document.getElementById('photo-modal-close');
let photoPreviousFocus = null;

function openPhoto() {
  photoPreviousFocus = document.activeElement;
  const photo = photos[currentPhoto];
  photoModalImage.src = photo.src;
  photoModalImage.alt = photo.alt;
  photoModalCaption.textContent = photo.caption;
  photoModal.hidden = false;
  document.body.classList.add('modal-open');
  photoModalClose.focus();
}

function closePhoto() {
  photoModal.hidden = true;
  photoModalImage.removeAttribute('src');
  document.body.classList.remove('modal-open');
  photoPreviousFocus?.focus();
}

albumOpen.addEventListener('click', event => {
  if (suppressAlbumClick) {
    event.preventDefault();
    suppressAlbumClick = false;
    return;
  }
  openPhoto();
});
photoModalClose.addEventListener('click', closePhoto);
photoModal.querySelector('[data-close-photo]').addEventListener('click', closePhoto);
document.addEventListener('keydown', event => {
  if (photoModal.hidden) return;
  if (event.key === 'Escape') closePhoto();
  if (event.key === 'Tab') {
    event.preventDefault();
    photoModalClose.focus();
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
    const photo = photos[currentPhoto];
    photoModalImage.src = photo.src;
    photoModalImage.alt = photo.alt;
    photoModalCaption.textContent = photo.caption;
  }
});

const dreamToggle = document.getElementById('dream-toggle');
const dreamReveal = document.getElementById('dream-reveal');
dreamToggle.addEventListener('click', () => {
  const willOpen = dreamReveal.hidden;
  dreamReveal.hidden = !willOpen;
  dreamToggle.setAttribute('aria-expanded', String(willOpen));
  dreamToggle.firstChild.textContent = willOpen ? 'Guardar esse sonho ' : 'Descobrir meu sonho ';
  window.requestAnimationFrame(updateScrollEffects);
});

const vinylToggle = document.getElementById('vinyl-toggle');
const vinylHint = document.getElementById('vinyl-hint');
vinylToggle.addEventListener('click', () => {
  const spinning = vinylToggle.classList.toggle('is-spinning');
  vinylToggle.setAttribute('aria-pressed', String(spinning));
  vinylToggle.setAttribute('aria-label', spinning ? 'Pausar o disco de vinil' : 'Girar o disco de vinil');
  vinylHint.textContent = spinning ? 'Toque no disco para pausar ♡︎' : 'Toque no disco para girar ♡︎';
});
