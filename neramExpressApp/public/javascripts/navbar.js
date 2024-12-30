document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    const threshold = 10; // Minimum scroll difference to trigger navbar hide/show
    const scrolledClass = "scrolled"; // Class for navbar style on scroll
    const hiddenClass = "hidden"; // Class for hiding the navbar

    window.addEventListener("scroll", () => {
        // Add/remove 'scrolled' class when scrolling down or up
        if (window.scrollY > 50) {
            navbar.classList.add(scrolledClass);
        } else {
            navbar.classList.remove(scrolledClass);
        }

        // Check if scrolling down with enough distance to trigger
        if (window.scrollY > lastScrollY + threshold) {
            navbar.classList.add(hiddenClass);
        }
        // Check if scrolling up with enough distance to trigger
        else if (window.scrollY < lastScrollY - threshold) {
            navbar.classList.remove(hiddenClass);
        }

        lastScrollY = window.scrollY;
    });
});
