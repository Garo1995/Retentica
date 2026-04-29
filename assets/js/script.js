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































const tabs      = document.querySelectorAll('.identify-click');
const diagrams  = document.querySelectorAll('.identify-diagram');

const subtitleMap = {
    Predict : 'Identify players at risk in the next 7 days',
    Decide  : 'Discover the right initiative before revenue benchmarks',
    Measure : 'Track uplifts with round A/B logic and ROI reporting',
};

let current   = document.querySelector('.identify-diagram.is-active');
let isAnimating = false;

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.diagram;

        /* Skip if same tab or mid-animation */
        if (tab.classList.contains('active') || isAnimating) return;

        const next = document.querySelector(`.identify-diagram[data-diagram="${target}"]`);
        if (!next) return;

        isAnimating = true;

        /* ── 1. Update active tab pill ── */
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');


        /* ── 3. Exit current block to the LEFT ── */
        current.classList.remove('is-active');
        current.classList.add('is-exit');

        /* ── 4. After exit transition, reset exit block & show next ── */
        // slight stagger so exit plays first
        setTimeout(() => {
            current.classList.remove('is-exit');
            /* put it back off-screen right for future re-entry */
            current.style.transform = '';
            current.style.opacity   = '';

            /* Trigger next-enter */
            next.classList.add('is-active');
            current   = next;

            /* Unlock after enter transition completes */
            setTimeout(() => {
                isAnimating = false;
            }, 750);

        }, 400); // half the exit duration before enter starts
    });
});