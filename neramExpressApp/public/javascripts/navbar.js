document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const heroSection = document.querySelector(".hero");
    let lastScrollY = window.scrollY;
    const threshold = 10; // Minimum scroll difference to trigger navbar hide/show

    window.addEventListener("scroll", () => {
        // Calculate 60% of the hero section's height
        const heroHeight = heroSection.offsetHeight;
        const triggerPoint = heroHeight * 0.6;

        // Add/remove 'scrolled' class when scrolling down or up
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Check if user has scrolled past 60% of the hero section
        if (window.scrollY > triggerPoint) {
            // Check if scrolling down with enough distance to trigger
            if (window.scrollY > lastScrollY + threshold) {
                navbar.classList.add("hidden");
            }
            // Check if scrolling up with enough distance to trigger
            else if (window.scrollY < lastScrollY - threshold) {
                navbar.classList.remove("hidden");
            }
        }

        lastScrollY = window.scrollY;
    });
});
