export type Locale = "en" | "es";

export type ExpertiseNode = {
  id: string;
  label: string;
  side: "engineering" | "field" | "bridge";
  summary: string;
  details: string[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period?: string;
  focus: string;
  responsibilities: string[];
  achievements: string[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type EducationItem = {
  title: string;
  institution: string;
  detail: string;
};

export type ProjectItem = {
  title: string;
  context: string;
  details: string[];
};

export type PortfolioCopy = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    language: string;
    expand: string;
    close: string;
    status: string;
    source: string;
    scroll: string;
  };
  hero: {
    name: string;
    roles: string[];
    tagline: string;
    signalLeft: string;
    signalRight: string;
    proofPoints: string[];
  };
  sections: {
    identity: {
      title: string;
      eyebrow: string;
      intro: string;
      nodes: ExpertiseNode[];
    };
    experience: {
      title: string;
      eyebrow: string;
      intro: string;
      items: Experience[];
    };
    skills: {
      title: string;
      eyebrow: string;
      groups: SkillGroup[];
    };
    education: {
      title: string;
      eyebrow: string;
      items: EducationItem[];
      certifications: string[];
      inductions: string[];
      languages: string[];
    };
    projects: {
      title: string;
      eyebrow: string;
      items: ProjectItem[];
    };
    contact: {
      title: string;
      body: string;
      email: string;
      phone: string;
      location: string;
    };
  };
};

export const copy: Record<Locale, PortfolioCopy> = {
  en: {
    meta: {
      title: "Lucas Lopez | Engineering Meets Field Execution",
      description:
        "A premium interactive portfolio for Lucas Lopez, Industrial Engineer, Mechanical Fitter and Polywelder.",
    },
    ui: {
      language: "Language",
      expand: "Open signal",
      close: "Close",
      status: "System active",
      source: "Extracted from CVs",
      scroll: "Scroll to explore",
    },
    hero: {
      name: "Lucas Lopez",
      roles: ["Industrial Engineer", "Mechanical Fitter & Polywelder"],
      tagline: "Designed in engineering. Proven in the field.",
      signalLeft: "Planning / systems / optimization",
      signalRight: "Welding / maintenance / site execution",
      proofPoints: [
        "Mining dewatering",
        "HDPE pipeline systems",
        "Maintenance shutdowns",
        "Mechanical design and documentation",
      ],
    },
    sections: {
      identity: {
        title: "Two Operating Modes. One Technical Mind.",
        eyebrow: "Professional identity",
        intro:
          "Lucas connects engineering analysis with practical execution: planning, process improvement, fabrication, welding, maintenance and mining operations.",
        nodes: [
          {
            id: "industrial-engineering",
            label: "Industrial Engineering",
            side: "engineering",
            summary: "Systems thinking for planning, quality and operational improvement.",
            details: [
              "Bachelor of Industrial Engineering in progress at Universidad de Palermo.",
              "Background in mechanical engineering studies at Universidad Tecnológica Nacional.",
              "Experience in quality assistance, technical documentation and engineering department tasks.",
            ],
          },
          {
            id: "maintenance-planning",
            label: "Maintenance Planning",
            side: "bridge",
            summary: "Shutdown schedules, inspections and site safety requirements.",
            details: [
              "Shutdown maintenance on stacker conveyor systems in mining environments.",
              "Pulley, roller, impact bed and conveyor skirting replacement.",
              "Basic alignment checks and mechanical inspections during maintenance activities.",
            ],
          },
          {
            id: "polywelding",
            label: "Polywelding",
            side: "field",
            summary: "HDPE butt fusion, electrofusion and field-based pipeline work.",
            details: [
              "Manual, semi-auto and auto butt fusion welding.",
              "Electrofusion welding of HDPE pipes.",
              "WPS interpretation and weld record completion using systems such as Fulcrum.",
            ],
          },
          {
            id: "mining-operations",
            label: "Mining Operations",
            side: "field",
            summary: "Open pit and underground experience under Tier 1 mining standards.",
            details: [
              "Mining dewatering systems, pump relocation and HDPE line installation.",
              "Experience in fast-paced shutdowns and field works.",
              "Inductions include Roy Hill, Mineral Resources, Northern Star Resources and Karara Mining.",
            ],
          },
          {
            id: "technical-documentation",
            label: "Technical Documentation",
            side: "engineering",
            summary: "Manuals, drawings, CAD and machinery documentation.",
            details: [
              "Machine manuals for PET and RET lines at Coca Cola through Universidad Tecnológica Nacional.",
              "Mechanical drawings and administrative engineering tasks at ME-PROMAES S.A.",
              "Advanced AutoCAD with Inventor and SolidWorks experience.",
            ],
          },
          {
            id: "fabrication",
            label: "Fabrication",
            side: "field",
            summary: "Spool and fitting fabrication with mechanical fitting support.",
            details: [
              "HDPE spool and fitting fabrication.",
              "Pump, valve and flange installation support.",
              "Use of hand and power tools in field conditions.",
            ],
          },
        ],
      },
      experience: {
        title: "Experience Network",
        eyebrow: "Field record + engineering base",
        intro:
          "Each node shows a different layer of the same profile: engineering office, quality, technical education, mining maintenance and HDPE field execution.",
        items: [
          {
            id: "king",
            role: "Shutdown Mechanical Fitter",
            company: "King Resources Group",
            focus: "Mining shutdown maintenance",
            responsibilities: [
              "Performed shutdown maintenance on stacker conveyor systems.",
              "Replaced conveyor pulleys, rollers, impact beds and conveyor skirting components.",
              "Assisted with removal and installation of heavy conveyor equipment and components.",
              "Worked in accordance with shutdown schedules, isolation procedures and site safety requirements.",
              "Conducted inspections and basic alignment checks during maintenance activities.",
            ],
            achievements: [
              "Supported time-critical maintenance work in a mining environment.",
              "Combined mechanical fitting tasks with safety-controlled shutdown execution.",
            ],
          },
          {
            id: "elixon7",
            role: "Polywelder / Mechanical Fitter",
            company: "Elixon7",
            focus: "HDPE polywelding and field operations",
            responsibilities: [
              "Butt fusion and electrofusion welding of HDPE pipes.",
              "Set-up and control of welding parameters including temperature, pressure, soak and changeover.",
              "HDPE pipeline installation: stringing, alignment and tie-ins.",
              "Fabrication of spools and fittings.",
              "Installation and relocation of pumps and HDPE lines for mining dewatering systems.",
              "Basic mechanical support for pumps, valves and flanges.",
            ],
            achievements: [
              "Worked across open pit and underground environments.",
              "Operated under Tier 1 mining standards.",
              "Used McElroy, Dixon, Worldpoly and equivalent fusion equipment in field conditions.",
            ],
          },
          {
            id: "mega",
            role: "Quality Assistant",
            company: "Mega-tecnologia S.A.",
            period: "25/03/2017 - 31/12/2017",
            focus: "Quality support",
            responsibilities: ["Worked as quality assistant in an industrial company."],
            achievements: ["Built practical exposure to quality systems and production control."],
          },
          {
            id: "utn-cocacola",
            role: "Technical Documentation Contributor",
            company: "Universidad Tecnológica Nacional / Coca Cola",
            period: "27/11/2015 - 01/03/2018",
            focus: "Machine manuals for PET and RET lines",
            responsibilities: [
              "Prepared machine manuals for PET and RET lines at Coca Cola through Universidad Tecnológica Nacional.",
            ],
            achievements: ["Translated mechanical systems into usable technical documentation."],
          },
          {
            id: "mepromaes",
            role: "Engineering Department Support",
            company: "ME-PROMAES S.A.",
            period: "25/03/2014 - 02/01/2016",
            focus: "Administration, drawings and management software",
            responsibilities: [
              "Completed administrative engineering tasks.",
              "Designed and produced mechanical drawings.",
              "Worked with management software in the engineering department.",
            ],
            achievements: ["Connected mechanical design, documentation and operational administration."],
          },
          {
            id: "teaching",
            role: "Technical Teaching Support",
            company: "Instituto Técnico Renault / Private classes",
            period: "2016",
            focus: "Mathematics and physics",
            responsibilities: [
              "Substitute teacher for Mathematics in 1st, 2nd and 3rd year.",
              "Substitute teacher for Physics in 3rd year.",
              "Taught private university-level Mathematics for Architecture and Hygiene & Safety students.",
            ],
            achievements: ["Strengthened technical communication and analytical teaching skills."],
          },
        ],
      },
      skills: {
        title: "Capability Matrix",
        eyebrow: "Skills, software and tools",
        groups: [
          {
            title: "Engineering",
            skills: [
              "Industrial engineering",
              "Mechanical design",
              "Technical drawing",
              "Blueprint interpretation",
              "Quality support",
              "Technical documentation",
              "Process improvement",
            ],
          },
          {
            title: "Software",
            skills: [
              "Microsoft Office intermediate-advanced",
              "AutoCAD advanced",
              "Inventor intermediate-advanced",
              "SolidWorks intermediate",
              "Web design",
              "Management software",
              "Fulcrum weld records",
            ],
          },
          {
            title: "Polywelding",
            skills: [
              "Butt fusion welding",
              "Electrofusion welding",
              "Extrusion and socket welding",
              "Hot air gun welding",
              "WPS interpretation",
              "Weld parameter control",
              "HDPE tie-ins",
            ],
          },
          {
            title: "Field Operations",
            skills: [
              "Mining dewatering",
              "Pump relocation",
              "HDPE line installation",
              "Open pit environments",
              "Underground environments",
              "Shutdowns",
              "Tier 1 mining standards",
            ],
          },
          {
            title: "Tools and Machines",
            skills: [
              "McElroy T500 and T900 fusion machines",
              "Dixon 250, 350, 450 and 630 machines",
              "Worldpoly and equivalent fusion systems",
              "Lathes",
              "Milling machines",
              "CNC lathes and machining centers",
              "Grinders and drills",
              "Calipers, micrometers and height gauges",
            ],
          },
          {
            title: "Management and Communication",
            skills: [
              "Planning",
              "Problem solving",
              "Site safety requirements",
              "Isolation procedures",
              "Technical communication",
              "Trilingual communication",
            ],
          },
        ],
      },
      education: {
        title: "Learning Stack",
        eyebrow: "Education and credentials",
        items: [
          {
            title: "Bachelor of Industrial Engineering",
            institution: "Universidad de Palermo, Argentina",
            detail: "2023 - expected Dec 2026, in progress",
          },
          {
            title: "Certificate IV in Engineering",
            institution: "Intech Institute, Australia",
            detail: "Completed Nov 2025",
          },
          {
            title: "Bachelor of Mechanical Engineering",
            institution: "Universidad Tecnológica Nacional, Argentina",
            detail: "2012 - 2020, partially completed - 85%",
          },
          {
            title: "Mechanical Technician",
            institution: "Instituto Técnico Renault, Argentina",
            detail: "Graduated 2011 / Bachiller Técnico Metal-mecánico",
          },
        ],
        certifications: [
          "Certificate IV in Engineering - MEM40119",
          "Manual Driver's License (Australia)",
          "Butt Weld Ticket - PMBWELD301E",
          "Electrofusion Weld Ticket - PMBWELD302E",
          "Extrusion and Socket Welding - PMBWELD309E",
          "Hot Air Gun Welding - PMBPROD287E",
          "Forklift Ticket - TLILIC0003 (HRWL)",
          "IT Loader Ticket - RIIMPO208F",
          "EWP - TLILIC0005 (HRWL)",
          "White Card - CPCCWHS1001",
          "Work at Heights - RIIWHS204E",
          "Confined Spaces - RIIWHS202E",
          "Gas Atmospheres Testing - MSMWHS217",
          "Test & Tag - UEERL0003",
          "First Aid & CPR - HLTAID011",
          "WHS Statutory Responsibilities for Mining Supervisors Course",
          "Mask Fit Test",
          "Automotive carburetion and ignition course - Instituto Técnico Renault, 2011",
        ],
        inductions: ["Roy Hill", "Mineral Resources", "Northern Star Resources", "Karara Mining"],
        languages: ["Spanish - Native", "Portuguése - Fluent", "English - Fluent (IELTS C1 Nov 2025)", "French - Basic"],
      },
      projects: {
        title: "Project Signals",
        eyebrow: "Work converted into outcomes",
        items: [
          {
            title: "Mining dewatering HDPE systems",
            context: "Elixon7",
            details: [
              "Installed and relocated pumps and HDPE lines.",
              "Performed HDPE stringing, alignment and tie-ins.",
              "Worked in open pit and underground site conditions.",
            ],
          },
          {
            title: "Stacker conveyor shutdown maintenance",
            context: "King Resources Group",
            details: [
              "Replaced pulleys, rollers, impact beds and skirting components.",
              "Assisted with heavy conveyor equipment removal and installation.",
              "Worked to shutdown schedules and isolation requirements.",
            ],
          },
          {
            title: "PET and RET line machine manuals",
            context: "Universidad Tecnológica Nacional / Coca Cola",
            details: [
              "Prepared machine manuals for production lines.",
              "Converted mechanical information into clear technical documentation.",
            ],
          },
          {
            title: "Mechanical drawings and engineering support",
            context: "ME-PROMAES S.A.",
            details: [
              "Designed and produced mechanical drawings.",
              "Supported engineering administration and management software workflows.",
            ],
          },
          {
            title: "San Luis highway tender drawings",
            context: "Province of San Luis tender project",
            details: ["Participated in the highway project tender with drawing design tasks in 2010."],
          },
          {
            title: "Community workshop procedures",
            context: "Villa el Libertador social cooperative",
            details: [
              "Participated in procedure development for the carpentry sector.",
              "Applied technical organization in a community work environment.",
            ],
          },
        ],
      },
      contact: {
        title: "Ready for office-to-site problems.",
        body: "Available for roles and projects where engineering thinking, mechanical skill and field execution need to operate together.",
        email: "lucaslopez.cba@gmail.com",
        phone: "+61 478 727 147",
        location: "Perth, WA",
      },
    },
  },
  es: {
    meta: {
      title: "Lucas Lopez | Ingeniería y Ejecución en Campo",
      description:
        "Portfolio interactivo premium de Lucas Lopez, Ingeniero Industrial, Mechanical Fitter y Polywelder.",
    },
    ui: {
      language: "Idioma",
      expand: "Abrir señal",
      close: "Cerrar",
      status: "Sistema activo",
      source: "Extraído de CVs",
      scroll: "Scroll para explorar",
    },
    hero: {
      name: "Lucas Lopez",
      roles: ["Ingeniero Industrial", "Mechanical Fitter & Polywelder"],
      tagline: "Diseñado desde la ingeniería. Probado en campo.",
      signalLeft: "Planificación / sistemas / optimización",
      signalRight: "Soldadura / mantenimiento / ejecución en sitio",
      proofPoints: [
        "Dewatering minero",
        "Sistemas de tubería HDPE",
        "Paradas de mantenimiento",
        "Diseño mecánico y documentación",
      ],
    },
    sections: {
      identity: {
        title: "Dos Modos de Trabajo. Una Mente Técnica.",
        eyebrow: "Identidad profesional",
        intro:
          "Lucas conecta análisis de ingeniería con ejecución practica: planificación, mejora de procesos, fabricación, soldadura, mantenimiento y operaciónes mineras.",
        nodes: [
          {
            id: "industrial-engineering",
            label: "Ingeniería Industrial",
            side: "engineering",
            summary: "Pensamiento sistemico para planificación, calidad y mejora operativa.",
            details: [
              "Ingeniería Industrial en curso en Universidad de Palermo.",
              "Base previa en Ingeniería Mecánica en Universidad Tecnológica Nacional.",
              "Experiencia en calidad, documentación técnica y tareas de departamento de ingeniería.",
            ],
          },
          {
            id: "maintenance-planning",
            label: "Planificación de Mantenimiento",
            side: "bridge",
            summary: "Paradas, inspecciones, procedimientos de aislamiento y seguridad de sitio.",
            details: [
              "Mantenimiento de shutdown en sistemas de stacker conveyor en mineria.",
              "Reemplazo de poleas, rodillos, impact beds y skirting de conveyor.",
              "Inspecciones y chequeos básicos de alineacion durante mantenimiento.",
            ],
          },
          {
            id: "polywelding",
            label: "Polywelding",
            side: "field",
            summary: "Butt fusion, electrofusion y trabajo de campo en tuberías HDPE.",
            details: [
              "Soldadura butt fusion manual, semi-automática y automática.",
              "Electrofusion de tuberías HDPE.",
              "Interpretación de WPS y registros de soldadura en sistemas como Fulcrum.",
            ],
          },
          {
            id: "mining-operations",
            label: "Operaciónes Mineras",
            side: "field",
            summary: "Experiencia open pit y underground bajo estandares Tier 1.",
            details: [
              "Sistemas de dewatering minero, reubicación de bombas e instalación de lineas HDPE.",
              "Experiencia en shutdowns y trabajos de sitio de ritmo acelerado.",
              "Inducciones: Roy Hill, Mineral Resources, Northern Star Resources y Karara Mining.",
            ],
          },
          {
            id: "technical-documentation",
            label: "Documentación Técnica",
            side: "engineering",
            summary: "Manuales, plaños, CAD y documentación de maquinaria.",
            details: [
              "Manuales de maquinas para lineas PET y RET en Coca Cola a traves de Universidad Tecnológica Nacional.",
              "Plaños mecánicos y tareas administrativas de ingeniería en ME-PROMAES S.A.",
              "AutoCAD avanzado con experiencia en Inventor y SolidWorks.",
            ],
          },
          {
            id: "fabrication",
            label: "Fabricacion",
            side: "field",
            summary: "Fabricacion de spools y fittings con soporte de mechanical fitting.",
            details: [
              "Fabricacion de spools y fittings HDPE.",
              "Soporte en instalación de bombas, válvulas y bridas.",
              "Uso de herramientas manuales y electricas en condiciones de campo.",
            ],
          },
        ],
      },
      experience: {
        title: "Red de Experiencia",
        eyebrow: "Campo actual + base de ingeniería",
        intro:
          "Cada nodo muestra una capa del mismo perfil: oficina técnica, calidad, educacion técnica, mantenimiento minero y ejecución HDPE en campo.",
        items: [
          {
            id: "king",
            role: "Shutdown Mechanical Fitter",
            company: "King Resources Group",
            focus: "Mantenimiento de shutdown en mineria",
            responsibilities: [
              "Realizo mantenimiento de shutdown en sistemas de stacker conveyor.",
              "Reemplazo poleas, rodillos, impact beds y componentes de conveyor skirting.",
              "Asistio en remocion e instalación de equipos y componentes pesados de conveyor.",
              "Trabajo segun programas de shutdown, procedimientos de aislamiento y requisitos de seguridad del sitio.",
              "Realizo inspecciones y chequeos básicos de alineacion durante tareas de mantenimiento.",
            ],
            achievements: [
              "Soporte en mantenimiento critico por tiempos dentro de entorno minero.",
              "Integro tareas de mechanical fitting con ejecución de shutdown controlada por seguridad.",
            ],
          },
          {
            id: "elixon7",
            role: "Polywelder / Mechanical Fitter",
            company: "Elixon7",
            focus: "HDPE polywelding y operaciónes de campo",
            responsibilities: [
              "Butt fusion y electrofusion de tuberías HDPE.",
              "Configuración y control de parametros de soldadura: temperatura, presión, soak y changeover.",
              "Instalación de tuberías HDPE: stringing, alineacion y tie-ins.",
              "Fabricacion de spools y fittings.",
              "Instalación y reubicación de bombas y lineas HDPE para sistemas de dewatering minero.",
              "Soporte mecánico básico en bombas, válvulas y bridas.",
            ],
            achievements: [
              "Trabajo en ambientes open pit y underground.",
              "Operación bajo estandares de mineria Tier 1.",
              "Uso de equipos McElroy, Dixon, Worldpoly y sistemas equivalentes en campo.",
            ],
          },
          {
            id: "mega",
            role: "Auxiliar de Calidad",
            company: "Mega-tecnologia S.A.",
            period: "25/03/2017 - 31/12/2017",
            focus: "Soporte de calidad",
            responsibilities: ["Trabajo como auxiliar de calidad en una empresa industrial."],
            achievements: ["Construyo exposicion practica a calidad y control productivo."],
          },
          {
            id: "utn-cocacola",
            role: "Contribuidor de Documentación Técnica",
            company: "Universidad Tecnológica Nacional / Coca Cola",
            period: "27/11/2015 - 01/03/2018",
            focus: "Manuales de maquinas para lineas PET y RET",
            responsibilities: [
              "Confeccion de manuales de maquinas en lineas PET y RET en Coca Cola a cargo de Universidad Tecnológica Nacional.",
            ],
            achievements: ["Tradujo sistemas mecánicos en documentación técnica utilizable."],
          },
          {
            id: "mepromaes",
            role: "Soporte en Departamento de Ingeniería",
            company: "ME-PROMAES S.A.",
            period: "25/03/2014 - 02/01/2016",
            focus: "Administración, plaños y software de gestión",
            responsibilities: [
              "Tareas administrativas de ingeniería.",
              "Diseño y realizacion de plaños mecánicos.",
              "Trabajo con software de gestión en el departamento de ingeniería.",
            ],
            achievements: ["Conectó diseño mecánico, documentación y administración operativa."],
          },
          {
            id: "teaching",
            role: "Soporte Docente Técnico",
            company: "Instituto Técnico Renault / Clases particulares",
            period: "2016",
            focus: "Matemática y fisica",
            responsibilities: [
              "Suplencia docente en Matemática de 1er, 2do y 3er año.",
              "Suplencia docente en Física de 3er año.",
              "Clases particulares de Matemática nivel universitario para Arquitectura y Lic. Higiene y Seguridad.",
            ],
            achievements: ["Fortaleció comunicación técnica y explicación analitica."],
          },
        ],
      },
      skills: {
        title: "Matriz de Capacidades",
        eyebrow: "Skills, software y herramientas",
        groups: [
          {
            title: "Ingeniería",
            skills: [
              "Ingeniería industrial",
              "Diseño mecánico",
              "Dibujo técnico",
              "Interpretación de plaños",
              "Soporte de calidad",
              "Documentación técnica",
              "Mejora de procesos",
            ],
          },
          {
            title: "Software",
            skills: [
              "Microsoft Office medio-avanzado",
              "AutoCAD avanzado",
              "Inventor medio-avanzado",
              "SolidWorks medio",
              "Diseño web",
              "Software de gestión",
              "Registros de soldadura Fulcrum",
            ],
          },
          {
            title: "Polywelding",
            skills: [
              "Butt fusion welding",
              "Electrofusion welding",
              "Extrusion and socket welding",
              "Hot air gun welding",
              "Interpretación de WPS",
              "Control de parametros de soldadura",
              "Tie-ins HDPE",
            ],
          },
          {
            title: "Operaciónes de Campo",
            skills: [
              "Dewatering minero",
              "Reubicación de bombas",
              "Instalación de lineas HDPE",
              "Ambientes open pit",
              "Ambientes underground",
              "Shutdowns",
              "Estandares de mineria Tier 1",
            ],
          },
          {
            title: "Herramientas y Máquinas",
            skills: [
              "Fusionadoras McElroy T500 y T900",
              "Dixon 250, 350, 450 y 630",
              "Worldpoly y sistemas equivalentes",
              "Tornos",
              "Fresadoras",
              "Tornos CNC y centros de mecanizado",
              "Amoladoras y perforadoras",
              "Calibres, micrómetros y calibres de altura",
            ],
          },
          {
            title: "Gestión y Comunicación",
            skills: [
              "Planificación",
              "Resolución de problemas",
              "Requisitos de seguridad en sitio",
              "Procedimientos de aislamiento",
              "Comunicación técnica",
              "Comunicación trilingue",
            ],
          },
        ],
      },
      education: {
        title: "Stack de Formacion",
        eyebrow: "Educacion y credenciales",
        items: [
          {
            title: "Ingeniería Industrial",
            institution: "Universidad de Palermo, Argentina",
            detail: "2023 - esperado dic 2026, en curso",
          },
          {
            title: "Certificate IV in Engineering",
            institution: "Intech Institute, Australia",
            detail: "Completado nov 2025",
          },
          {
            title: "Ingeniería Mecánica",
            institution: "Universidad Tecnológica Nacional, Argentina",
            detail: "2012 - 2020, parcialmente completada - 85%",
          },
          {
            title: "Técnico Mecanico",
            institution: "Instituto Técnico Renault, Argentina",
            detail: "Egresado 2011 / Bachiller Técnico Metal-mecánico",
          },
        ],
        certifications: [
          "Certificate IV in Engineering - MEM40119",
          "Licencia manual de conducir (Australia)",
          "Butt Weld Ticket - PMBWELD301E",
          "Electrofusion Weld Ticket - PMBWELD302E",
          "Extrusion and Socket Welding - PMBWELD309E",
          "Hot Air Gun Welding - PMBPROD287E",
          "Forklift Ticket - TLILIC0003 (HRWL)",
          "IT Loader Ticket - RIIMPO208F",
          "EWP - TLILIC0005 (HRWL)",
          "White Card - CPCCWHS1001",
          "Work at Heights - RIIWHS204E",
          "Confined Spaces - RIIWHS202E",
          "Gas Atmospheres Testing - MSMWHS217",
          "Test & Tag - UEERL0003",
          "First Aid & CPR - HLTAID011",
          "WHS Statutory Responsibilities for Mining Supervisors Course",
          "Mask Fit Test",
          "Curso de carburacion y encendido del automotor - Instituto Técnico Renault, 2011",
        ],
        inductions: ["Roy Hill", "Mineral Resources", "Northern Star Resources", "Karara Mining"],
        languages: ["Español - Nativo", "Portugués - Fluido", "Inglés - Fluido (IELTS C1 Nov 2025)", "Francés - Básico"],
      },
      projects: {
        title: "Señales de Proyecto",
        eyebrow: "Trabajo convertido en resultados",
        items: [
          {
            title: "Sistemas HDPE para dewatering minero",
            context: "Elixon7",
            details: [
              "Instalación y reubicación de bombas y lineas HDPE.",
              "Stringing, alineacion y tie-ins de tuberías HDPE.",
              "Trabajo en condiciones open pit y underground.",
            ],
          },
          {
            title: "Shutdown de stacker conveyor",
            context: "King Resources Group",
            details: [
              "Reemplazo de poleas, rodillos, impact beds y skirting.",
              "Asistencia en remocion e instalación de equipos pesados de conveyor.",
              "Trabajo segun programas de shutdown y requisitos de aislamiento.",
            ],
          },
          {
            title: "Manuales de maquinas para lineas PET y RET",
            context: "Universidad Tecnológica Nacional / Coca Cola",
            details: [
              "Confeccion de manuales de maquinas para lineas de producción.",
              "Conversion de información mecánica en documentación técnica clara.",
            ],
          },
          {
            title: "Plaños mecánicos y soporte de ingeniería",
            context: "ME-PROMAES S.A.",
            details: [
              "Diseño y realizacion de plaños mecánicos.",
              "Soporte a tareas administrativas y flujos de software de gestión.",
            ],
          },
          {
            title: "Plaños para licitación de autovías",
            context: "Proyecto de autovías de San Luis",
            details: ["Participación en proyecto de licitación con tareas de diseño de plaños en 2010."],
          },
          {
            title: "Procedimientos para taller comunitario",
            context: "Cooperativa social Villa el Libertador",
            details: [
              "Participación en desarrollo de procedimientos para sector carpinteria.",
              "Aplicacion de organización técnica en entorno de trabajo comunitario.",
            ],
          },
        ],
      },
      contact: {
        title: "Listo para problemas de oficina a campo.",
        body: "Disponible para roles y proyectos donde el pensamiento de ingeniería, la habilidad mecánica y la ejecución en campo necesitan trabajar juntos.",
        email: "lucaslopez.cba@gmail.com",
        phone: "+61 478 727 147",
        location: "Perth, WA",
      },
    },
  },
};

