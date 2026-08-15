const projectLightbox = document.getElementById('projectLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let activeGallery = [];
let activeImageIndex = 0;
let previousBodyOverflow = '';

function renderLightboxImage() {
  if (!activeGallery.length) return;
  const image = activeGallery[activeImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || 'Project screenshot';
  lightboxCaption.textContent = image.alt || 'Project screenshot';
  lightboxCounter.textContent = `${activeImageIndex + 1} / ${activeGallery.length}`;
}

function openProjectLightbox(gallery, index) {
  activeGallery = gallery;
  activeImageIndex = index;
  renderLightboxImage();
  projectLightbox.classList.add('open');
  projectLightbox.setAttribute('aria-hidden', 'false');
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeProjectLightbox() {
  projectLightbox.classList.remove('open');
  projectLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = previousBodyOverflow;
}

function showPreviousImage() {
  activeImageIndex = (activeImageIndex - 1 + activeGallery.length) % activeGallery.length;
  renderLightboxImage();
}

function showNextImage() {
  activeImageIndex = (activeImageIndex + 1) % activeGallery.length;
  renderLightboxImage();
}

document.querySelectorAll('.project-media').forEach((galleryElement) => {
  const galleryImages = Array.from(galleryElement.querySelectorAll('img'));
  galleryImages.forEach((image, index) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open screenshot ${index + 1} of ${galleryImages.length}: ${image.alt}`);
    image.addEventListener('click', () => openProjectLightbox(galleryImages, index));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectLightbox(galleryImages, index);
      }
    });
  });
});

lightboxClose.addEventListener('click', closeProjectLightbox);
lightboxPrev.addEventListener('click', showPreviousImage);
lightboxNext.addEventListener('click', showNextImage);

projectLightbox.addEventListener('click', (event) => {
  if (event.target === projectLightbox) closeProjectLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!projectLightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeProjectLightbox();
  if (event.key === 'ArrowLeft') showPreviousImage();
  if (event.key === 'ArrowRight') showNextImage();
});
