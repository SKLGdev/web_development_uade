let currentPage = 1;
let currentFilters = {};

document.addEventListener("DOMContentLoaded", () => {
    initComponents('propiedades');
    loadFiltersFromStorage();
    initSearchForm();
    initPagination();
    initFavButtonsDelegate();
    renderPropiedades();
});

function loadFiltersFromStorage() {
    const saved = getStorageItem("filtros_propiedades", {});
    currentFilters = saved;
    currentPage = saved.page || 1;
    
    const form = document.querySelector(".property-search-form");
    if (form && Object.keys(saved).length > 0) {
        if (saved.ubicacion) {
            const ubicacionInput = form.querySelector('input[name="ubicacion"]');
            if (ubicacionInput) ubicacionInput.value = saved.ubicacion;
        }
        if (saved.zona) {
            const zonaSelect = form.querySelector('select[name="zona"]');
            if (zonaSelect) zonaSelect.value = saved.zona;
        }
        if (saved.tipo) {
            const tipoSelect = form.querySelector('select[name="tipo"]');
            if (tipoSelect) tipoSelect.value = saved.tipo;
        }
        if (saved.operacion) {
            const operacionSelect = form.querySelector('select[name="operacion"]');
            if (operacionSelect) operacionSelect.value = saved.operacion;
        }
    }
}

function saveFiltersToStorage() {
    const filtersToSave = {
        ...currentFilters,
        page: currentPage
    };
    setStorageItem("filtros_propiedades", filtersToSave);
}

function initSearchForm() {
    const form = document.querySelector(".property-search-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        currentFilters = {
            ubicacion: fd.get("ubicacion") || "",
            zona: fd.get("zona") || "",
            tipo: fd.get("tipo") || "",
            operacion: fd.get("operacion") || "",
        };
        currentPage = 1;
        saveFiltersToStorage();
        renderPropiedades();
    });

    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener("change", () => {
            const fd = new FormData(form);
            currentFilters = {
                ubicacion: fd.get("ubicacion") || "",
                zona: fd.get("zona") || "",
                tipo: fd.get("tipo") || "",
                operacion: fd.get("operacion") || "",
            };
            currentPage = 1;
            saveFiltersToStorage();
            renderPropiedades();
        });
    });
}

function getFilteredProperties() {
    return PROPIEDADES.filter((p) => {
        // Búsqueda por ubicación (busca en zona y localidad)
        const matchUbicacion = !currentFilters.ubicacion || 
            p.zona.toLowerCase().includes(currentFilters.ubicacion.toLowerCase()) ||
            p.localidad.toLowerCase().includes(currentFilters.ubicacion.toLowerCase());
        
        return (
            matchUbicacion &&
            (!currentFilters.zona || p.zona === currentFilters.zona) &&
            (!currentFilters.tipo || p.tipo === currentFilters.tipo) &&
            (!currentFilters.operacion || p.operacion === currentFilters.operacion)
        );
    });
}

function renderPropiedades() {
    const container = document.querySelector("#propiedades-list");
    const pagination = document.querySelector("#pagination");
    if (!container) return;

    const favs = getFavoritos();
    const results = getFilteredProperties();
    
    // Mostrar mensaje si no hay resultados
    if (results.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <h4>No se encontraron propiedades</h4>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                </div>
            </div>
        `;
        if (pagination) {
            pagination.innerHTML = "";
        }
        return;
    }
    
    const totalPages = Math.max(1, Math.ceil(results.length / ITEM_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const pageItems = results.slice(start, start + ITEM_PER_PAGE);

    // Ajustar paths de imágenes según la página actual
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const imagePathPrefix = isInPagesFolder ? '../' : './';
    
    container.innerHTML = pageItems
        .map(
            (p) => {
                // Corregir path de imagen según ubicación
                let imagePath = p.imagen;
                if (imagePath.startsWith('./img/')) {
                    imagePath = imagePath.replace('./img/', imagePathPrefix + 'img/');
                }
                
                return `
        <article class="property-card">
            <img src="${imagePath}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.localidad} - ${p.zona}</p>
            <p class="price">${formatPriceUsd(p.precioUsd)}</p>
            <p>${p.ambientes} amb • ${p.baños} baños • ${p.m2} m²</p>
            <button class="btn-fav ${
                favs.includes(p.id) ? "is-fav" : ""
            }" data-id="${p.id}">
            ❤ Favorito
            </button>
        </article>
    `;
            }
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
    const pagination = document.querySelector("#pagination");
    if (!pagination) return;

    pagination.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-page]");
        if (!link) return;
        e.preventDefault();
        currentPage = Number(link.dataset.page);
        saveFiltersToStorage();
        renderPropiedades();
    });
}

function getFavoritos() {
    return getStorageItem("favoritos", []);
}

function toggleFavorito(id) {
    const favs = getFavoritos();
    const exists = favs.includes(id);
    const updated = exists ? favs.filter((f) => f !== id) : [...favs, id];
    setStorageItem("favoritos", updated);
    return updated;
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
