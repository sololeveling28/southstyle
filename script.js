const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const form = document.querySelector('.contact-form');
const revealItems = document.querySelectorAll('.feature-item, .menu-card, .testimonial-card, .gallery-grid img, .about-image, .hero-visual');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
    });
});

const setActiveLink = () => {
    let currentId = 'home';

    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 130;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
    });
};

window.addEventListener('scroll', setActiveLink);

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Message sent ✓';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
        }, 2000);
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
});
