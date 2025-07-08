// Basic script for potential future use, e.g., smooth scrolling or mobile menu toggle

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Ensure targetId is not just "#"
            if (targetId.length > 1) {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Example: Mobile menu toggle (basic structure, needs HTML/CSS alignment)
    // This is a placeholder and might need more specific selectors based on final HTML for a burger menu
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // Assuming you add a button with this ID
    const navUl = document.querySelector('nav ul');

    if (mobileMenuButton && navUl) {
        mobileMenuButton.addEventListener('click', () => {
            navUl.classList.toggle('active'); // You'd style '.active' in CSS for visibility
        });
    }

    // Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60px offset for header height
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (!a.classList.contains('resume-button') && a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
        // If no section is current (e.g. at the very top or bottom out of section range),
        // you might want to set a default active link or clear all.
        // For instance, default to 'home' if at the top.
        if (!current && pageYOffset < sections[0].offsetTop) {
            const homeLink = document.querySelector('nav ul li a[href="#home"]');
            if(homeLink) homeLink.classList.add('active');
        }
    });

    // Set initial active link on page load
    // Small timeout to ensure correct scroll position is read after any initial page jumps
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);

});
