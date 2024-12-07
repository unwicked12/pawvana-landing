document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    const parallaxBackground = document.querySelector('.parallax-background');
    let scrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        scrollPosition = window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Calculate parallax offset based on scroll position
                const offset = scrollPosition * 0.4;
                
                // Apply transform with both the automatic sliding animation and scroll offset
                const currentTransform = getComputedStyle(parallaxBackground).transform;
                const slideX = -((Date.now() / 60) % 100); // Smooth sliding effect
                
                parallaxBackground.style.transform = `translate3d(${slideX}%, ${offset}px, 0)`;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        const scrollThreshold = 50;
    
        function updateNavbar() {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    
        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Check initial scroll position
    
        // Smooth scrolling for navigation links
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
    });
    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.background');
        
        // Calculate the translation value based on scroll position
        // This will make the background move slower than the scroll
        const translateY = -(scrolled * 0.5);
        
        // Apply the transform
        background.style.transform = `translateY(${translateY}px)`;
    });

    // Number animation for tokenomics
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate token amount when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tokenAmount = entry.target;
                animateValue(tokenAmount, 0, 1000000000000, 2000);
                observer.unobserve(tokenAmount);
            }
        });
    }, { threshold: 0.5 });

    const tokenAmount = document.querySelector('.token-amount');
    if (tokenAmount) {
        observer.observe(tokenAmount);
    }

    // Initialize page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Snow animation
    function createSnowflakes() {
        const snowContainer = document.createElement('div');
        snowContainer.id = 'snow-container';
        document.body.appendChild(snowContainer);

        // Create initial snowflakes
        for (let i = 0; i < 50; i++) {
            createSnowflake(snowContainer);
        }

        // Continue creating snowflakes
        setInterval(() => {
            if (document.getElementById('snow-container').children.length < 100) {
                createSnowflake(snowContainer);
            }
        }, 300);
    }

    function createSnowflake(container) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random starting position
        const startPosition = Math.random() * window.innerWidth;
        const duration = Math.random() * 3 + 3; // 3-6 seconds
        
        snowflake.style.left = startPosition + 'px';
        snowflake.style.animationDuration = duration + 's';
        
        container.appendChild(snowflake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000);
    }

    // Start snow animation when page loads
    window.addEventListener('load', createSnowflakes);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check initial scroll position

    // Smooth scrolling for navigation links
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

    // Add animation to tokenomics cards on scroll
    const cards = document.querySelectorAll('.tokenomics-card');
    const animateCards = () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (cardTop < triggerBottom) {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }
        });
    };

    // Initialize card states
    cards.forEach(card => {
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
        card.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    });

    // Add scroll event listener for card animations
    window.addEventListener('scroll', animateCards);
    animateCards(); // Initial check for visible cards

    // Copy contract address to clipboard
    const contractAddress = document.querySelector('.contract-address code');
    if (contractAddress) {
        contractAddress.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(contractAddress.textContent);
                alert('Contract address copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy contract address:', err);
            }
        });
    }
});
