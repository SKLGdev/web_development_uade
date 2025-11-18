/* 
Componentes reutilizables para generar HTML dinámicamente
Reduce código repetitivo en HTML
*/

// Configuración de navegación
const NAV_ITEMS = [
    { href: "index.html", text: "Inicio", id: "inicio" },
    { href: "pages/propiedades.html", text: "Propiedades", id: "propiedades" },
    { href: "pages/publicar.html", text: "Publicar", id: "publicar" },
    { href: "pages/nosotros.html", text: "Nosotros", id: "nosotros" },
    { href: "pages/contacto.html", text: "Contacto", id: "contacto" }
];

// Configuración de zonas para dropdown
const ZONAS_DROPDOWN = [
    { href: "pages/propiedades.html#zona-norte", text: "Buenos Aires (Zona Norte)" },
    { href: "pages/propiedades.html#zona-sur", text: "Buenos Aires (Zona Sur)" },
    { href: "pages/propiedades.html#costa", text: "Costa Atlántica" },
    { href: "pages/propiedades.html#cordoba", text: "Córdoba" },
    { href: "pages/propiedades.html#patagonia", text: "Patagonia" }
];

// Configuración de redes sociales
const SOCIAL_LINKS = [
    { icon: "fab fa-facebook-f", text: "Facebook", class: "" },
    { icon: "fab fa-twitter", text: "Twitter", class: "" },
    { icon: "fab fa-instagram", text: "Instagram", class: "" },
    { icon: "fab fa-youtube", text: "YouTube", class: "" },
    { icon: "fab fa-whatsapp", text: "WhatsApp", class: "whatsapp" }
];

// Testimonios
const TESTIMONIOS = [
    {
        stars: 5,
        text: "Encontré mi apartamento ideal en menos de una semana. El proceso fue muy fácil y el equipo me ayudó en cada paso.",
        name: "Maria Gonzalez",
        role: "Compradora",
        initials: "M.G."
    },
    {
        stars: 5,
        text: "Vendí mi casa en tiempo récord. El equipo es súper profesional y el soporte al cliente excepcional.",
        name: "Carlos Ruiz",
        role: "Vendedor",
        initials: "C.R."
    },
    {
        stars: 4.5,
        text: "Como agente inmobiliaria, PropiedadesZone me ha dado las herramientas para gestionar mis propiedades de manera eficiente.",
        name: "Ana Martín",
        role: "Agente Inmobiliaria",
        initials: "A.M."
    }
];

// Características de "Por qué elegirnos"
const FEATURES = [
    {
        icon: "fa-solid fa-shield-halved",
        title: "Verificado",
        text: "Todas las propiedades son verificadas por nuestros expertos para tu seguridad."
    },
    {
        icon: "fa-solid fa-clock",
        title: "Rápido",
        text: "Respuesta en menos de 24 horas garantizada para todas tus consultas."
    },
    {
        icon: "fa-solid fa-user-tie",
        title: "Expertos",
        text: "Equipo de profesionales certificados y con amplia experiencia en el sector."
    },
    {
        icon: "fa-solid fa-hand-holding-dollar",
        title: "Seguro",
        text: "Transacciones 100% seguras y protegidas con los más altos estándares."
    }
];

// Función para obtener el path base según la ubicación de la página
function getBasePath() {
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    return isInPagesFolder ? '../' : './';
}

// Generar Navbar
function renderNavbar(activePage = '') {
    const basePath = getBasePath();
    const navItems = NAV_ITEMS.map(item => {
        const isActive = activePage === item.id ? 'active' : '';
        const ariaCurrent = isActive ? 'aria-current="page"' : '';
        
        // Ajustar rutas según ubicación
        let href = item.href;
        if (basePath === '../') {
            // Estamos en pages/, ajustar rutas
            if (href === 'index.html') {
                href = '../index.html';
            } else if (href.startsWith('pages/')) {
                // Remover "pages/" porque ya estamos en pages/
                href = href.replace('pages/', '');
            }
        } else {
            // Estamos en raíz, mantener como está
            href = item.href;
        }
        
        return `
            <li class="nav-item">
                <a class="nav-link ${isActive}" ${ariaCurrent} href="${href}">${item.text}</a>
            </li>
        `;
    }).join('');

    const zonasDropdown = ZONAS_DROPDOWN.map((zona, index) => {
        // Ajustar rutas del dropdown según ubicación
        let href = zona.href;
        if (basePath === '../') {
            // Estamos en pages/, remover "pages/" del href
            href = href.replace('pages/', '');
        }
        // Agregar separador después de "Costa Atlántica" (índice 2)
        const separator = index === 2 ? '<li><hr class="dropdown-divider"></li>' : '';
        return `${separator}<li><a class="dropdown-item" href="${href}">${zona.text}</a></li>`;
    }).join('');

    return `
        <nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div class="container">
                <a class="navbar-brand fw-bold" href="${basePath}index.html">
                    <i class="fa-solid fa-house-chimney text-primary"></i>
                    Propiedades<span class="text-primary">Zone</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav ms-auto">
                        ${navItems}
                        <!-- Filtro por Zona/Provincia -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Filtrar por Zona
                            </a>
                            <ul class="dropdown-menu">
                                ${zonasDropdown}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

// Generar Footer
function renderFooter() {
    const basePath = getBasePath();
    const socialIcons = SOCIAL_LINKS.map(social => `
        <a href="#" class="social-icon-wrapper ${social.class}">
            <div class="social-icon">
                <i class="${social.icon}"></i>
            </div>
            <span class="social-text">${social.text}</span>
        </a>
    `).join('');

    return `
        <footer class="bg-dark text-white pt-5 pb-4">
            <div class="container text-center">
                <div class="row">
                    <!-- Columna de Redes Sociales -->
                    <div class="col-12 mb-4">
                        <h5>Síguenos en Redes</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3 social-icons-container">
                            ${socialIcons}
                        </div>
                    </div>
                    <!-- Copyright -->
                    <div class="col-12 mt-3">
                        <p class="text-white-50 mb-0">&copy; 2025 PropiedadesZone. Todos los derechos reservados.</p>
                        <p class="text-white-50 small">Diseñado para ser tu hogar ideal.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Generar Testimonios
function renderTestimonios() {
    return TESTIMONIOS.map(testimonio => {
        const stars = Array.from({ length: 5 }, (_, i) => {
            if (i < Math.floor(testimonio.stars)) {
                return '<i class="fa-solid fa-star"></i>';
            } else if (i < testimonio.stars) {
                return '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                return '<i class="fa-regular fa-star"></i>';
            }
        }).join('');

        const imageUrl = `https://placehold.co/100x100/EAEAEA/333333?text=${testimonio.initials}`;

        return `
            <div class="col-lg-4 col-md-6">
                <div class="card testimonial-card">
                    <div class="card-body">
                        <div class="testimonial-stars">
                            ${stars}
                        </div>
                        <p class="fst-italic text-muted">"${testimonio.text}"</p>
                        <div class="testimonial-author">
                            <img src="${imageUrl}" alt="Cliente ${testimonio.name}">
                            <div>
                                <h6>${testimonio.name}</h6>
                                <span>${testimonio.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Generar Features (Por qué elegirnos)
function renderFeatures() {
    return FEATURES.map(feature => `
        <div class="col-lg-3 col-md-6">
            <div class="card value-card h-100">
                <div class="value-icon-wrapper">
                    <i class="${feature.icon}"></i>
                </div>
                <h5 class="fw-bold">${feature.title}</h5>
                <p class="text-muted">${feature.text}</p>
            </div>
        </div>
    `).join('');
}

// Generar Card de Propiedad (versión destacada para index)
function renderPropertyCardFeatured(property) {
    const basePath = getBasePath();
    const imagePath = property.imagen.startsWith('./') 
        ? property.imagen.replace('./', basePath) 
        : basePath + property.imagen;
    
    return `
        <article class="col-lg-4 col-md-6">
            <div class="card property-card-featured h-100">
                <div class="card-img-top-wrapper">
                    <span class="property-tag ${property.destacado ? 'premium' : ''}">${property.destacado ? 'Premium' : 'Disponible'}</span>
                    <img src="${imagePath}" class="card-img-top" alt="${property.titulo}">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${property.titulo}</h5>
                    <span class="property-location">${property.localidad} - ${property.zona}</span>
                    <span class="property-price mt-2">${formatPriceUsd(property.precioUsd)}</span>
                    <div class="property-specs">
                        <span><i class="fa-solid fa-bed"></i> ${property.ambientes} habs</span>
                        <span><i class="fa-solid fa-bath"></i> ${property.baños} baños</span>
                        <span><i class="fa-solid fa-ruler-combined"></i> ${property.m2} m²</span>
                    </div>
                    <a href="${basePath}pages/propiedades.html#propiedad-${property.id}" class="btn btn-outline-primary mt-auto">Ver Detalles</a>
                </div>
            </div>
        </article>
    `;
}

// Inicializar componentes en la página
function initComponents(activePage = '') {
    // Renderizar Navbar
    const navbarPlaceholder = document.querySelector('[data-component="navbar"]');
    if (navbarPlaceholder) {
        navbarPlaceholder.outerHTML = renderNavbar(activePage);
    }

    // Renderizar Footer
    const footerPlaceholder = document.querySelector('[data-component="footer"]');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = renderFooter();
    }

    // Renderizar Testimonios
    const testimoniosPlaceholder = document.querySelector('[data-component="testimonios"]');
    if (testimoniosPlaceholder) {
        testimoniosPlaceholder.innerHTML = renderTestimonios();
    }

    // Renderizar Features
    const featuresPlaceholder = document.querySelector('[data-component="features"]');
    if (featuresPlaceholder) {
        featuresPlaceholder.innerHTML = renderFeatures();
    }
}

