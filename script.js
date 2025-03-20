// Typing Animation with Color and Cursor
const text = document.querySelector(".text");
const words = ["Frontend Developer", "UI/UX Designer", "Web Designer"];
const colors = ["#0ef", "#ff4d4d", "#4dff4d"]; // Colors for each word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    text.innerHTML = `<span style="color: ${colors[wordIndex]}">${currentChar}</span><span class="cursor">|</span>`;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
};

typeEffect();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Contact Form Validation and Submission
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('.comment-section input[type="text"]');
const emailInput = document.querySelector('.comment-section input[type="email"]');
const messageInput = document.querySelector('.comment-section textarea');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (nameInput.value.trim() === '') {
        alert('Please enter your name.');
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    // Message Validation
    if (messageInput.value.trim() === '') {
        alert('Please enter your message.');
        isValid = false;
    }

    // Submit Form if Valid
    if (isValid) {
        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/mldjevyg', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while sending your message. Please try again later.');
        }
    }
});

// Real-Time Clock
const clock = document.getElementById('clock');

const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
};

setInterval(updateClock, 1000);
updateClock();

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Create hamburger menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
    document.querySelector('.header').appendChild(menuToggle);

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a'); // Select all navbar links

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Hide menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active'); // Remove 'active' class to hide the menu
        });
    });
});