const circleWrap = document.getElementById('circleWrap');
const counter    = document.getElementById('counter');

const MIN_VAL  = 100;
const MAX_VAL  = 3999.99;
const INIT_VAL = 2359.02;

let currentRotation = 0;
let targetRotation  = 0;
let currentValue    = INIT_VAL;
let targetValue     = INIT_VAL;

/* 🔥 чувствительность */
const SCROLL_SENSITIVITY = 0.03;
const MAX_ROTATION = 40;

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
/* Универсальный скролл (ПК + мобильные)              */
/* -------------------------------------------------- */
let lastScroll = window.scrollY;

function onScroll() {
    if (!sectionIsVisible) return;

    const currentScroll = window.scrollY;
    const delta = currentScroll - lastScroll;

    lastScroll = currentScroll;

    targetRotation += delta * SCROLL_SENSITIVITY;

    // ограничение вращения
    targetRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, targetRotation));

    // пересчет значения
    targetValue = Math.min(
        MAX_VAL,
        Math.max(
            MIN_VAL,
            INIT_VAL + targetRotation * VAL_PER_DEG
        )
    );
}

window.addEventListener('scroll', onScroll, { passive: true });

/* -------------------------------------------------- */
/* Плавная анимация                                  */
/* -------------------------------------------------- */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate() {
    currentRotation = lerp(currentRotation, targetRotation, 0.05);
    currentValue    = lerp(currentValue, targetValue, 0.05);

    if (circleWrap) {
        circleWrap.style.transform =
            `translateX(-50%) rotate(${currentRotation}deg)`;
    }

    if (counter) {
        counter.textContent = currentValue.toFixed(2);
    }

    requestAnimationFrame(animate);
}

animate();