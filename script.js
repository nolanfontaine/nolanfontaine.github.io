let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            indicators[i].classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); 

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (elementPosition < screenHeight) {
            element.classList.add('active');
        }
    });
};

document.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);


const images = document.querySelectorAll("main img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");



