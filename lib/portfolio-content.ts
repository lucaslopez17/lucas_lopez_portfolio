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
  company?: string;
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
      scopeLabel: string;
      signalsLabel: string;
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
        title: "Applied Skill Map",
        eyebrow: "What I can execute",
        intro:
          "A practical map of the capabilities Lucas brings together: engineering thinking, maintenance planning, field execution, fabrication, documentation and operational improvement.",
        scopeLabel: "Skill base",
        signalsLabel: "Applied value",
        items: [
          {
            id: "planning-control",
            role: "Planning and Control",
            focus: "Maintenance planning / KPIs / execution follow-up",
            responsibilities: [
              "Build maintenance priorities from site constraints, risk, available resources and execution windows.",
              "Track backlog, compliance, downtime, schedule adherence and work execution indicators.",
              "Connect office planning with the real conditions found by field crews.",
              "Organise technical information so tasks can move from planning to execution with fewer gaps.",
            ],
            achievements: [
              "Turns operational noise into clear priorities and measurable follow-up.",
              "Bridges the white-collar planning side with blue-collar field reality.",
            ],
          },
          {
            id: "shutdown-execution",
            role: "Shutdown Execution",
            focus: "Maintenance shutdowns / isolation / time-critical work",
            responsibilities: [
              "Work within shutdown schedules, isolation requirements and site safety procedures.",
              "Support inspections, component change-outs, alignment checks and mechanical readiness.",
              "Understand the pressure of short execution windows and the importance of preparation.",
              "Coordinate mechanical tasks around access, tooling, permits and field sequencing.",
            ],
            achievements: [
              "Can read a plan from the office side and understand what it takes to execute it on site.",
              "Keeps attention on safety, sequence and practical completion under time pressure.",
            ],
          },
          {
            id: "hdpe-systems",
            role: "HDPE Systems",
            focus: "Polywelding / dewatering / pipeline installation",
            responsibilities: [
              "Butt fusion and electrofusion welding of HDPE pipes.",
              "Control welding parameters including temperature, pressure, soak and changeover.",
              "Install HDPE lines through stringing, alignment, tie-ins and field adjustments.",
              "Use weld procedures, records and field documentation to support traceability.",
            ],
            achievements: [
              "Combines hands-on welding skill with process discipline and documentation.",
              "Understands how HDPE systems behave from fabrication through site installation.",
            ],
          },
          {
            id: "fabrication-fitting",
            role: "Fabrication and Fitting",
            focus: "Spools / fittings / pumps / mechanical support",
            responsibilities: [
              "Fabricate HDPE spools and fittings for site-ready installation.",
              "Support pump, valve and flange installation work.",
              "Use hand tools, power tools and measuring equipment in workshop and site conditions.",
              "Interpret practical mechanical requirements from drawings, equipment and field constraints.",
            ],
            achievements: [
              "Brings mechanical judgement to fabrication, installation and problem solving.",
              "Can move between workshop thinking and field execution without losing the technical detail.",
            ],
          },
          {
            id: "documentation-cad",
            role: "Documentation and CAD",
            focus: "Manuals / drawings / technical information",
            responsibilities: [
              "Produce and interpret mechanical drawings, manuals and technical documents.",
              "Work with AutoCAD, Inventor, SolidWorks and management software.",
              "Translate machine and process information into documentation people can use.",
              "Keep technical information structured enough to support planning, maintenance and training.",
            ],
            achievements: [
              "Turns equipment knowledge into clear technical references.",
              "Strengthens the connection between design intent, documentation and execution.",
            ],
          },
          {
            id: "quality-improvement",
            role: "Quality and Improvement",
            focus: "Quality support / process thinking / technical communication",
            responsibilities: [
              "Apply industrial engineering logic to quality, production control and process improvement.",
              "Communicate technical ideas clearly across engineering, supervision and field teams.",
              "Use analytical thinking from mathematics, physics and engineering to solve operational problems.",
              "Identify repeatable ways to reduce confusion, rework and execution friction.",
            ],
            achievements: [
              "Adds structure to practical problems without losing contact with the work itself.",
              "Makes technical information easier to understand, teach and execute.",
            ],
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
        title: "Mapa de Skills Aplicadas",
        eyebrow: "Lo que puedo ejecutar",
        intro:
          "Un mapa práctico de las capacidades que Lucas combina: pensamiento de ingeniería, planificación de mantenimiento, ejecución en campo, fabricación, documentación y mejora operativa.",
        scopeLabel: "Base técnica",
        signalsLabel: "Valor aplicado",
        items: [
          {
            id: "planning-control",
            role: "Planificación y Control",
            focus: "Mantenimiento / KPIs / seguimiento de ejecución",
            responsibilities: [
              "Armar prioridades de mantenimiento considerando restricciones de sitio, riesgo, recursos y ventanas de ejecución.",
              "Seguir KPIs de backlog, cumplimiento, downtime, adherencia al programa y ejecución de trabajos.",
              "Conectar la planificación de oficina con las condiciones reales que encuentra el equipo de campo.",
              "Ordenar información técnica para que las tareas pasen de planificación a ejecución con menos huecos.",
            ],
            achievements: [
              "Convierte ruido operativo en prioridades claras y seguimiento medible.",
              "Une la lógica white-collar de planificación con la realidad blue-collar del campo.",
            ],
          },
          {
            id: "shutdown-execution",
            role: "Ejecución en Shutdowns",
            focus: "Paradas / aislamiento / trabajos críticos por tiempo",
            responsibilities: [
              "Trabajar dentro de programas de shutdown, requisitos de aislamiento y procedimientos de seguridad.",
              "Dar soporte en inspecciones, cambios de componentes, chequeos de alineación y readiness mecánico.",
              "Entender la presión de ventanas cortas de ejecución y la importancia de llegar preparado.",
              "Coordinar tareas mecánicas alrededor de accesos, herramientas, permisos y secuencia de campo.",
            ],
            achievements: [
              "Puede leer un plan desde la oficina y entender qué implica ejecutarlo en sitio.",
              "Mantiene foco en seguridad, secuencia y cierre práctico bajo presión de tiempo.",
            ],
          },
          {
            id: "hdpe-systems",
            role: "Sistemas HDPE",
            focus: "Polywelding / dewatering / instalación de líneas",
            responsibilities: [
              "Soldadura butt fusion y electrofusion de tuberías HDPE.",
              "Control de parámetros de soldadura: temperatura, presión, soak y changeover.",
              "Instalación de líneas HDPE mediante stringing, alineación, tie-ins y ajustes de campo.",
              "Uso de procedimientos, registros y documentación de soldadura para sostener trazabilidad.",
            ],
            achievements: [
              "Combina habilidad manual de soldadura con disciplina de proceso y documentación.",
              "Entiende el sistema HDPE desde fabricación hasta instalación en sitio.",
            ],
          },
          {
            id: "fabrication-fitting",
            role: "Fabricación y Fitting",
            focus: "Spools / fittings / bombas / soporte mecánico",
            responsibilities: [
              "Fabricar spools y fittings HDPE listos para instalación en sitio.",
              "Dar soporte en instalación de bombas, válvulas y bridas.",
              "Usar herramientas manuales, eléctricas y de medición en taller y campo.",
              "Interpretar requerimientos mecánicos desde planos, equipos y restricciones reales de campo.",
            ],
            achievements: [
              "Aporta criterio mecánico a fabricación, instalación y resolución de problemas.",
              "Puede moverse entre lógica de taller y ejecución en campo sin perder detalle técnico.",
            ],
          },
          {
            id: "documentation-cad",
            role: "Documentación y CAD",
            focus: "Manuales / planos / información técnica",
            responsibilities: [
              "Producir e interpretar planos mecánicos, manuales y documentos técnicos.",
              "Trabajar con AutoCAD, Inventor, SolidWorks y software de gestión.",
              "Traducir información de máquinas y procesos en documentación utilizable.",
              "Mantener información técnica ordenada para planificación, mantenimiento y capacitación.",
            ],
            achievements: [
              "Convierte conocimiento de equipos en referencias técnicas claras.",
              "Refuerza la conexión entre intención de diseño, documentación y ejecución.",
            ],
          },
          {
            id: "quality-improvement",
            role: "Calidad y Mejora",
            focus: "Calidad / procesos / comunicación técnica",
            responsibilities: [
              "Aplicar lógica de ingeniería industrial a calidad, control productivo y mejora de procesos.",
              "Comunicar ideas técnicas con claridad entre ingeniería, supervisión y equipos de campo.",
              "Usar pensamiento analítico de matemática, física e ingeniería para resolver problemas operativos.",
              "Identificar formas repetibles de reducir confusión, retrabajo y fricción en la ejecución.",
            ],
            achievements: [
              "Agrega estructura a problemas prácticos sin despegarse del trabajo real.",
              "Hace que la información técnica sea más fácil de entender, enseñar y ejecutar.",
            ],
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

