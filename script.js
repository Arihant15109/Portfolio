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
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
/* About section end */

document.querySelectorAll('.carousel-container').forEach(carouselContainer => {
    const cards = carouselContainer.querySelectorAll('.card');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    const prevBtn = carouselContainer.querySelector('.prev-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    // Function to show the next card
    function showNextCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalCards;
        cards[currentIndex].classList.add('active');
    }

    // Function to show the previous card
    function showPrevCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        cards[currentIndex].classList.add('active');
    }

    // Add event listeners to buttons
    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
});

/* works section */

document.querySelectorAll('.carousel-container2').forEach(carouselContainer => {
    const cards = carouselContainer.querySelectorAll('.card2');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    const prevBtn = carouselContainer.querySelector('.prev-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    // Function to show the next card
    function showNextCard() {
        cards[currentIndex].classList.remove('active2');
        currentIndex = (currentIndex + 1) % totalCards;
        cards[currentIndex].classList.add('active2');
    }

    // Function to show the previous card
    function showPrevCard() {
        cards[currentIndex].classList.remove('active2');
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        cards[currentIndex].classList.add('active2');
    }

    // Add event listeners to buttons
    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
});

/* contact section */

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    // Send the email using EmailJS
    emailjs.sendForm('service_07q9kon', 'template_63bp18d', this)
        .then(function(response) {
            document.getElementById('response-message').innerHTML = 'Message sent successfully!';
            document.getElementById('contact-form').reset(); // Reset the form fields
        }, function(error) {
            document.getElementById('response-message').innerHTML = 'Failed to send message. Please try again later.';
        });
});
