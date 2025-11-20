const PROPIEDADES_INITIAL = [
    {
        id: 1,
        titulo: "Casa Moderna en Nordelta", 
        zona: "Buenos Aires (Zona Norte)", 
        localidad: "Nordelta",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 4,
        baños: 2,
        m2: 280,
        precioUsd: 555000,
        imagen: "./img/casa_playa.jpg",
        destacado: true
    },
    {
        id: 2,
        titulo: "Depto frente al mar en Mar del Plata", 
        zona: "Buenos Aires (Costa Atlantica)", 
        localidad: "Mar del Plata",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 2,
        baños: 1,
        m2: 60,
        precioUsd: 99,
        imagen: "./img/chalet_mar_del_plata.jpg",
        destacado: true
    },
    {
        id: 3,
        titulo: "Casa Moderna con Piscina",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Tigre",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 5,
        baños: 3,
        m2: 320,
        precioUsd: 680000,
        imagen: "./img/casa_moderna.jpg",
        destacado: false
    },
    {
        id: 4,
        titulo: "Departamento Moderno en Palermo",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Palermo",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 3,
        baños: 2,
        m2: 85,
        precioUsd: 450,
        imagen: "./img/departamento_palermo.jpg",
        destacado: false
    },
    {
        id: 5,
        titulo: "Departamento Moderno Centro",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "CABA",
        tipo: "Departamento",
        operacion: "Comprar",
        ambientes: 2,
        baños: 1,
        m2: 55,
        precioUsd: 125000,
        imagen: "./img/departamento_moderno.jpg",
        destacado: false
    },
    {
        id: 6,
        titulo: "Cabaña en la Nieve",
        zona: "Patagonia",
        localidad: "Bariloche",
        tipo: "Cabaña",
        operacion: "Alquilar",
        ambientes: 3,
        baños: 2,
        m2: 120,
        precioUsd: 180,
        imagen: "./img/cabaña_nieve.jpg",
        destacado: true
    },
    {
        id: 7,
        titulo: "Departamentos en Bariloche",
        zona: "Patagonia",
        localidad: "Bariloche",
        tipo: "Departamento",
        operacion: "Comprar",
        ambientes: 2,
        baños: 1,
        m2: 65,
        precioUsd: 145000,
        imagen: "./img/departamentos_bariloche.jpg",
        destacado: false
    },
    {
        id: 8,
        titulo: "Edificio de Departamentos",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Vicente López",
        tipo: "Departamento",
        operacion: "Comprar",
        ambientes: 3,
        baños: 2,
        m2: 95,
        precioUsd: 195000,
        imagen: "./img/edificio_departamentos.jpg",
        destacado: false
    },
    {
        id: 9,
        titulo: "Departamento Interno Céntrico",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Belgrano",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 1,
        baños: 1,
        m2: 45,
        precioUsd: 320,
        imagen: "./img/departamento_interno.jpg",
        destacado: false
    },
    {
        id: 10,
        titulo: "Casa en la Playa",
        zona: "Buenos Aires (Costa Atlantica)",
        localidad: "Pinamar",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 4,
        baños: 3,
        m2: 250,
        precioUsd: 420000,
        imagen: "./img/casa_playa.jpg",
        destacado: true
    },
    {
        id: 11,
        titulo: "Chalet en Mar del Plata",
        zona: "Buenos Aires (Costa Atlantica)",
        localidad: "Mar del Plata",
        tipo: "Casa",
        operacion: "Alquilar",
        ambientes: 5,
        baños: 3,
        m2: 180,
        precioUsd: 250,
        imagen: "./img/chalet_mar_del_plata.jpg",
        destacado: false
    },
    {
        id: 12,
        titulo: "Duplex en Zona Norte",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "San Isidro",
        tipo: "Duplex",
        operacion: "Comprar",
        ambientes: 4,
        baños: 3,
        m2: 200,
        precioUsd: 385000,
        imagen: "./img/casa_moderna.jpg",
        destacado: false
    },
    {
        id: 13,
        titulo: "PH en Palermo",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Palermo",
        tipo: "PH",
        operacion: "Comprar",
        ambientes: 3,
        baños: 2,
        m2: 110,
        precioUsd: 275000,
        imagen: "./img/departamento_palermo.jpg",
        destacado: false
    },
    {
        id: 14,
        titulo: "Cabaña en la Montaña",
        zona: "Patagonia",
        localidad: "San Martín de los Andes",
        tipo: "Cabaña",
        operacion: "Alquilar",
        ambientes: 2,
        baños: 1,
        m2: 80,
        precioUsd: 120,
        imagen: "./img/cabaña_nieve.jpg",
        destacado: false
    },
    {
        id: 15,
        titulo: "Casa en Cuyo",
        zona: "Cuyo",
        localidad: "Mendoza",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 4,
        baños: 2,
        m2: 220,
        precioUsd: 195000,
        imagen: "./img/casa_moderna.jpg",
        destacado: false
    },
    {
        id: 16,
        titulo: "Departamento en Cuyo",
        zona: "Cuyo",
        localidad: "Mendoza",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 2,
        baños: 1,
        m2: 70,
        precioUsd: 280,
        imagen: "./img/departamento_moderno.jpg",
        destacado: false
    },
    {
        id: 17,
        titulo: "Casa en Norte Argentino",
        zona: "Norte Argentino",
        localidad: "Salta",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 3,
        baños: 2,
        m2: 150,
        precioUsd: 125000,
        imagen: "./img/casa_playa.jpg",
        destacado: false
    },
    {
        id: 18,
        titulo: "Departamento en Norte Argentino",
        zona: "Norte Argentino",
        localidad: "Tucumán",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 2,
        baños: 1,
        m2: 60,
        precioUsd: 220,
        imagen: "./img/departamento_interno.jpg",
        destacado: false
    },
    {
        id: 19,
        titulo: "Casa Premium en Nordelta",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Nordelta",
        tipo: "Casa",
        operacion: "Comprar",
        ambientes: 6,
        baños: 4,
        m2: 450,
        precioUsd: 850000,
        imagen: "./img/casa_moderna.jpg",
        destacado: true
    },
    {
        id: 20,
        titulo: "Duplex en Costa Atlántica",
        zona: "Buenos Aires (Costa Atlantica)",
        localidad: "Necochea",
        tipo: "Duplex",
        operacion: "Alquilar",
        ambientes: 3,
        baños: 2,
        m2: 140,
        precioUsd: 200,
        imagen: "./img/chalet_mar_del_plata.jpg",
        destacado: false
    },
    {
        id: 21,
        titulo: "PH en Bariloche",
        zona: "Patagonia",
        localidad: "Bariloche",
        tipo: "PH",
        operacion: "Comprar",
        ambientes: 3,
        baños: 2,
        m2: 100,
        precioUsd: 165000,
        imagen: "./img/departamentos_bariloche.jpg",
        destacado: false
    },
    {
        id: 22,
        titulo: "Cabaña Premium Patagonia",
        zona: "Patagonia",
        localidad: "El Calafate",
        tipo: "Cabaña",
        operacion: "Alquilar",
        ambientes: 4,
        baños: 3,
        m2: 160,
        precioUsd: 350,
        imagen: "./img/cabaña_nieve.jpg",
        destacado: true
    },
    {
        id: 23,
        titulo: "Edificio Residencial Premium",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Olivos",
        tipo: "Departamento",
        operacion: "Comprar",
        ambientes: 4,
        baños: 3,
        m2: 130,
        precioUsd: 325000,
        imagen: "./img/edificio_departamentos.jpg",
        destacado: false
    },
    {
        id: 24,
        titulo: "Departamento Estudio",
        zona: "Buenos Aires (Zona Norte)",
        localidad: "Recoleta",
        tipo: "Departamento",
        operacion: "Alquilar",
        ambientes: 1,
        baños: 1,
        m2: 35,
        precioUsd: 380,
        imagen: "./img/departamento_interno.jpg",
        destacado: false
    }
];

function loadPropertiesFromStorage() {
    try {
        const stored = localStorage.getItem("propiedades");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn("Error loading properties from storage:", e);
    }
    return PROPIEDADES_INITIAL;
}


function initializeProperties() {
    let props = loadPropertiesFromStorage();
    
    if (props.length < PROPIEDADES_INITIAL.length) {
        const storedIds = new Set(props.map(p => p.id));
        const missing = PROPIEDADES_INITIAL.filter(p => !storedIds.has(p.id));
        props = [...props, ...missing];
    }
    
    const hasStored = localStorage.getItem("propiedades");
    if (!hasStored || props.length !== PROPIEDADES_INITIAL.length) {
        setStorageItem("propiedades", props);
    }
    
    return props;
}

const PROPIEDADES = initializeProperties();
