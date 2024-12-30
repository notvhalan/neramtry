document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".fade-in, .fade-in-left, .fade-in-right, .fade-in-top"
    );
    animatedElements.forEach((el) => observer.observe(el));
});
