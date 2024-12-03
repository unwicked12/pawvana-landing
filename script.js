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
});
