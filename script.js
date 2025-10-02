document.addEventListener('DOMContentLoaded', () => {

    // --- Hide Header on Scroll Down, Show on Scroll Up ---
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Hide header on scroll down, show on scroll up
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        lastScrollY = window.scrollY;

        // Add scrolled class for background change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-content a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Adjusted to navbar height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Project Modal Functionality ---
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal .close');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to open modal
    function openModal(btn) {
        const title = btn.getAttribute('data-title');
        const image = btn.getAttribute('data-image');
        const description = btn.getAttribute('data-description');
        const detailsStr = btn.getAttribute('data-details');
        const impact = btn.getAttribute('data-impact');

        // Check if data attributes exist to prevent errors
        if (!title || !image || !description || !detailsStr || !impact) {
            console.error('Modal data attributes are missing on a project card.', btn);
            return; // Exit if data is incomplete
        }

        const details = JSON.parse(detailsStr);

        // Populate modal content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalImage').alt = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalImpact').textContent = impact;

        // Populate details list
        const detailsList = document.getElementById('modalDetails');
        detailsList.innerHTML = '';
        details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Add event listeners to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const learnMoreBtn = this.querySelector('.learn-more-btn');
            if (learnMoreBtn) {
                openModal(learnMoreBtn);
            }
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

});
