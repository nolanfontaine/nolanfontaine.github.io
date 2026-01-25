document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quart'
        });
    }

    // Gestion du Carousel (pour la page A Propos)
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (carousel && prevBtn && nextBtn) {
        // Définition des images pour le carousel
        const images = [
            { src: "img/belgique.jpg", alt: "Belgique" },
            { src: "img/italie.png", alt: "Italie" },
            { src: "img/espagne.jpg", alt: "Espagne" },
            { src: "img/portugal.jpg", alt: "Portugal" },
            { src: "img/tchequie.jpg", alt: "Tchéquie" },
            { src: "img/croatie.webp", alt: "Croatie" },
            { src: "img/angleterre.png", alt: "Angleterre" },
            { src: "img/corse.jpg", alt: "Corse" }
        ];

        let currentIndex = 0;

        function renderCarousel() {
            carousel.innerHTML = "";
            const total = images.length;
            const leftIndex = (currentIndex - 1 + total) % total;
            const rightIndex = (currentIndex + 1) % total;

            carousel.appendChild(createCarouselItem(images[leftIndex], "carousel-item side left"));
            carousel.appendChild(createCarouselItem(images[currentIndex], "carousel-item center"));
            carousel.appendChild(createCarouselItem(images[rightIndex], "carousel-item side right"));
        }

        function createCarouselItem(image, positionClass) {
            const itemContainer = document.createElement("div");
            itemContainer.className = "carousel-wrapper";

            const div = document.createElement("div");
            div.className = positionClass;

            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.alt;
            div.appendChild(img);

            itemContainer.appendChild(div);
            return itemContainer;
        }

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            renderCarousel();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            renderCarousel();
        });

        renderCarousel(); // Initialisation
    }
});