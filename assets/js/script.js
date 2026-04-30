$(document).ready(function () {
    $('.open-menu').on('click', function () {
        $(this).toggleClass('close-menu');
        if ($(this).hasClass('close-menu')) {
            $('.menu-content').addClass('transition-menu');
            $('body').addClass('body_fix');
        } else {
            $('.menu-content').addClass('menu-width');
            $('body').removeClass('body_fix');
            $('.menu-content').removeClass('transition-menu');
        }
    });
    $('.nav-menu a').on('click', function () {
        $('.menu-content').addClass('menu-width');
        $('body').removeClass('body_fix');
        $('.menu-content').removeClass('transition-menu');
        $('.open-menu').removeClass('close-menu');
    })
});

$(document).ready(function () {
    $('select').styler();
});




$(document).ready(function () {
    setTimeout(function () {
        $(".banner-main").addClass("start-anime");
        $("header").addClass("header-anime");
    }, 500);
});

const revealOnScroll = () => {
    const elementsToReveal = document.querySelectorAll('.animate-on-scroll');
    const triggerPoint = window.innerHeight * 0.85;

    elementsToReveal.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerPoint) {
            element.classList.add('visible');
        }
    });
};

// 🔄 Attach listeners
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);






$(function () {
    let Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        let links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function (e) {
        let $el = e.data.el;
        $this = $(this),
            $next = $this.next();
        $next.slideToggle();
        if (!e.data.multiple) {

            $el.find('.submenu').not($next).slideUp();
        }
        if (!$this.hasClass('open')) {
            $('.link').each(function () {
                $(this).removeClass('open')
            })
            $this.addClass('open')
        } else {
            $this.removeClass('open')
        }
    }

    let accordion = new Accordion($('#accordion'), false);
});


$('.menu-scroll a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
        let $target = $(this.hash);
        $target = $target.length && $target
            || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
            let targetOffset = $target.offset().top-130;
            $('html,body')
                .animate({scrollTop: targetOffset}, 1000);
            return false;
        }
    }
});






let improveSwiper = new Swiper(".improve-slider", {
    slidesPerView: 2.2,
    spaceBetween: 12,
    breakpoints: {
        1020: {
            slidesPerView: 2.2,
            slidesPerGroup: 1,
            spaceBetween: 12,
        },
        760: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 12,
        },
        520: {
            slidesPerView: 1.3,
            slidesPerGroup: 1,
            spaceBetween: 10,
            loop: true,
        },
        320: {
            slidesPerView: 1.1,
            slidesPerGroup: 1,
            spaceBetween: 10,
            loop: true,
        },
    },
    navigation: {
        nextEl: ".improve-button-next",
        prevEl: ".improve-button-prev",
    },
});





















function updateReveal() {
    const winH = window.innerHeight;

    document.querySelectorAll('[data-para]').forEach(para => {
        const words = para.querySelectorAll('.word');
        const icons = para.querySelectorAll('[data-icon]');
        const rect  = para.getBoundingClientRect();
        const total = words.length;

        const triggerStart = winH * 0.88;
        const triggerEnd   = winH * 0.05;
        const range        = triggerStart - triggerEnd;
        const progress     = Math.min(1, Math.max(0, (triggerStart - rect.top) / range));
        const litCount     = Math.round(progress * total);

        words.forEach((word, i) => {
            if (i < litCount) word.classList.add('lit');
            else word.classList.remove('lit');
        });

        // icon follows progress too
        icons.forEach(icon => {
            if (progress > 0.08) icon.classList.add('lit');
            else icon.classList.remove('lit');
        });
    });
}

window.addEventListener('scroll', updateReveal, { passive: true });
window.addEventListener('resize', updateReveal, { passive: true });
updateReveal();












































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










































const circleWrap = document.getElementById('circleWrap');
const counter    = document.getElementById('counter');

const MIN_VAL  = 100;
const MAX_VAL  = 3999.99;
const INIT_VAL = 2359.02;

let currentRotation = 0;
let targetRotation  = 0;
let currentValue    = INIT_VAL;
let targetValue     = INIT_VAL;

/* 🔥 сильно уменьшаем влияние */
const SCROLL_SENSITIVITY = 0.03; // чем меньше — тем медленнее
const MAX_ROTATION = 40;         // ограничение, чтобы не "перекручивалось"

const VAL_PER_DEG = (MAX_VAL - MIN_VAL) / 180;

/* -------------------------------------------------- */
/* Видимость блока                                    */
/* -------------------------------------------------- */
let sectionIsVisible = false;

const section = document.querySelector('.gambling-main');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            sectionIsVisible = entry.intersectionRatio > 0.3;
        });
    },
    { threshold: [0, 0.3, 0.6] }
);

if (section) observer.observe(section);

/* -------------------------------------------------- */
/* Скролл                                             */
/* -------------------------------------------------- */
function onWheel(e) {
    if (!sectionIsVisible) return;

    // 🔥 вместо dir используем реальную силу скролла
    let delta = e.deltaY * SCROLL_SENSITIVITY;

    targetRotation += delta;

    // 🔒 ограничиваем вращение
    targetRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, targetRotation));

    targetValue = Math.min(
        MAX_VAL,
        Math.max(
            MIN_VAL,
            INIT_VAL + targetRotation * VAL_PER_DEG
        )
    );
}

window.addEventListener('wheel', onWheel, { passive: true });

/* -------------------------------------------------- */
/* Плавность                                          */
/* -------------------------------------------------- */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate() {
    currentRotation = lerp(currentRotation, targetRotation, 0.05); // очень плавно
    currentValue    = lerp(currentValue, targetValue, 0.05);

    circleWrap.style.transform =
        `translateX(-50%) rotate(${currentRotation}deg)`;

    counter.textContent = currentValue.toFixed(2);

    requestAnimationFrame(animate);
}

animate();
































const buttons = document.querySelectorAll('.identify-click');
const diagrams = document.querySelectorAll('.identify-diagram');

let current = 0;
let isAnimating = false;

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {

        if (index === current || isAnimating) return;
        isAnimating = true;

        const currentEl = diagrams[current];
        const nextEl = diagrams[index];

        // кнопки
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 1. закрываем текущий (width -> 0)
        currentEl.style.clipPath = "inset(0 100% 0 0)";
        currentEl.style.opacity = "0";

        // 2. готовим следующий
        nextEl.style.transition = "none";
        nextEl.style.clipPath = "inset(0 100% 0 0)";
        nextEl.style.opacity = "0";

        setTimeout(() => {
            // 3. открываем (width 0 -> 100)
            nextEl.style.transition = "clip-path 1.5s ease, opacity 1.5s ease";
            nextEl.style.clipPath = "inset(0 0 0 0)";
            nextEl.style.opacity = "1";

            current = index;

            setTimeout(() => {
                isAnimating = false;
            }, 1500);

        }, 1500);

    });
});