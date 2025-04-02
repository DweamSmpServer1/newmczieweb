document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-nav-links");

    // Function to toggle menu
    function toggleMenu() {
        mobileMenu.classList.toggle("active");
        hamburger.classList.toggle("open");
        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
    }

    // Make toggleMenu available globally for onclick attribute
    window.toggleMenu = toggleMenu;

    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("open");
            document.body.style.overflow = "auto";
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".nav-container") && !event.target.closest(".mobile-nav-links")) {
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("open");
            document.body.style.overflow = "auto";
        }
    });

    // Automatically close mobile menu when resizing to desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("open");
            document.body.style.overflow = "auto";
        }
    });
});