const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__menu');
const homeBg = document.querySelector('.home__right-bg');

if ($(window).width() < 900) {
    if ($(window).width() > 500) {
        var homeRight = document.querySelector('.home__right')

        if(homeRight) homeRight.remove();
    }

    if ($(window).width() < 700) {
        homeBg.src = 'images/home-bg-mob.jpg';
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            headerMenu.classList.toggle('header__menu--active');
            if (burger.classList.contains('burger--active')) {
                $("#burger__img").attr("src","images/logos/burger-btn.svg");
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
    const slider = document.querySelector('.example__visual-slider');
    const canvas = document.querySelector('.example__visual-canvas');

    const fatImg = createImage('images/fat-cat.webp');

    const slimImg = createImage('images/slim-cat.png');

    const fatPromise = new Promise((resolve, reject) => {
        fatImg.onload = resolve;
    });

    const slimPromise = new Promise((resolve, reject) => {
        slimImg.onload = resolve;
    });

    await Promise.all([fatPromise, slimPromise]);
    drawCanvas(canvas, fatImg, slimImg, slider.value);

    slider.oninput = () => {
        drawCanvas(canvas, fatImg, slimImg, slider.value);
    }
});

function createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

function drawCanvas(canvas, fatImg, slimImg, sliderValue) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const fract = 1 - sliderValue / 100;

    context.drawImage(fatImg, 0, 0, fatImg.width * fract, fatImg.height, 0, 0, canvas.width * fract, canvas.height);
    context.drawImage(slimImg, slimImg.width * fract, 0, slimImg.width, slimImg.height, canvas.width * fract, 0, canvas.width, canvas.height);
}