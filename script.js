document.addEventListener('DOMContentLoaded', () => {
    // Animate numbers in tokenomics
    const animateValue = (element, start, end, duration) => {
        if (element.dataset.animated === 'true') return;
        element.dataset.animated = 'true';

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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '20px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('token-amount')) {
                    const finalNumber = parseInt(entry.target.textContent.replace(/,/g, ''));
                    animateValue(entry.target, 0, finalNumber, 1500);
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .token-amount, .social-btn').forEach(el => {
        observer.observe(el);
    });

    // Initialize page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
