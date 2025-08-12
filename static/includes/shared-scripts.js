// shared-scripts.js (debug verzió)

// Rész HTML betöltése
function loadPartial(id, path, callback) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`Nem található: ${path}`);
      return res.text();
    })
    .then(html => {
      const host = document.getElementById(id);
      if (!host) {
        console.warn(`⚠ Nem található host elem: #${id}`);
        return;
      }
      host.innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Mentett vagy rendszerbeállított téma alkalmazása
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    body.classList.add("dark-mode");
  }

  // FOOTER betöltése
  loadPartial("footer-placeholder", "/static/includes/footer.html");

  // HEADER betöltése és UI logika indítása
  loadPartial("header-placeholder", "/static/includes/header.html", () => {
    console.log("✅ Header betöltve.");

    // 🌙 / ☀️ gomb kezelése
    const toggleBtn = document.getElementById("toggleDark");
    if (toggleBtn) {
      console.log("🔍 toggleDark gomb megtalálva.");
      toggleBtn.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        closeNavbarIfOpen();
        console.log(`🎨 Téma váltva: ${isDark ? "Sötét" : "Világos"}`);
      });
    } else {
      console.warn("⚠ toggleDark gomb NEM található!");
    }

    // Mobil navbar automatikus zárása linkre kattintva
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    console.log(`🔍 ${navLinks.length} nav-link található.`);

    navLinks.forEach(link => {
      link.addEventListener("click", closeNavbarIfOpen);
    });

    // Aktív menüpont kijelölése
    const currentPath = window.location.pathname.replace(/\/$/, "");
    navLinks.forEach(link => {
      const href = (link.getAttribute("href") || "").replace(/\/$/, "");
      if (href && (currentPath === href || (href === "" && currentPath === "/"))) {
        link.classList.add("active");
        console.log(`✅ Aktív link beállítva: ${href}`);
      } else {
        link.classList.remove("active");
      }
    });

    // English gomb cél módosítása (pl. /egyeni → /individual)
    const enLink = document.querySelector('.navbar-nav .nav-link[href="/en"]');
    if (enLink && currentPath.startsWith("/egyeni")) {
      enLink.setAttribute("href", "/individual");
      console.log("🌍 English link módosítva: /individual");
    }
  });

  // Navbar becsukása mobilon
  function closeNavbarIfOpen() {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse)
        || new bootstrap.Collapse(navbarCollapse, { toggle: false });
      collapseInstance.hide();
      console.log("📱 Navbar bezárva mobilon.");
    }
  }
});
