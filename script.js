/* about section */
function revealOnScroll() {
    const elements = document.querySelectorAll('.about-para');
    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuIcon = document.querySelector(".menu-icon");

    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

document.querySelectorAll('.carousel-container').forEach(carouselContainer => {
    const cards = carouselContainer.querySelectorAll('.card');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    const prevBtn = carouselContainer.querySelector('.prev-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    function showNextCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalCards;
        cards[currentIndex].classList.add('active');
    }

    function showPrevCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        cards[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
});


document.querySelectorAll('.carousel-container2').forEach(carouselContainer => {
    const cards = carouselContainer.querySelectorAll('.card2');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    const prevBtn = carouselContainer.querySelector('.prev-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    function showNextCard() {
        cards[currentIndex].classList.remove('active2');
        currentIndex = (currentIndex + 1) % totalCards;
        cards[currentIndex].classList.add('active2');
    }

    function showPrevCard() {
        cards[currentIndex].classList.remove('active2');
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        cards[currentIndex].classList.add('active2');
    }

    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
});


document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_07q9kon', 'template_63bp18d', this)
        .then(function (response) {
            document.getElementById('response-message').innerHTML = 'Message sent successfully!';
            document.getElementById('contact-form').reset(); // Reset the form fields
        }, function (error) {
            document.getElementById('response-message').innerHTML = 'Failed to send message. Please try again later.';
        });
});
