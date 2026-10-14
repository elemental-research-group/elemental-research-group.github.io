document.querySelectorAll(".copy-link").forEach((button) => {
  button.addEventListener("click", async () => {
    const status = button.nextElementSibling;
    try {
      await navigator.clipboard.writeText(button.dataset.copyUrl);
      status.textContent = "Link copied";
    } catch {
      status.textContent = "Copy unavailable";
    }
  });
});
