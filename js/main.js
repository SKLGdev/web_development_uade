/* 
° Navbar: resaltamos seccion activa
° Boton "Ir arriba"
° Scroll suave
° Manejo basico de favoritos (contador global opcional)
*/


// document.addEventListener("DOMContentLoaded", () => {
//     setActiveNav();
//     initScrollToTop();
//     initSmoothScroll();
// });

// function setActiveNav() {
//     const path = window.location.pathname;
//     const links = document.querySelectorAll("nav a");
//     links.forEach(link => {
//         const href = link.getAttribute("href");
//         if (href && path.includes(href)) {
//             link.classList.add("active");
//         }
//     });
// }

// function initScrollToTop() {
//     const btn = document.querySelector(".scroll-top-btn");
//     if (!btn) return;

//     window.addEventListener("scroll", () => {
//         btn.classList.toggle("visible", window.scrollY > 300);
//     });

//     btn.addEventListener("click", (e) => {
//         const link = e.target.closest('a[href^="#"]');
//         if (!link) return;
//         const target = document.querySelector(link.getAttribute("href"));
//         if (!target) return;
//         e.preventDefault();
//         target.scrollIntoView({ behavior: "smooth" });
//     });
// }


/* --- Archivo de prueba con un console.log */
// ===== PRUEBA: MAIN CARGADO =====
console.log("main.js CARGADO ✅");

function setActiveNav() {
    console.log("setActiveNav() ejecutado");
    const path = window.location.pathname;
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && path.includes(href)) {
            link.classList.add("active");
        }
    });
}

function initScrollToTop() {
    console.log("initScrollToTop() ejecutado");
    const btn = document.querySelector(".scroll-top-btn");
    if (!btn) {
        console.warn("No se encontró .scroll-top-btn");
        return;
    }

    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > 300);
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 👉 la función SÍ existe
function initSmoothScroll() {
    console.log("initSmoothScroll() ejecutado");
    document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded en main.js");
    setActiveNav();
    initScrollToTop();
    initSmoothScroll(); // 👈 acá NO debería dar error ahora
});
