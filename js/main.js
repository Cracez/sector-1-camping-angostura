document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-pill");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      // Actualizar estado activo de las píldoras
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      // Filtrar elementos de la galería
      galleryItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        const shouldShow =
          selectedFilter === "all" || itemCategory === selectedFilter;

        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // Scroll suave hacia arriba
  const scrollTopTriggers = document.querySelectorAll(".scroll-top-trigger");

  scrollTopTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // Menú de navegación móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav-drawer");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      mobileNav.hidden = isExpanded;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }
});

// Registrar clics en botones de llamada y WhatsApp
window.dataLayer = window.dataLayer || [];

document.querySelectorAll('a[href^="tel:"]').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    window.dataLayer.push({
      event: 'click_llamar',
      categoria_contacto: 'contacto',
      etiqueta_boton: enlace.textContent.trim() || 'Llama ya'
    });
  });
});

document.querySelectorAll('a[href*="wa.me"]').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    window.dataLayer.push({
      event: 'click_whatsapp',
      categoria_contacto: 'contacto',
      etiqueta_boton: enlace.textContent.trim() || 'WhatsApp'
    });
  });
});
