
(function () {
    let STEP_DURATION = 4000; // ms — сколько длится один шаг
    let steps = document.querySelectorAll('.step-item');
    let slides = document.querySelectorAll('.slide');
    let current = 0;
    let timer = null;
    let startTime = null;
    let rafId = null;

    function goTo(index) {
        // Убрать активный класс у всех
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

        // Запустить прогресс
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
            // Перейти к следующему
            let next = (current + 1) % steps.length;
            goTo(next);
        }
    }

    // Клик по шагу
    steps.forEach(function (s, i) {
        s.addEventListener('click', function () {
            if (rafId) cancelAnimationFrame(rafId);
            goTo(i);
        });
    });

    // Старт
    goTo(0);
})();

