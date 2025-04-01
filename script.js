document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-nav-links");

    if (!hamburger || !mobileMenu) {
        console.error("Hamburger menu or mobile menu not found.");
        return;
    }

    // Toggle menu when clicking hamburger
    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("mobile-nav-active");
        hamburger.classList.toggle("open");

        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains("mobile-nav-active") ? "hidden" : "auto";
    });

    // Automatically close mobile menu when resizing to desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove("mobile-nav-active");
            hamburger.classList.remove("open");
            document.body.style.overflow = "auto"; // Restore scrolling
        }
    });
});
