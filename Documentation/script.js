window.onload = function () {
    var button = document.getElementById('reveal-button');

    var slide = document.getElementById('slide');

    button.addEventListener('click', function () {
        slide.style.opacity = '0';

        setTimeout(function () {
            slide.style.display = 'none';
            mainContent.classList.add('show-content');
        }, 1500);
    });
};