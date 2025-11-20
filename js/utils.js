function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $all(selector, parent= document){
    return [...parent.querySelectorAll(selector)];
}

function formatPriceUsd(value){
    return "USD " + Number(value).toLocaleString("es-AR");
}

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

function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.warn(`Error saving to localStorage (${key}):`, e);
        return false;
    }
}

function removeStorageItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
}