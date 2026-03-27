(function () {
  const openBtn = document.querySelector("[data-open-password]");
  const modal = document.querySelector("[data-password-modal]");
  const closeBtns = document.querySelectorAll("[data-close-password]");
  const reveal = document.querySelector(".presha-reveal");

  if (reveal) {
    // simple premium entrance
    requestAnimationFrame(() => reveal.classList.add("is-in"));
  }

  if (!openBtn || !modal) return;

  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastActive = null;

  function openModal() {
    lastActive = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";

    const firstFocusable = modal.querySelector(focusableSelector);
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";

    if (lastActive && lastActive.focus) lastActive.focus();
  }

  openBtn.addEventListener("click", openModal);
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();

    // basic focus trap
    if (e.key === "Tab" && modal.getAttribute("aria-hidden") === "false") {
      const focusables = Array.from(modal.querySelectorAll(focusableSelector));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();