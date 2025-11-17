/*
° Mostrar propiedades destacadas 
° Llenar carrusel o cards dinamicamente a partir de propiedades
*/

document.addEventListener("DOMContentLoaded", () => {
    renderDestacadas();
});

function renderDestacadas() {
    const container = document.querySelector("#destacadas");
    if (!container) return;

    const destacadas = PROPIEDADES.filter( p => p.destacado);
    container.innerHTML = destacadas.map(p => `
        <article class="property-card">
            <img src="${p.imagen}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.localidad} - ${p.zona}</p>
            <p class="price">${formatPriceUsd(p.precioUsd)}</p>
        </article>
    `).join("");
}