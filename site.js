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
