// ===========================================
// NAVBAR SCROLL EFFECT + ACTIVE LINK DETECTION
// ===========================================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section[id]:not(.popup-overlay)");
const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  let activeFound = false;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 160;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight && !activeFound) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active");
        }
      });
      activeFound = true;
    }
  });

  if (scrollY < 120) {
    navLinks.forEach(link => link.classList.remove("active"));
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetSelector = link.getAttribute("href");
    if (!targetSelector || targetSelector === "#") return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const offsetTop = target.offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===========================================
// POPUP JOB MODAL LOGIC
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("jobPopup");
  if (!popup) return;

  const openBtns = document.querySelectorAll(".open-popup");
  const closeBtn = popup.querySelector(".close-popup");

  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn?.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  });

  popup.addEventListener("click", e => {
    if (e.target === popup) {
      popup.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  const applyButtons = popup.querySelectorAll('a[href="#apply"]');
  applyButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      popup.style.display = "none";
      document.body.style.overflow = "auto";

      const applySection = document.querySelector("#apply");
      if (applySection) {
        setTimeout(() => {
          window.scrollTo({
            top: applySection.offsetTop - 70,
            behavior: "smooth"
          });
        }, 200);
      }
    });
  });
});
