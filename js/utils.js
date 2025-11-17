// funciones auxiliares 

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $all(selector, parent= document){
    return [...parent.querySelectorAll(selector)];
}

// Formateo
function formatPriceUsd(value){
    return "USD " + Number(value).toLocaleString("es-AR");
}

// Validaciones
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const group = input.closest(".form-group") || input.parentElement;
    if (!group) return;
    let span = group.querySelector(".error-msg");
    if (!span) {
        span = document.createElement("small");
        span.classList.add("error-msg");
        group.appendChild(span);
    }

    span.textContent = message; 
    input.classList.add("input-error");
}

function clearError(input){ 
    const group = input.closest(".form-group") || input.parentElement;
    if (!group) return;
    const span = group.querySelector(".error-msg");
    if (span) span.remove();
    input.classList.remove("input-error");
}