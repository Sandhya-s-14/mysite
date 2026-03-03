export default function decorate(block) {
  block.classList.add('carousel');

  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides');

  const slides = [...block.children];

  slides.forEach((slide) => {
    slide.classList.add('slide');
    slidesWrapper.appendChild(slide);
  });

  block.textContent = '';
  block.appendChild(slidesWrapper);

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Create buttons
  const prevButton = document.createElement('button');
  prevButton.textContent = '‹';
  prevButton.classList.add('prev');

  const nextButton = document.createElement('button');
  nextButton.textContent = '›';
  nextButton.classList.add('next');

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  block.append(prevButton, nextButton);

  /* -------- Auto Play -------- */
  setInterval(() => {
    currentIndex =
      (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 4000);
}