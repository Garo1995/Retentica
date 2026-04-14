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
    setTimeout(function () {
        $(".create-music").addClass("start-anime");
        $("header").addClass("header-anime");
    }, 900);
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



let possSwiper = new Swiper(".poss-slider", {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
        el: ".poss-pagination",
        clickable: true,
    },
    breakpoints: {
        1020: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
        },
        760: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
            loop: true,

        },

        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
            loop: true,
        },
    },
});

let examplesSwiper = new Swiper(".examples-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".examples-pagination",
        clickable: true,
    },

});


let reviewsSwiper = new Swiper(".reviews-slider", {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
        el: ".reviews-pagination",
        clickable: true,
    },
    breakpoints: {
        1020: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
        },
        760: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
            loop: true,

        },

        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
            loop: true,
        },
    },
});





$('.examples-play').on('click', function () {
    $(this).toggleClass('play-active');
})



$('.open-reviews').on('click', function () {
    $('.reviews-btn').addClass('reviews-btn-close')
})





document.querySelectorAll('.languages-row').forEach(row => {
    const track = row.querySelector('.languages-track');

    // Дублируем содержимое для бесконечного эффекта
    const original = track.innerHTML;
    track.innerHTML = original + original;

    // Базовая скорость (десктопная)
    let speed = parseInt(row.getAttribute('data-speed')) || 40;

    // Если мобильная версия → скорость медленнее
    if (window.innerWidth <= 600) {
        speed = speed * 1.8; // Увеличиваем время → анимация становится медленнее
    }

    const direction = row.getAttribute('data-direction') || 'left';

    // Применяем
    track.style.animationDuration = speed + 's';
    track.style.animationDirection = direction === 'left' ? 'normal' : 'reverse';
});











let currentAudio = null;
let currentBlock = null;

document.querySelectorAll('.examples-play').forEach(btn => {
    const playIcon = btn.querySelector('.play-mus');
    const pauseIcon = btn.querySelector('.pous-mus');
    const audioSrc = btn.dataset.audio;

    btn.addEventListener('click', () => {

        // Если нажали на ту же кнопку — play/pause
        if (currentBlock === btn) {
            if (currentAudio.paused) {
                currentAudio.play();
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            } else {
                currentAudio.pause();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
            return;
        }

        // Если играет другой трек — остановить
        if (currentAudio) {
            currentAudio.pause();
            currentBlock.querySelector('.play-mus').style.display = "block";
            currentBlock.querySelector('.pous-mus').style.display = "none";
        }

        // Создаем новое аудио
        currentAudio = new Audio(audioSrc);
        currentBlock = btn;

        currentAudio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";

        // Когда трек закончится — вернуть play
        currentAudio.onended = () => {
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
            currentAudio = null;
            currentBlock = null;
        };
    });
});