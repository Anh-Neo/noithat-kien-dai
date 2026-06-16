const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");
const form = document.querySelector(".contact-form");
const revealItems = document.querySelectorAll(".reveal");
const searchInput = document.querySelector("#site-search-input");
const designCards = document.querySelectorAll("[data-design-card]");
const designEmpty = document.querySelector("[data-design-empty]");
const normalizeSearch = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();

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

if (revealItems.length && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (searchInput) {
  const params = new URLSearchParams(window.location.search);
  const rawQuery = (params.get("q") || "").trim();
  const query = normalizeSearch(rawQuery);
  if (rawQuery) {
    searchInput.value = rawQuery;
  }

  if (query && designCards.length) {
    let visibleCount = 0;
    designCards.forEach((card) => {
      const text = normalizeSearch(card.getAttribute("data-search-text") || "");
      const isMatch = text.includes(query);
      card.toggleAttribute("hidden", !isMatch);
      if (isMatch) visibleCount += 1;
    });

    if (designEmpty) {
      designEmpty.classList.toggle("is-visible", visibleCount === 0);
    }
  }
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
