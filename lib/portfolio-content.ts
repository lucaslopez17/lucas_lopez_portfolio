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
              "Experience in quality assistance, technical documentation and engineering support tasks.",
            ],
          },
          {
            id: "maintenance-planning",
            label: "Maintenance Planning",
            side: "bridge",
            summary: "Office-side planning for priorities, schedules, KPIs and execution control.",
            details: [
              "Maintenance planning, work prioritisation and shutdown preparation.",
              "KPI tracking for backlog, compliance, downtime and work execution.",
              "Coordination between planning, documentation, field teams and site constraints.",
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
              "Experience under demanding mining site standards.",
            ],
          },
          {
            id: "technical-documentation",
            label: "Technical Documentation",
            side: "engineering",
            summary: "Manuals, drawings, CAD and machinery documentation.",
            details: [
              "Machine manuals for PET and RET production lines.",
              "Mechanical drawings and administrative engineering tasks.",
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
        title: "Capability Roadmap",
        eyebrow: "Activities, not job titles",
        intro:
          "Each node shows a practical operating mode: planning, documentation, quality, technical communication, shutdown maintenance and HDPE field execution.",
        items: [
          {
            id: "king",
            role: "Shutdown Maintenance",
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
            role: "HDPE Polywelding",
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
            role: "Quality Support",
            company: "Mega-tecnologia S.A.",
            period: "25/03/2017 - 31/12/2017",
            focus: "Quality support",
            responsibilities: ["Worked as quality assistant in an industrial company."],
            achievements: ["Built practical exposure to quality systems and production control."],
          },
          {
            id: "utn-cocacola",
            role: "Technical Documentation",
            company: "Universidad Tecnológica Nacional / Coca Cola",
            period: "27/11/2015 - 01/03/2018",
            focus: "Machine manuals for PET and RET lines",
            responsibilities: [
              "Prepared machine manuals for PET and RET production lines.",
            ],
            achievements: ["Translated mechanical systems into usable technical documentation."],
          },
          {
            id: "mepromaes",
            role: "Engineering Support",
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
            role: "Technical Communication",
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
          "Certificate IV in Engineering",
          "Manual Driver's License (Australia)",
          "Butt Weld Ticket",
          "Electrofusion Weld Ticket",
          "Extrusion and Socket Welding",
          "Hot Air Gun Welding",
          "Forklift Ticket",
          "IT Loader Ticket",
          "EWP",
          "White Card",
          "Work at Heights",
          "Confined Spaces",
          "Gas Atmospheres Testing",
          "Test & Tag",
          "First Aid & CPR",
          "WHS Statutory Responsibilities for Mining Supervisors Course",
          "Mask Fit Test",
        ],
        languages: ["Spanish - Native", "Portuguése - Fluent", "English - Fluent (IELTS C1 Nov 2025)"],
      },
      projects: {
        title: "Applied Work",
        eyebrow: "Skills converted into outcomes",
        items: [
          {
            title: "Mining dewatering HDPE systems",
            context: "HDPE field execution",
            details: [
              "Installed and relocated pumps and HDPE lines.",
              "Performed HDPE stringing, alignment and tie-ins.",
              "Worked in open pit and underground site conditions.",
            ],
          },
          {
            title: "Stacker conveyor shutdown maintenance",
            context: "Shutdown maintenance",
            details: [
              "Replaced pulleys, rollers, impact beds and skirting components.",
              "Assisted with heavy conveyor equipment removal and installation.",
              "Worked to shutdown schedules and isolation requirements.",
            ],
          },
          {
            title: "PET and RET line machine manuals",
            context: "Technical documentation",
            details: [
              "Prepared machine manuals for production lines.",
              "Converted mechanical information into clear technical documentation.",
            ],
          },
          {
            title: "Mechanical drawings and engineering support",
            context: "Mechanical design support",
            details: [
              "Designed and produced mechanical drawings.",
              "Supported engineering administration and management software workflows.",
            ],
          },
          {
            title: "San Luis highway tender drawings",
            context: "Tender drawing support",
            details: ["Participated in the highway project tender with drawing design tasks in 2010."],
          },
          {
            title: "Community workshop procedures",
            context: "Procedure development",
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
              "Experiencia en calidad, documentación técnica y soporte de ingeniería.",
            ],
          },
          {
            id: "maintenance-planning",
            label: "Planificación de Mantenimiento",
            side: "bridge",
            summary: "Planificación de oficina: prioridades, cronogramas, KPIs y control de ejecución.",
            details: [
              "Planificación de mantenimiento, priorización de trabajos y preparación de shutdowns.",
              "Seguimiento de KPIs de backlog, cumplimiento, downtime y ejecución de tareas.",
              "Coordinación entre planificación, documentación, equipos de campo y restricciones de sitio.",
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
              "Experiencia bajo estándares exigentes de sitio minero.",
            ],
          },
          {
            id: "technical-documentation",
            label: "Documentación Técnica",
            side: "engineering",
            summary: "Manuales, plaños, CAD y documentación de maquinaria.",
            details: [
              "Manuales de maquinas para lineas productivas PET y RET.",
              "Plaños mecánicos y tareas administrativas de ingeniería.",
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
        title: "Mapa de Capacidades",
        eyebrow: "Actividades, no cargos sueltos",
        intro:
          "Cada nodo muestra un modo de trabajo: planificación, documentación, calidad, comunicación técnica, mantenimiento en shutdowns y ejecución HDPE en campo.",
        items: [
          {
            id: "king",
            role: "Mantenimiento en Shutdowns",
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
            role: "Polywelding HDPE",
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
            role: "Soporte de Calidad",
            company: "Mega-tecnologia S.A.",
            period: "25/03/2017 - 31/12/2017",
            focus: "Soporte de calidad",
            responsibilities: ["Trabajo como auxiliar de calidad en una empresa industrial."],
            achievements: ["Construyo exposicion practica a calidad y control productivo."],
          },
          {
            id: "utn-cocacola",
            role: "Documentación Técnica",
            company: "Universidad Tecnológica Nacional / Coca Cola",
            period: "27/11/2015 - 01/03/2018",
            focus: "Manuales de maquinas para lineas PET y RET",
            responsibilities: [
              "Confeccion de manuales de maquinas en lineas productivas PET y RET.",
            ],
            achievements: ["Tradujo sistemas mecánicos en documentación técnica utilizable."],
          },
          {
            id: "mepromaes",
            role: "Soporte de Ingeniería",
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
            role: "Comunicación Técnica",
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
          "Certificate IV in Engineering",
          "Licencia manual de conducir (Australia)",
          "Butt Weld Ticket",
          "Electrofusion Weld Ticket",
          "Extrusion and Socket Welding",
          "Hot Air Gun Welding",
          "Forklift Ticket",
          "IT Loader Ticket",
          "EWP",
          "White Card",
          "Work at Heights",
          "Confined Spaces",
          "Gas Atmospheres Testing",
          "Test & Tag",
          "First Aid & CPR",
          "WHS Statutory Responsibilities for Mining Supervisors Course",
          "Mask Fit Test",
        ],
        languages: ["Español - Nativo", "Portugués - Fluido", "Inglés - Fluido (IELTS C1 Nov 2025)"],
      },
      projects: {
        title: "Trabajo Aplicado",
        eyebrow: "Skills convertidas en resultados",
        items: [
          {
            title: "Sistemas HDPE para dewatering minero",
            context: "Ejecución HDPE en campo",
            details: [
              "Instalación y reubicación de bombas y lineas HDPE.",
              "Stringing, alineacion y tie-ins de tuberías HDPE.",
              "Trabajo en condiciones open pit y underground.",
            ],
          },
          {
            title: "Shutdown de stacker conveyor",
            context: "Mantenimiento en shutdown",
            details: [
              "Reemplazo de poleas, rodillos, impact beds y skirting.",
              "Asistencia en remocion e instalación de equipos pesados de conveyor.",
              "Trabajo segun programas de shutdown y requisitos de aislamiento.",
            ],
          },
          {
            title: "Manuales de maquinas para lineas PET y RET",
            context: "Documentación técnica",
            details: [
              "Confeccion de manuales de maquinas para lineas de producción.",
              "Conversion de información mecánica en documentación técnica clara.",
            ],
          },
          {
            title: "Plaños mecánicos y soporte de ingeniería",
            context: "Soporte de diseño mecánico",
            details: [
              "Diseño y realizacion de plaños mecánicos.",
              "Soporte a tareas administrativas y flujos de software de gestión.",
            ],
          },
          {
            title: "Plaños para licitación de autovías",
            context: "Soporte de plaños para licitación",
            details: ["Participación en proyecto de licitación con tareas de diseño de plaños en 2010."],
          },
          {
            title: "Procedimientos para taller comunitario",
            context: "Desarrollo de procedimientos",
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

