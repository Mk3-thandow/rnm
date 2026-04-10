// Mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        // Optional: prevent body scroll when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close menu when a nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Scroll spy for active section highlighting
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            });
        }
    });
}
