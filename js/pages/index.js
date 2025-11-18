/*
° Mostrar propiedades destacadas 
° Llenar carrusel o cards dinamicamente a partir de propiedades
° Inicializar componentes reutilizables
*/

document.addEventListener("DOMContentLoaded", () => {
    initComponents('inicio');
    renderDestacadas();
});

function renderDestacadas() {
    const container = document.querySelector("#destacadas");
    if (!container) return;

    const destacadas = PROPIEDADES.filter(p => p.destacado).slice(0, 3); // Solo las primeras 3
    container.innerHTML = destacadas.map(p => renderPropertyCardFeatured(p)).join("");
}