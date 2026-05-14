const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");
const form = document.querySelector(".contact-form");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    if (!submitButton) return;

    submitButton.textContent = "Đã nhận thông tin";
    submitButton.setAttribute("disabled", "true");

    window.setTimeout(() => {
      submitButton.textContent = "Gửi yêu cầu";
      submitButton.removeAttribute("disabled");
      form.reset();
    }, 2600);
  });
}
