document.addEventListener('DOMContentLoaded', () => {

    const allProgressBars = document.querySelectorAll('.progress-bar');
    const observerOptions = {
        root: null, 
        threshold: 0.5 
    };

    const progressBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-level');
                bar.style.width = targetWidth;
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    allProgressBars.forEach(bar => {
        progressBarObserver.observe(bar);
    });
});