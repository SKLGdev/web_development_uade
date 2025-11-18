/* 
° Navbar: resaltamos seccion activa
° Boton "Ir arriba"
° Scroll suave
° Manejo basico de favoritos (contador global opcional)
*/

document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    initScrollToTop();
    initSmoothScroll();
});

function setActiveNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll("nav a");
    
    links.forEach(link => {
        // Remover clase active de todos los links primero
        link.classList.remove("active");
        
        const href = link.getAttribute("href");
        if (!href) return;
        
        // Normalizar las rutas para comparación
        const normalizedPath = path.replace(/\/$/, ''); // Remover trailing slash
        const normalizedHref = href.replace(/^\.\.\//, '').replace(/^\.\//, ''); // Remover ../ y ./
        
        // Comparar si el path incluye el href o si es la página actual
        if (normalizedPath.includes(normalizedHref) || 
            normalizedPath.endsWith(normalizedHref) ||
            (normalizedHref === 'index.html' && (normalizedPath === '' || normalizedPath === '/' || normalizedPath.endsWith('/index.html')))) {
            link.classList.add("active");
        }
    });
}

function initScrollToTop() {
    const btn = document.querySelector(".scroll-top-btn");
    if (!btn) return;

    // Mostrar/ocultar botón según el scroll
    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > 300);
    });

    // Hacer scroll al top cuando se hace click
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initSmoothScroll() {
    // Scroll suave para enlaces internos (anclas)
    document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute("href");
        if (href === "#") return; // Ignorar enlaces vacíos
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
}