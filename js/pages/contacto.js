<<<<<<< HEAD
=======
/* 
Manejo de formularios de contacto:
° Validar campos requeridos
° Validar emails
° Mostrar mensajes de error/success
° Prevenir envío si hay errores
*/

const CONTACT_STORAGE_KEY = "pz_contact_submissions";
const MAX_STORED_FORMS = 10;

>>>>>>> 858506c959f8b3cd1c55ae9d1d5acd9a944458da
document.addEventListener("DOMContentLoaded", () => {
    initComponents('contacto');
    initContactForms();
});

function initContactForms() {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        loadFormData(form);
        form.addEventListener("submit", handleFormSubmit);
        
        const inputs = form.querySelectorAll("input, textarea, select");
        inputs.forEach(input => {
            input.addEventListener("blur", () => {
                validateField(input);
                saveFormData(form);
            });
            input.addEventListener("input", () => {
                clearError(input);
                saveFormData(form);
            });
        });
    });
}

function loadFormData(form) {
    const formId = form.id || "contacto_form";
    const saved = getStorageItem(`form_${formId}`, {});
    
    Object.keys(saved).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && !field.value) {
            field.value = saved[key];
        }
    });
}

function saveFormData(form) {
    const formId = form.id || "contacto_form";
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (value.trim()) {
            data[key] = value;
        }
    }
    
    setStorageItem(`form_${formId}`, data);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (validateForm(form)) {
<<<<<<< HEAD
        const formData = new FormData(form);
        const submission = {
            timestamp: new Date().toISOString(),
            data: Object.fromEntries(formData.entries())
        };
        
        const submissions = getStorageItem("contacto_submissions", []);
        submissions.push(submission);
        if (submissions.length > 50) submissions.shift();
        setStorageItem("contacto_submissions", submissions);
        
        const formId = form.id || "contacto_form";
        removeStorageItem(`form_${formId}`);
        
=======
        saveFormSubmission(form);
>>>>>>> 858506c959f8b3cd1c55ae9d1d5acd9a944458da
        showSuccessMessage(form);
        form.reset();
    } else {
        showErrorMessage("Por favor, corrige los errores en el formulario");
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validar emails
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showError(field, "Email inválido");
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    if (field.hasAttribute("required") && !field.value.trim()) {
        showError(field, "Este campo es requerido");
        return false;
    }
    
    if (field.type === "email" && field.value && !isValidEmail(field.value)) {
        showError(field, "Email inválido");
        return false;
    }
    
    clearError(field);
    return true;
}

function showSuccessMessage(form) {
    const existingAlert = form.querySelector(".alert");
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement("div");
    alert.className = "alert alert-success alert-dismissible fade show mt-3";
    alert.innerHTML = `
        <strong>¡Éxito!</strong> Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.parentElement.insertBefore(alert, submitBtn);
    } else {
        form.appendChild(alert);
    }
    
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const activeTab = document.querySelector(".tab-pane.active");
    if (activeTab) {
        const form = activeTab.querySelector("form");
        if (form) {
            const existingAlert = form.querySelector(".alert");
            if (existingAlert) {
                existingAlert.remove();
            }
            
            const alert = document.createElement("div");
            alert.className = "alert alert-danger alert-dismissible fade show mt-3";
            alert.innerHTML = `
                <strong>Error:</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.parentElement.insertBefore(alert, submitBtn);
            } else {
                form.appendChild(alert);
            }
            
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 5000);
        }
    }
}

function saveFormSubmission(form) {
    const submissions = getStoredSubmissions();
    const sanitizedSubmissions = submissions.length >= MAX_STORED_FORMS ? [] : submissions;
    sanitizedSubmissions.push(buildSubmissionPayload(form));
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(sanitizedSubmissions));
}

function getStoredSubmissions() {
    try {
        const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn("No se pudo leer el historial de formularios:", error);
        return [];
    }
}

function buildSubmissionPayload(form) {
    const fieldsData = {};
    const elements = form.querySelectorAll("input, textarea, select");
    
    elements.forEach(field => {
        const key = field.name || field.id || field.dataset.fieldKey;
        if (!key) return;
        
        if (field.type === "checkbox") {
            fieldsData[key] = field.checked;
        } else if (field.type === "file") {
            fieldsData[key] = Array.from(field.files || []).map(file => file.name);
        } else if (field.tagName === "SELECT" && field.multiple) {
            fieldsData[key] = Array.from(field.selectedOptions).map(option => option.value);
        } else {
            fieldsData[key] = field.value.trim();
        }
    });
    
    return {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        formType: form.dataset.formType || "desconocido",
        submittedAt: new Date().toISOString(),
        data: fieldsData
    };
}

