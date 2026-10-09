if (/(?:^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith("/")) {
  const oldSections = {
    "#about": "about.html",
    "#focus": "about.html",
    "#work": "projects.html",
    "#people": "people.html",
    "#contact": "contact.html",
  };
  const destination = oldSections[window.location.hash];
  if (destination) window.location.replace(destination);
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
