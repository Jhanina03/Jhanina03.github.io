/* ============================================================
   Portfolio content — edit this file to update the site.
   Every text has an English (en) and Spanish (es) version.
   ============================================================ */

window.PROFILE = {
  name: "Jhanina Conterón",
  fullName: "Britani Jhanina Conterón Villamarín",
  email: "jhaninaconteron03@gmail.com",
  github: "https://github.com/Jhanina03",
  // TODO: replace with your public profile URL (linkedin.com/in/your-name)
  linkedin: "https://www.linkedin.com/search/results/people/?keywords=Jhanina%20Conter%C3%B3n%20Villamar%C3%ADn",
  steam: "https://steamcommunity.com/profiles/76561199698705664/",
  instagram: "https://www.instagram.com/jhanis_03/",
  facebook: "https://www.facebook.com/britani.villamarin",
};

/* ---------- Skills: each category is a spool of thread ---------- */
window.SKILLS = [
  {
    id: "front", color: "#B79CFF",
    title: { en: "Frontend", es: "Frontend" },
    note: { en: "my favourite fabric", es: "mi tela favorita" },
    items: ["Angular", "TypeScript", "Next.js", "React", "JavaScript", "HTML5 & CSS3", "Bootstrap", "Responsive UI"],
  },
  {
    id: "back", color: "#7FB6FF",
    title: { en: "Backend", es: "Backend" },
    note: { en: "the hidden seams", es: "las costuras ocultas" },
    items: [".NET / .NET Core", "ASP.NET", "C#", "NestJS", "Node.js & Express", "REST APIs", "Microservices", "Java", "Python"],
  },
  {
    id: "data", color: "#FF9ACB",
    title: { en: "Databases", es: "Bases de datos" },
    note: { en: "measured to the millimetre", es: "medidas al milímetro" },
    items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "EF Migrations", "SSAS / Data Warehousing", "Query optimisation"],
  },
  {
    id: "qa", color: "#8EE3E0",
    title: { en: "QA & Testing", es: "QA y Pruebas" },
    note: { en: "no loose threads", es: "sin hilos sueltos" },
    items: ["Unit & integration tests", "Functional testing", "Mutation testing (Stryker)", "JUnit", "Mocha & Chai", "ESLint + SonarJS", "Code review", "CI with Jenkins"],
  },
  {
    id: "tools", color: "#C9B8FF",
    title: { en: "Tools & more", es: "Herramientas y más" },
    note: { en: "my sewing kit", es: "mi costurero" },
    items: ["Git & GitHub", "Docker", "Jira", "Azure DevOps", "Odoo", "Wireframes & mockups", "Scrum", "AI / ML (Python)"],
  },
];

/* ---------- Projects ----------
   tags: front | back | data | ai | qa | fashion | game
   repo / demo: leave "" when there is no public link        */
window.PROJECTS = [
  {
    id: "fashionia", featured: true, year: 2026, swatch: "#FFB3D9",
    title: "FashionIA",
    kicker: { en: "Fashion × AI", es: "Moda × IA" },
    desc: {
      en: "A comfort recommender for garments: fuzzy Mamdani inference scores comfort per body zone and a genetic algorithm searches the optimal pattern measurements (chest, waist, hip).",
      es: "Recomendador de confort para prendas: inferencia difusa Mamdani evalúa el confort por zona del cuerpo y un algoritmo genético busca las medidas óptimas del patrón (pecho, cintura, cadera).",
    },
    stack: ["Python", "Fuzzy logic", "Genetic algorithms"],
    tags: ["ai", "fashion"], repo: "", demo: "",
  },
  {
    id: "chat", featured: true, year: 2026, swatch: "#A8D8FF",
    title: "Chat Básico",
    kicker: { en: "Real-time · tested to the seams", es: "Tiempo real · probado a fondo" },
    desc: {
      en: "Real-time chat with video calls and no login. Covered by unit, integration, concurrency and UI tests, plus coverage reports, SonarJS linting and mutation testing.",
      es: "Chat en tiempo real con videollamadas y sin login. Cubierto con pruebas unitarias, de integración, concurrencia e interfaz, reportes de cobertura, lint con SonarJS y pruebas de mutación.",
    },
    stack: ["Node.js", "Socket.IO", "WebRTC", "SQLite", "Stryker"],
    tags: ["back", "qa"], repo: "https://github.com/Jhanina03/chat-basico", demo: "https://chat-basico.onrender.com",
  },
  {
    id: "plates", featured: true, year: 2026, swatch: "#C9B8FF",
    title: { en: "License plate recognition", es: "Reconocimiento de placas" },
    kicker: { en: "Computer vision", es: "Visión por computadora" },
    desc: {
      en: "Detects vehicle license plates in images and reads their characters, combining image processing with a trained recognition model.",
      es: "Detecta placas vehiculares en imágenes y lee sus caracteres, combinando procesamiento de imágenes con un modelo de reconocimiento entrenado.",
    },
    stack: ["Python", "OpenCV", "Neural networks"],
    tags: ["ai"], repo: "", demo: "",
  },
  {
    id: "recon", featured: true, year: 2025, swatch: "#8EE3E0",
    title: { en: "Account reconciliation system", es: "Sistema de cuadre de cuentas" },
    kicker: { en: "Internship · financial institution", es: "Prácticas · institución financiera" },
    desc: {
      en: "Built during my pre-professional internship: a program that cross-checks account balances and flags mismatches, turning a slow manual task into a fast, reliable report.",
      es: "Desarrollado en mis prácticas preprofesionales: un programa que cruza saldos de cuentas y marca diferencias, convirtiendo una tarea manual lenta en un reporte rápido y confiable.",
    },
    stack: ["SQL", ".NET", "Reporting"],
    tags: ["data", "back"], repo: "", demo: "",
  },
  {
    id: "odoo", featured: true, year: 2025, swatch: "#FFD3E8",
    title: { en: "Hotel booking on Odoo", es: "Reservas de hotel en Odoo" },
    kicker: { en: "ERP · web", es: "ERP · web" },
    desc: {
      en: "Booking websites and custom modules on Odoo: rooms, availability, reservations and customer management, all inside the ERP.",
      es: "Sitios de reservas y módulos personalizados en Odoo: habitaciones, disponibilidad, reservas y gestión de clientes, todo dentro del ERP.",
    },
    stack: ["Odoo", "Python", "PostgreSQL"],
    tags: ["back", "data", "front"], repo: "", demo: "",
  },
  {
    id: "gpis", featured: true, year: 2025, swatch: "#B79CFF",
    title: "APE7 · GPIS",
    kicker: { en: "Microservices + CI", es: "Microservicios + CI" },
    desc: {
      en: "Team project with a decoupled frontend and backend, containerised with Docker Compose and delivered through a Jenkins pipeline.",
      es: "Proyecto en equipo con frontend y backend desacoplados, contenedorizado con Docker Compose y entregado con un pipeline de Jenkins.",
    },
    stack: ["TypeScript", "Docker", "Jenkins", "Handlebars"],
    tags: ["front", "back", "qa"], repo: "https://github.com/Jhanina03/APE7-proyectogpis", demo: "",
  },
  {
    id: "mnist", year: 2026, swatch: "#A8D8FF",
    title: { en: "MNIST neural network", es: "Red neuronal MNIST" },
    kicker: { en: "Deep learning", es: "Aprendizaje profundo" },
    desc: {
      en: "Handwritten-digit classifier with a neural network and a KNN baseline, with learning curves, a confusion matrix and visual predictions.",
      es: "Clasificador de dígitos manuscritos con una red neuronal y un KNN de referencia, con curvas de aprendizaje, matriz de confusión y predicciones visuales.",
    },
    stack: ["Python", "Neural networks", "KNN"],
    tags: ["ai"], repo: "https://github.com/Jhanina03/mnist", demo: "",
  },
  {
    id: "booking", year: 2025, swatch: "#FFB3D9",
    title: "BookingView",
    kicker: { en: "Airbnb / Booking style", es: "Estilo Airbnb / Booking" },
    desc: {
      en: "Accommodation booking platform with users, listings, reservations and availability, backed by a REST API.",
      es: "Plataforma de reservas de alojamiento con usuarios, anuncios, reservas y disponibilidad, sobre una API REST.",
    },
    stack: ["Node.js", "MongoDB", "REST"],
    tags: ["front", "back", "data"], repo: "https://github.com/Jhanina03/BookingView", demo: "",
  },
  {
    id: "hospital", year: 2025, swatch: "#8EE3E0",
    title: { en: "Hospital management", es: "Gestión hospitalaria" },
    kicker: { en: "Full-stack", es: "Full-stack" },
    desc: {
      en: "Hospital management app with authentication, roles and simulated clinical records.",
      es: "Aplicación de gestión hospitalaria con autenticación, roles y datos clínicos simulados.",
    },
    stack: ["React", "Node.js", "MongoDB"],
    tags: ["front", "back", "data"], repo: "", demo: "",
  },
  {
    id: "fcc-qa", year: 2026, swatch: "#C9F2EF",
    title: { en: "QA project series", es: "Serie de proyectos QA" },
    kicker: { en: "freeCodeCamp · Quality Assurance", es: "freeCodeCamp · Quality Assurance" },
    desc: {
      en: "Five test-driven apps: metric-imperial converter, American/British translator, sudoku solver, personal library and issue tracker, each with unit and functional test suites.",
      es: "Cinco apps guiadas por pruebas: conversor métrico-imperial, traductor americano/británico, solucionador de sudoku, biblioteca personal y gestor de incidencias, cada una con pruebas unitarias y funcionales.",
    },
    stack: ["Node.js", "Mocha", "Chai", "Express"],
    tags: ["qa", "back"], repo: "https://github.com/Jhanina03/boilerplate-project-sudoku-solver", demo: "",
  },
  {
    id: "testing", year: 2026, swatch: "#DCD0FF",
    title: "testingJhanina",
    kicker: { en: "Unit testing in Java", es: "Pruebas unitarias en Java" },
    desc: {
      en: "Practice repository for unit testing and test design in Java.",
      es: "Repositorio de práctica de pruebas unitarias y diseño de casos de prueba en Java.",
    },
    stack: ["Java", "JUnit"],
    tags: ["qa"], repo: "https://github.com/Jhanina03/testingJhanina", demo: "",
  },
  {
    id: "feriauto", year: 2026, swatch: "#FFD3E8",
    title: "FeriaAuto",
    kicker: { en: "Browser game", es: "Juego web" },
    desc: {
      en: "“Will FeriaAuto reach the finish line?” A small browser game about the road to legality, built for a class project.",
      es: "“¿Llegará FeriaAuto a la meta?” Un pequeño juego web sobre la ruta hacia la legalidad, hecho para un proyecto de clase.",
    },
    stack: ["JavaScript", "HTML", "CSS"],
    tags: ["game", "front"], repo: "https://github.com/Jhanina03/feriauto-juego", demo: "https://feriauto-juego.vercel.app",
  },
  {
    id: "hotwheels", year: 2025, swatch: "#A8D8FF",
    title: "Hot Wheels",
    kicker: { en: "Landing page", es: "Landing page" },
    desc: {
      en: "A fun, colourful landing page for toy cars.",
      es: "Una landing page divertida y colorida para autos de juguete.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["front"], repo: "", demo: "https://hotweels.vercel.app",
  },
  {
    id: "ssas", year: 2025, swatch: "#FF9ACB",
    title: "SSAS · Wide World Importers",
    kicker: { en: "Business intelligence", es: "Inteligencia de negocios" },
    desc: {
      en: "Analysis Services cubes over the Wide World Importers data warehouse for sales analytics.",
      es: "Cubos de Analysis Services sobre el data warehouse Wide World Importers para analítica de ventas.",
    },
    stack: ["SQL Server", "SSAS", "Data warehouse"],
    tags: ["data"], repo: "https://github.com/Jhanina03/SSASWideWorldImporters", demo: "",
  },
  {
    id: "search", year: 2026, swatch: "#C9B8FF",
    title: { en: "Informed search & Apriori", es: "Búsquedas informadas y Apriori" },
    kicker: { en: "Classic AI", es: "IA clásica" },
    desc: {
      en: "Heuristic search algorithms (A*, greedy) and Apriori association rules for market-basket analysis.",
      es: "Algoritmos de búsqueda heurística (A*, voraz) y reglas de asociación Apriori para análisis de canasta.",
    },
    stack: ["Python"],
    tags: ["ai", "data"], repo: "https://github.com/Jhanina03/BusquedasInformadasIA", demo: "",
  },
  {
    id: "praline", year: 2026, swatch: "#FFE3F1",
    title: { en: "Praline · mockups", es: "Praline · mockups" },
    kicker: { en: "UX / UI", es: "UX / UI" },
    desc: {
      en: "Wireframes and high-fidelity mockups for a dessert-shop website.",
      es: "Wireframes y mockups de alta fidelidad para el sitio web de una pastelería.",
    },
    stack: ["HTML", "CSS", "Wireframing"],
    tags: ["front", "fashion"], repo: "https://github.com/Jhanina03/MockupsWireframesPraline", demo: "",
  },
  {
    id: "soa", year: 2025, swatch: "#A8D8FF",
    title: { en: "Distributed services (SOA)", es: "Servicios distribuidos (SOA)" },
    kicker: { en: "Architecture", es: "Arquitectura" },
    desc: {
      en: "Service-oriented architecture exercises: SOAP/REST services and clients in PHP and JavaScript.",
      es: "Ejercicios de arquitectura orientada a servicios: servicios y clientes SOAP/REST en PHP y JavaScript.",
    },
    stack: ["PHP", "JavaScript", "REST", "SOAP"],
    tags: ["back"], repo: "https://github.com/Jhanina03/SOADistribuidas", demo: "",
  },
  {
    id: "tamagotchi", year: 2024, swatch: "#FFB3D9",
    title: "Tamagotchi JS",
    kicker: { en: "State machines, but cute", es: "Máquinas de estado, pero tiernas" },
    desc: {
      en: "A virtual pet in the browser to practise business logic and state handling.",
      es: "Una mascota virtual en el navegador para practicar lógica de negocio y manejo de estados.",
    },
    stack: ["JavaScript"],
    tags: ["game", "front"], repo: "", demo: "",
  },
];

/* ---------- Experience (the runway) ---------- */
window.EXPERIENCE = [
  {
    when: { en: "2025", es: "2025" },
    role: { en: "Pre-professional intern · Developer", es: "Practicante preprofesional · Desarrolladora" },
    org: { en: "Financial institution · Ecuador", es: "Institución financiera · Ecuador" },
    points: {
      en: ["Built an account-reconciliation program that cross-checks balances and flags differences.", "Wrote SQL queries and reports for the operations team.", "Tested each release with real scenarios before handing it over."],
      es: ["Desarrollé un programa de cuadre de cuentas que cruza saldos y marca diferencias.", "Escribí consultas SQL y reportes para el equipo de operaciones.", "Probé cada entrega con escenarios reales antes de entregarla."],
    },
  },
  {
    when: { en: "Mar – Jul 2024", es: "Mar – Jul 2024" },
    role: { en: "Front-End Developer", es: "Desarrolladora Front-End" },
    org: { en: "Apollo S.A. · Remote (San Francisco, USA)", es: "Apollo S.A. · Remoto (San Francisco, EE. UU.)" },
    points: {
      en: ["Built and maintained interfaces for a ride-hailing app.", "Created reusable components and dynamic views across modules.", "Integrated REST APIs for data visualisation and reports.", "Took part in functional testing and code reviews."],
      es: ["Desarrollé y mantuve interfaces para una app de transporte tipo ride-hailing.", "Creé componentes reutilizables y vistas dinámicas para varios módulos.", "Integré APIs REST para visualización de datos y reportes.", "Participé en pruebas funcionales y revisión de código."],
    },
  },
  {
    when: { en: "2023", es: "2023" },
    role: { en: "Junior Web Developer", es: "Desarrolladora Web Junior" },
    org: { en: "Car-rental company", es: "Empresa de alquiler de autos" },
    points: {
      en: ["Built web features with JavaScript, HTML, CSS and Node.js."],
      es: ["Desarrollé funcionalidades web con JavaScript, HTML, CSS y Node.js."],
    },
  },
  {
    when: { en: "2022 – today", es: "2022 – hoy" },
    role: { en: "B.Sc. Software Engineering · 8th semester", es: "Ingeniería de Software · 8.º semestre" },
    org: { en: "Universidad Técnica de Ambato", es: "Universidad Técnica de Ambato" },
    points: {
      en: ["Web and mobile apps, microservices, data warehousing, AI and software testing.", "Refactored academic video games with clean-code principles."],
      es: ["Apps web y móviles, microservicios, data warehousing, IA y pruebas de software.", "Refactoricé videojuegos académicos aplicando código limpio."],
    },
  },
];

/* ---------- Certificates (clothing tags) ----------
   Add new ones here: { title, issuer, year, url }            */
window.CERTS = [
  {
    title: { en: "CSEI 2024 · Participation", es: "CSEI 2024 · Participación" },
    issuer: { en: "Computer Science, Electronics & Industrial Engineering Congress · UTA", es: "Congreso de Ciencias de la Computación, Electrónica e Ingeniería Industrial · UTA" },
    year: "2024", url: "assets/certs/csei-2024-participation.pdf", color: "#B79CFF",
  },
  {
    title: { en: "CSEI 2024 · Approval", es: "CSEI 2024 · Aprobación" },
    issuer: { en: "Computer Science, Electronics & Industrial Engineering Congress · UTA", es: "Congreso de Ciencias de la Computación, Electrónica e Ingeniería Industrial · UTA" },
    year: "2024", url: "assets/certs/csei-2024-approval.pdf", color: "#FF9ACB",
  },
  {
    title: { en: "GitHub achievements", es: "Logros de GitHub" },
    issuer: { en: "GitHub", es: "GitHub" },
    year: "2024 – 2026", url: "https://github.com/Jhanina03?tab=achievements", color: "#7FB6FF",
  },
  {
    title: { en: "Technical high-school diploma with honours", es: "Bachillerato técnico con honores" },
    issuer: { en: "Electrical installations & machinery · U.E. Ramón Barba Naranjo", es: "Instalaciones, equipos y máquinas eléctricas · U.E. Ramón Barba Naranjo" },
    year: "2022", url: "", color: "#8EE3E0",
  },
];
