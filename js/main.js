document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    initScrollToTop();
    initSmoothScroll();
});

function setActiveNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll("nav a");
    
    links.forEach(link => {
        link.classList.remove("active");
        
        const href = link.getAttribute("href");
        if (!href) return;
        
        const normalizedPath = path.replace(/\/$/, '');
        const normalizedHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
        
        if (normalizedPath.includes(normalizedHref) || 
            normalizedPath.endsWith(normalizedHref) ||
            (normalizedHref === 'index.html' && (normalizedPath === '' || normalizedPath === '/' || normalizedPath.endsWith('/index.html')))) {
            link.classList.add("active");
        }
    });
    
    setStorageItem("ultima_pagina", path);
}

function initScrollToTop() {
    const btn = document.querySelector(".scroll-top-btn");
    if (!btn) return;

    const scrollThreshold = getStorageItem("scroll_threshold", 300);
    
    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > scrollThreshold);
    });

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initSmoothScroll() {
    const smoothScrollEnabled = getStorageItem("smooth_scroll", true);
    if (!smoothScrollEnabled) return;
    
    document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute("href");
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
}