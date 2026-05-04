(function () {
    let STEP_DURATION = 4000;
    let steps = document.querySelectorAll('.step-item');
    let slides = document.querySelectorAll('.slide');
    let current = 0;
    let startTime = null;
    let rafId = null;

    // --- Touch-свайп (только мобильная версия) ---
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    const SWIPE_THRESHOLD = 50; // минимальное расстояние в px для срабатывания свайпа
    const MOBILE_BREAKPOINT = 768; // px — всё что меньше считается мобильным

    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }

    function goTo(index) {
        steps.forEach(function (s) {
            s.classList.remove('active');
            s.querySelector('.step-line-fill').style.width = '0%';
        });
        slides.forEach(function (s) {
            s.classList.remove('active');
        });

        current = index;

        steps[current].classList.add('active');
        slides[current].classList.add('active');

        startTime = performance.now();
        if (rafId) cancelAnimationFrame(rafId);
        animateLine();
    }

    function animateLine() {
        let fill = steps[current].querySelector('.step-line-fill');
        let elapsed = performance.now() - startTime;
        let progress = Math.min(elapsed / STEP_DURATION, 1);

        fill.style.width = (progress * 100) + '%';

        if (progress < 1) {
            rafId = requestAnimationFrame(animateLine);
        } else {
            let next = (current + 1) % steps.length;
            goTo(next);
        }
    }

    // --- Клик по шагу (десктоп) ---
    steps.forEach(function (s, i) {
        s.addEventListener('click', function () {
            if (rafId) cancelAnimationFrame(rafId);
            goTo(i);
        });
    });

    // --- Touch-события на контейнере со слайдами ---
    // Найди общий контейнер, внутри которого лежат slides
    // Если у тебя есть отдельный враппер — замени document на него
    const sliderContainer = slides[0].parentElement;

    sliderContainer.addEventListener('touchstart', function (e) {
        if (!isMobile()) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', function (e) {
        if (!isMobile() || !isSwiping) return;

        let deltaX = e.touches[0].clientX - touchStartX;
        let deltaY = e.touches[0].clientY - touchStartY;

        // Если движение больше по горизонтали — блокируем скролл страницы
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', function (e) {
        if (!isMobile() || !isSwiping) return;
        isSwiping = false;

        let deltaX = e.changedTouches[0].clientX - touchStartX;
        let deltaY = e.changedTouches[0].clientY - touchStartY;

        // Игнорируем вертикальный скролл
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return; // слишком короткий свайп

        if (rafId) cancelAnimationFrame(rafId);

        if (deltaX < 0) {
            // Свайп влево — следующий слайд
            let next = (current + 1) % steps.length;
            goTo(next);
        } else {
            // Свайп вправо — предыдущий слайд
            let prev = (current - 1 + steps.length) % steps.length;
            goTo(prev);
        }
    }, { passive: true });

    // Старт
    goTo(0);
})();
