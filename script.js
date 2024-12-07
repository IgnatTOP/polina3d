document.addEventListener('DOMContentLoaded', () => {
    function initializeSlider(slider) {
        if (!slider) return;

        const slidesContainer = slider.querySelector('.slides-container');
        const slides = slider.querySelectorAll('.my-slide');
        const prevButton = slider.querySelector('.prev-button');
        const nextButton = slider.querySelector('.next-button');
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();

        function getSlidesPerView() {
            const viewportWidth = window.innerWidth;
            if (viewportWidth <= 768) return 1;
            if (viewportWidth <= 1024) return 2;
            return 3;
        }

        function updateSliderState() {
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            
            prevButton.disabled = currentIndex <= 0;
            nextButton.disabled = currentIndex >= maxIndex;

            const slideWidth = slider.offsetWidth / slidesPerView;
            const gap = 20;
            
            const transform = currentIndex * -(slideWidth + (gap * currentIndex / slidesPerView));
            slidesContainer.style.transform = `translateX(${transform}px)`;
        }

        function handleResize() {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                currentIndex = Math.min(currentIndex, slides.length - slidesPerView);
                updateSliderState();
            }
        }

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderState();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - slidesPerView) {
                currentIndex++;
                updateSliderState();
            }
        });

        window.addEventListener('resize', handleResize);

        updateSliderState();
    }

    const sliders = document.querySelectorAll('.my-slider');
    sliders.forEach(slider => initializeSlider(slider));
});
