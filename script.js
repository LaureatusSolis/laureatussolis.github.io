const carousel = document.getElementById('carousel');

let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let animationFrame;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    cancelAnimationFrame(animationFrame); // ferma inertia precedente
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    startInertia();
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    startInertia();
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    velocity = walk - (carousel.scrollLeft - scrollLeft);
    carousel.scrollLeft = scrollLeft - walk;
});

function startInertia() {
    velocity *= 0.95; // attrito iniziale
    if (Math.abs(velocity) < 0.5) return; // fine animazione
    carousel.scrollLeft -= velocity;
    velocity *= 0.95; // decelerazione
    animationFrame = requestAnimationFrame(startInertia);
}
