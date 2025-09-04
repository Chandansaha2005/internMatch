
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    const closeMenu = document.getElementById("close-menu");

    const themeToggle = document.getElementById("theme-toggle"); // desktop
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle"); // mobile
    const html = document.documentElement;

    // --- Mobile menu toggle ---
    function toggleMenu() {
        menu.classList.toggle("open");
        overlay.classList.toggle("open");
        menuButton.classList.toggle("open");
    }
    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // --- Theme toggle (shared function) ---
    function toggleTheme() {
        html.classList.toggle("dark");
        // Save preference in localStorage
        if (html.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    }

    themeToggle.addEventListener("click", toggleTheme);
    mobileThemeToggle.addEventListener("click", toggleTheme);

    // --- Load saved theme on page load ---
    if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        html.classList.add("dark");
    } else {
        html.classList.remove("dark");
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add smooth scrolling to nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Form submission (demo)
document.querySelector('button[type="button"]').addEventListener('click', function (e) {
    if (this.textContent === 'Send Message') {
        e.preventDefault();
        alert('This is a demo form. In a real application, this would send your message to our team!');
    }
});