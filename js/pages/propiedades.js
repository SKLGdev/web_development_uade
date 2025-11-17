/* 
° Leer filtros del formulario de busqueda
° Filtra propiedades 
° Renderizar cards dinamicamente
° Implementa paginacion
° Marcar favoritos con localStorage.
*/

console.log("propiedades.js cargado ✔️");
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("propiedades-list");
    if (!box) {
        console.warn("No encuentro #propiedades-list");
        return;
    }
    box.innerHTML = `
    <div class="col-12">
        <div class="alert alert-success">JS OK: inyectado por propiedades.js</div>
    </div>
    `;
});

let currentPage = 1;
let currentFilters = {};

document.addEventListener("DOMContentLoaded", () => {
    initSearchForm();
    initPagination();
    initFavButtonsDelegate();
    renderPropiedades();
});

function initSearchForm() {
    const form = document.querySelector(".property-search-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        currentFilters = {
            zona: fd.get("zona") || "",
            tipo: fd.get("tipo") || "",
            operacion: fd.get("operacion") || "",
        };
        currentPage = 1;
        renderPropiedades();
    });
}

function getFilteredProperties() {
    return PROPIEDADES.filter((p) => {
        return (
            (!currentFilters.zona || p.zona === currentFilters.zona) &&
            (!currentFilters.tipo || p.tipo === currentFilters.tipo) &&
            (!currentFilters.operacion ||
                p.operacion === currentFilters.operacion)
        );
    });
}

function renderPropiedades() {
    const container = document.querySelector("#propiedades-list");
    const pagination = document.querySelector(".pagination");
    if (!container) return;

    const favs = getFavoritos();
    const results = getFilteredProperties();
    const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = results.slice(start, start + ITEMS_PER_PAGE);

    container.innerHTML = pageItems
        .map(
            (p) => `
        <article class="property-card">
            <img src="${p.imagen}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.localidad} - ${p.zona}</p>
            <p class="price">${formatPriceUsd(p.precioUsd)}</p>
            <p>${p.ambientes} amb • ${p.banos} baños • ${p.m2} m²</p>
            <button class="btn-fav ${
                favs.includes(p.id) ? "is-fav" : ""
            }" data-id="${p.id}">
            ❤ Favorito
            </button>
        </article>
    `
        )
        .join("");

    if (pagination) {
        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return `<a href="#" data-page="${page}" class="${
                page === currentPage ? "active" : ""
            }">${page}</a>`;
        }).join("");
    }
}

function initPagination() {
    const pagination = document.querySelector(".pagination");
    if (!pagination) return;

    pagination.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-page]");
        if (!link) return;
        e.preventDefault();
        currentPage = Number(link.dataset.page);
        renderPropiedades();
    });
}

// Favoritos con localStorage
function getFavoritos() {
    try {
        return JSON.parse(localStorage.getItem("favoritos")) || [];
    } catch {
        return [];
    }
}

function toggleFavorito(id) {
    const favs = getFavoritos();
    const exists = favs.includes(id);
    const updated = exists ? favs.filter((f) => f !== id) : [...favs, id];
    localStorage.setItem("favoritos", JSON.stringify(updated));
}

function initFavButtonsDelegate() {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-fav");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        toggleFavorito(id);
        btn.classList.toggle("is-fav");
    });
}
