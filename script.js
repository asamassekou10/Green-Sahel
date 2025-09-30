document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
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
            // Prevent default anchor click behavior
            e.preventDefault();

            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position to scroll to
                const headerOffset = 70; // Height of the fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Scroll to the element
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
                // Optional: Unobserve after animation to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Project Modal Functionality ---
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    // Function to open modal
    function openModal(btn) {
        const title = btn.getAttribute('data-title');
        const image = btn.getAttribute('data-image');
        const description = btn.getAttribute('data-description');
        const details = JSON.parse(btn.getAttribute('data-details'));
        const impact = btn.getAttribute('data-impact');

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

    // Add event listeners to Learn More buttons
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this);
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

    // FormSmart integration - no additional JavaScript needed as it's handled by FormSmart

});