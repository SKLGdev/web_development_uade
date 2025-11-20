document.addEventListener("DOMContentLoaded", () => {
    initComponents('publicar');
    initPublicationForm();
    initFileUpload();
});

function initPublicationForm() {
    // Buscar formulario en la página (puede estar en diferentes secciones)
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        // Solo procesar formularios que tengan campos de publicación
        if (form.querySelector('input[name="titulo"], input[id*="pub-"], select[id*="pub-"]')) {
            form.addEventListener("submit", handlePublicationSubmit);
            
            // Validación en tiempo real para campos numéricos
            const numericFields = form.querySelectorAll('input[type="number"]');
            numericFields.forEach(field => {
                field.addEventListener("blur", () => validateNumericField(field));
            });
        }
    });
}

function handlePublicationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (validatePublicationForm(form)) {
        const newProperty = createPropertyFromForm(form);
        addPropertyToData(newProperty);
        showSuccessMessage("¡Propiedad publicada exitosamente! Estará disponible en breve.");
        form.reset();
    } else {
        showErrorMessage("Por favor, completa todos los campos requeridos correctamente.");
    }
}

function validatePublicationForm(form) {
    let isValid = true;
    
    // Validar campos requeridos
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, "Este campo es requerido");
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    // Validar campos numéricos
    const numericFields = form.querySelectorAll('input[type="number"]');
    numericFields.forEach(field => {
        if (field.value && !validateNumericField(field)) {
            isValid = false;
        }
    });
    
    // Validar precio
    const precioField = form.querySelector('input[name="precio"], input[id*="precio"], input[id*="pub-precio"]');
    if (precioField && precioField.value) {
        const precio = parseFloat(precioField.value);
        if (isNaN(precio) || precio <= 0) {
            showError(precioField, "El precio debe ser un número mayor a 0");
            isValid = false;
        }
    }
    
    // Validar emails si existen
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showError(field, "Email inválido");
            isValid = false;
        }
    });
    
    return isValid;
}

function validateNumericField(field) {
    const value = parseFloat(field.value);
    const min = field.hasAttribute("min") ? parseFloat(field.getAttribute("min")) : 0;
    
    if (field.value && (isNaN(value) || value < min)) {
        showError(field, `Debe ser un número mayor o igual a ${min}`);
        return false;
    }
    
    clearError(field);
    return true;
}

function createPropertyFromForm(form) {
    const formData = new FormData(form);
    
    // Generar ID único
    const maxId = PROPIEDADES.length > 0 ? Math.max(...PROPIEDADES.map(p => p.id)) : 0;
    const newId = maxId + 1;
    
    // Mapear campos del formulario a la estructura de propiedad
    // Nota: Los nombres de campos pueden variar según el HTML
    return {
        id: newId,
        titulo: formData.get("titulo") || 
                form.querySelector('input[id*="titulo"]')?.value || 
                "Sin título",
        zona: formData.get("zona") || 
              form.querySelector('select[id*="zona"]')?.value || 
              "",
        localidad: formData.get("localidad") || 
                   form.querySelector('input[id*="localidad"]')?.value || 
                   "",
        tipo: formData.get("tipo") || 
              form.querySelector('select[id*="tipo"]')?.value || 
              "",
        operacion: formData.get("operacion") || 
                   form.querySelector('select[id*="operacion"]')?.value || 
                   "",
        ambientes: parseInt(formData.get("ambientes") || 
                            form.querySelector('input[id*="ambientes"]')?.value || 
                            "0") || 0,
        baños: parseInt(formData.get("baños") || 
                        form.querySelector('input[id*="baños"]')?.value || 
                        "0") || 0,
        m2: parseInt(formData.get("m2") || 
                     form.querySelector('input[id*="m2"]')?.value || 
                     "0") || 0,
        precioUsd: parseFloat(formData.get("precio") || 
                              form.querySelector('input[id*="precio"]')?.value || 
                              "0") || 0,
        imagen: "./img/default.jpg", // Imagen por defecto
        destacado: false
    };
}

function addPropertyToData(property) {
    PROPIEDADES.push(property);
    setStorageItem("propiedades", PROPIEDADES);
}

function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(fileInput => {
        fileInput.addEventListener("change", (e) => {
            const files = Array.from(e.target.files);
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            
            files.forEach(file => {
                if (file.size > maxSize) {
                    alert(`El archivo "${file.name}" excede el tamaño máximo de 5MB`);
                    e.target.value = ""; // Limpiar selección
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    alert(`El archivo "${file.name}" no es un formato válido. Use JPG, PNG o PDF.`);
                    e.target.value = ""; // Limpiar selección
                    return;
                }
            });
        });
    });
}

function showSuccessMessage(message) {
    // Buscar contenedor para el mensaje
    const main = document.querySelector("main");
    if (!main) return;
    
    // Remover mensajes anteriores
    const existingAlert = main.querySelector(".alert-success");
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement("div");
    alert.className = "alert alert-success alert-dismissible fade show container mt-4";
    alert.innerHTML = `
        <strong>¡Éxito!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insertar al inicio del main
    main.insertBefore(alert, main.firstChild);
    
    // Scroll al mensaje
    alert.scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const main = document.querySelector("main");
    if (!main) return;
    
    const existingAlert = main.querySelector(".alert-danger");
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement("div");
    alert.className = "alert alert-danger alert-dismissible fade show container mt-4";
    alert.innerHTML = `
        <strong>Error:</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    main.insertBefore(alert, main.firstChild);
    alert.scrollIntoView({ behavior: "smooth", block: "start" });
    
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}
