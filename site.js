if (/(?:^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith("/")) {
  const oldSections = {
    "#about": "about.html",
    "#focus": "about.html#focus",
    "#work": "projects.html",
    "#people": "people.html",
    "#contact": "contact.html",
  };
  const destination = oldSections[window.location.hash];
  if (destination) window.location.replace(destination);
}

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileNav.hidden = isOpen;
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mobileNav.hidden = true;
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video").forEach((video) => video.pause());
}

document.querySelectorAll(".portal-media video").forEach((video) => {
  const reveal = () => video.classList.add("is-ready");
  if (video.readyState >= 2) reveal();
  else video.addEventListener("loadeddata", reveal, { once: true });
});

const coverVideo = document.querySelector(".page-home .hero-video");
if (coverVideo) {
  const slowOrbit = () => { coverVideo.playbackRate = 0.25; };
  coverVideo.addEventListener("loadedmetadata", slowOrbit, { once: true });
  slowOrbit();
}
