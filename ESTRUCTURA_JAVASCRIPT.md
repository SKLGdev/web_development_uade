# Recomendaciones de Estructura para JavaScript

## 📁 Estructura de Carpetas Recomendada

```
web_development/
├── js/
│   ├── main.js              # Script global (se carga en todas las páginas)
│   ├── utils.js             # Funciones utilitarias reutilizables
│   ├── constants.js         # Constantes y configuración
│   │
│   └── pages/               # Scripts específicos por página
│       ├── index.js         # Lógica específica de index.html
│       ├── propiedades.js   # Lógica específica de propiedades.html
│       ├── publicar.js      # Lógica específica de publicar.html
│       ├── contacto.js      # Lógica específica de contacto.html
│       └── nosotros.js      # Lógica específica de nosotros.html (si es necesario)
│
│   └── modules/             # Módulos reutilizables (opcional, para proyectos grandes)
│       ├── validation.js    # Validación de formularios
│       ├── api.js           # Llamadas a APIs
│       ├── filters.js       # Filtros de búsqueda
│       └── ui.js            # Componentes UI reutilizables
```

---

## 📝 Estructura de Archivos

### 1. **`js/main.js`** - Script Global
**Propósito:** Funcionalidades que se usan en todas o varias páginas.

**Contenido sugerido:**
```javascript
// Inicialización global
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initTooltips();
    initScrollToTop();
});

// Navbar
function initNavbar() {
    // Lógica de navbar activo según página actual
}

// Tooltips de Bootstrap
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Scroll to top
function initScrollToTop() {
    // Botón para volver arriba
}
```

---

### 2. **`js/utils.js`** - Funciones Utilitarias
**Propósito:** Funciones auxiliares reutilizables.

**Contenido sugerido:**
```javascript
// Formatear precios
function formatPrice(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Debounce para optimizar búsquedas
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mostrar notificaciones
function showNotification(message, type = 'success') {
    // Lógica para mostrar notificaciones toast
}
```

---

### 3. **`js/constants.js`** - Constantes y Configuración
**Propósito:** Valores constantes y configuración global.

**Contenido sugerido:**
```javascript
const CONFIG = {
    API_BASE_URL: 'https://api.propiedadeszone.com',
    ITEMS_PER_PAGE: 9,
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 300
};

const PROPERTY_TYPES = {
    APARTAMENTO: 'apartamento',
    CASA: 'casa',
    LOCAL: 'local',
    TERRENO: 'terreno'
};

const OPERATIONS = {
    COMPRAR: 'comprar',
    ALQUILAR: 'alquilar'
};
```

---

### 4. **`js/pages/index.js`** - Lógica de Página Inicio
**Propósito:** Funcionalidades específicas de la página principal.

**Contenido sugerido:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initPropertyFilters();
});

function initCarousel() {
    // Configuración del carrusel de propiedades
    const carousel = document.querySelector('#propiedadesCarousel');
    if (carousel) {
        // Lógica específica del carrusel
    }
}

function initPropertyFilters() {
    // Filtros para propiedades destacadas
}
```

---

### 5. **`js/pages/propiedades.js`** - Lógica de Búsqueda
**Propósito:** Funcionalidades de búsqueda y filtrado de propiedades.

**Contenido sugerido:**
```javascript
import { debounce } from '../utils.js';
import { CONFIG } from '../constants.js';

document.addEventListener('DOMContentLoaded', function() {
    initSearchForm();
    initFilters();
    initPagination();
});

function initSearchForm() {
    const form = document.querySelector('.property-search-header form');
    if (form) {
        form.addEventListener('submit', handleSearch);
    }
}

function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Lógica de búsqueda
}

function initFilters() {
    const searchInput = document.querySelector('#searchUbicacion');
    if (searchInput) {
        const debouncedSearch = debounce(performSearch, CONFIG.DEBOUNCE_DELAY);
        searchInput.addEventListener('input', debouncedSearch);
    }
}
```

---

### 6. **`js/pages/contacto.js`** - Lógica de Formularios
**Propósito:** Validación y envío de formularios de contacto.

**Contenido sugerido:**
```javascript
import { isValidEmail, showNotification } from '../utils.js';

document.addEventListener('DOMContentLoaded', function() {
    initContactForms();
});

function initContactForms() {
    const forms = document.querySelectorAll('form[id*="tab"]');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        // Validación en tiempo real
        form.addEventListener('input', handleRealTimeValidation);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm(e.target)) {
        submitForm(e.target);
    } else {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
    }
}

function validateForm(form) {
    // Validación de campos
    const email = form.querySelector('input[type="email"]');
    if (email && !isValidEmail(email.value)) {
        return false;
    }
    return true;
}
```

---

### 7. **`js/pages/publicar.js`** - Lógica de Publicación
**Propósito:** Gestión del formulario de publicación.

**Contenido sugerido:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initPublicationForm();
    initFileUpload();
});

function initFileUpload() {
    const fileInput = document.querySelector('#pub-documentos');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelection);
    }
}

function handleFileSelection(e) {
    const files = e.target.files;
    // Validar tamaño, tipo, etc.
}
```

---

## 🔗 Cómo Cargar los Scripts en HTML

### **Estructura en `index.html`:**
```html
<body>
    <!-- ... contenido HTML ... -->
    
    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    
    <!-- Scripts propios (orden importante) -->
    <script src="js/constants.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/main.js"></script>
    <script src="js/pages/index.js"></script>
</body>
```

### **Para páginas en subcarpeta (`pages/contacto.html`):**
```html
<body>
    <!-- ... contenido HTML ... -->
    
    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    
    <!-- Scripts propios -->
    <script src="../js/constants.js"></script>
    <script src="../js/utils.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/pages/contacto.js"></script>
</body>
```

---

## 📋 Convenciones de Nombres

### **Variables y Funciones:**
- **camelCase:** `functionName`, `variableName`
- **Constantes:** `UPPER_SNAKE_CASE`: `API_BASE_URL`, `MAX_ITEMS`
- **Clases:** `PascalCase`: `PropertyFilter`, `FormValidator`

### **Archivos:**
- **camelCase:** `utils.js`, `constants.js`
- **Páginas específicas:** Nombre de la página: `contacto.js`, `propiedades.js`

---

## ✅ Buenas Prácticas

### 1. **Separación de Responsabilidades**
- ✅ Cada archivo tiene una responsabilidad clara
- ✅ Funciones reutilizables en `utils.js`
- ✅ Configuración centralizada en `constants.js`

### 2. **Modularidad**
- ✅ Funciones pequeñas y específicas
- ✅ Evitar funciones que hagan múltiples cosas
- ✅ Usar imports cuando sea posible (ES6 modules)

### 3. **Optimización**
- ✅ Usar `debounce` para búsquedas
- ✅ Lazy loading de imágenes pesadas
- ✅ Event delegation para elementos dinámicos

### 4. **Seguridad**
- ✅ Validar siempre en el cliente Y servidor
- ✅ Sanitizar inputs del usuario
- ✅ No exponer credenciales en el frontend

### 5. **Compatibilidad**
- ✅ Verificar que elementos existan antes de usarlos
- ✅ Usar `DOMContentLoaded` para inicialización
- ✅ Fallbacks para navegadores antiguos si es necesario

---

## 🎯 Ejemplo Completo: Estructura de `js/pages/propiedades.js`

```javascript
import { debounce, formatPrice } from '../utils.js';
import { CONFIG } from '../constants.js';

// Variables globales del módulo
let currentPage = 1;
let currentFilters = {};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initSearchForm();
    initFilters();
    initPagination();
});

// Inicializar formulario de búsqueda
function initSearchForm() {
    const form = document.querySelector('.property-search-header form');
    if (!form) return;
    
    form.addEventListener('submit', handleSearchSubmit);
}

// Manejar envío del formulario
function handleSearchSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    currentFilters = {
        ubicacion: formData.get('searchUbicacion'),
        tipo: formData.get('searchTipoProp'),
        operacion: formData.get('searchOperacion')
    };
    performSearch();
}

// Inicializar filtros
function initFilters() {
    const searchInput = document.querySelector('#searchUbicacion');
    if (searchInput) {
        const debouncedSearch = debounce(performSearch, CONFIG.DEBOUNCE_DELAY);
        searchInput.addEventListener('input', (e) => {
            currentFilters.ubicacion = e.target.value;
            debouncedSearch();
        });
    }
}

// Realizar búsqueda
function performSearch() {
    // Lógica de búsqueda
    console.log('Buscando con filtros:', currentFilters);
    // Aquí iría la llamada a API o filtrado local
}

// Inicializar paginación
function initPagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    pagination.addEventListener('click', handlePaginationClick);
}

// Manejar clicks en paginación
function handlePaginationClick(e) {
    e.preventDefault();
    const link = e.target.closest('.page-link');
    if (!link) return;
    
    // Lógica de paginación
}

// Exportar funciones si se usan en otros módulos
export { performSearch, currentFilters };
```

---

## 🔄 Alternativa: ES6 Modules (Recomendado para proyectos modernos)

Si quieres usar **ES6 Modules**, cambia la estructura de carga:

### **En HTML:**
```html
<!-- Bootstrap JS -->
<script src="..." type="module" defer></script>

<!-- Tu script principal como módulo -->
<script type="module" src="js/pages/propiedades.js"></script>
```

### **En JavaScript:**
```javascript
// js/pages/propiedades.js
import { debounce } from '../utils.js';
import { CONFIG } from '../constants.js';

// ... resto del código ...
```

**Ventajas de ES6 Modules:**
- ✅ Mejor organización
- ✅ Dependencias explícitas
- ✅ Tree-shaking (elimina código no usado)
- ✅ Mejor para proyectos grandes

---

## 📦 Ejemplo de Módulo: `js/modules/validation.js`

```javascript
export class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
    }
    
    validate() {
        this.errors = {};
        this.validateRequired();
        this.validateEmail();
        return Object.keys(this.errors).length === 0;
    }
    
    validateRequired() {
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.errors[field.name] = 'Este campo es requerido';
            }
        });
    }
    
    validateEmail() {
        const emailField = this.form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                this.errors[emailField.name] = 'Email inválido';
            }
        }
    }
    
    showErrors() {
        // Mostrar errores en el formulario
    }
}
```

---

## 🚀 Implementación Gradual

**Fase 1 - Básico:**
1. Crear carpeta `js/`
2. Crear `js/main.js` con funcionalidades básicas
3. Crear `js/utils.js` con funciones auxiliares

**Fase 2 - Específico por página:**
4. Crear `js/pages/` con scripts específicos
5. Crear `js/constants.js` para configuración

**Fase 3 - Modular (opcional):**
6. Crear `js/modules/` para módulos reutilizables
7. Migrar a ES6 Modules si es necesario

---

## ✅ Checklist de Implementación

- [ ] Crear estructura de carpetas `js/` y `js/pages/`
- [ ] Crear `js/main.js` con inicializaciones globales
- [ ] Crear `js/utils.js` con funciones reutilizables
- [ ] Crear `js/constants.js` con configuración
- [ ] Crear scripts específicos por página según necesidad
- [ ] Actualizar HTML para cargar los scripts en el orden correcto
- [ ] Probar funcionalidades en cada página
- [ ] Optimizar y refactorizar según necesidad

---

## 📚 Recursos Adicionales

- **MDN JavaScript Guide:** https://developer.mozilla.org/es/docs/Web/JavaScript/Guide
- **ES6 Modules:** https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules
- **JavaScript Best Practices:** https://www.w3.org/wiki/JavaScript_best_practices

---

**Nota:** Esta estructura es escalable y mantenible. Puedes empezar simple y agregar módulos según crezca tu proyecto.

