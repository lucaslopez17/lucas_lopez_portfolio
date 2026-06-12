-- Lucas Bot knowledge base
-- Run this in the Supabase SQL editor (or via supabase CLI migrations).

create extension if not exists pgcrypto;

create table if not exists profile_knowledge (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text not null,
  language text not null default 'en', -- 'en' | 'es'
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh on edits
create or replace function set_profile_knowledge_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profile_knowledge_updated_at on profile_knowledge;
create trigger trg_profile_knowledge_updated_at
  before update on profile_knowledge
  for each row
  execute function set_profile_knowledge_updated_at();

-- Basic indexes to speed up text search (first version: simple ILIKE search)
create index if not exists idx_profile_knowledge_active on profile_knowledge (is_active);
create index if not exists idx_profile_knowledge_category on profile_knowledge (category);
create index if not exists idx_profile_knowledge_language on profile_knowledge (language);

-- ---------------------------------------------------------------------
-- Future-proofing for embeddings / pgvector search (not used yet):
-- When ready, run:
--   create extension if not exists vector;
--   alter table profile_knowledge add column embedding vector(768);
--   create index on profile_knowledge using hnsw (embedding vector_cosine_ops);
-- Then populate `embedding` for each row using the Gemini embeddings API,
-- and switch lib/knowledge.ts to a vector similarity query instead of ILIKE.
-- ---------------------------------------------------------------------

-- Row Level Security: allow public read of active rows only.
-- Writes should be done via the Supabase dashboard or service role key.
alter table profile_knowledge enable row level security;

drop policy if exists "Public read active knowledge" on profile_knowledge;
create policy "Public read active knowledge"
  on profile_knowledge
  for select
  using (is_active = true);

-- ---------------------------------------------------------------------
-- Seed data (edit / extend freely from the Supabase dashboard later)
-- ---------------------------------------------------------------------

insert into profile_knowledge (title, category, content, language) values
('About Lucas', 'About Lucas',
 'Lucas Lopez is an Industrial Engineer, Mechanical Fitter and Polywelder. He works at the intersection of office-side engineering planning and hands-on field execution, turning operational complexity into structured plans and measurable, execution-ready systems.',
 'en'),

('Sobre Lucas', 'About Lucas',
 'Lucas Lopez es Ingeniero Industrial, Mecánico Fitter y Polywelder. Trabaja en la intersección entre la planificación de ingeniería de oficina y la ejecución práctica en terreno, transformando la complejidad operativa en planes estructurados y sistemas listos para ejecutar.',
 'es'),

('Industrial Engineering background', 'Industrial Engineering',
 'Lucas studied a Bachelor of Industrial Engineering at Universidad de Palermo, Argentina, and a Certificate IV in Engineering at Intech Institute, Australia. His engineering focus areas include process improvement, continuous improvement, KPI analysis, maintenance planning, project management, asset management, systems and processes, engineering tools, data analysis and leadership.',
 'en'),

('Formación en Ingeniería Industrial', 'Industrial Engineering',
 'Lucas estudió Ingeniería Industrial en la Universidad de Palermo, Argentina, y un Certificate IV in Engineering en Intech Institute, Australia. Sus áreas de foco en ingeniería incluyen mejora de procesos, mejora continua, análisis de KPI, planificación de mantenimiento, gestión de proyectos, gestión de activos, sistemas y procesos, herramientas de ingeniería, análisis de datos y liderazgo.',
 'es'),

('Mechanical Fitting experience', 'Mechanical Fitting',
 'Lucas has a Bachelor of Mechanical Engineering from Universidad Tecnológica Nacional, Argentina, and trained as a Mechanical Technician at Instituto Técnico Renault, Argentina. His field focus includes mechanical fitting, fabrication, equipment maintenance, site operations, structural work and pressure systems.',
 'en'),

('Experiencia en Mecánica / Fitting', 'Mechanical Fitting',
 'Lucas tiene un título de Ingeniería Mecánica de la Universidad Tecnológica Nacional, Argentina, y se formó como Técnico Mecánico en el Instituto Técnico Renault, Argentina. Su foco en terreno incluye montaje mecánico, fabricación, mantenimiento de equipos, operaciones de sitio, trabajo estructural y sistemas de presión.',
 'es'),

('Polywelding skills', 'Polywelding',
 'Lucas works as a Polywelder with experience in HDPE systems: installing and relocating pumps and HDPE lines, performing HDPE stringing, alignment and tie-ins, extrusion and socket welding, and hot air gun welding. He holds a Butt Weld Ticket and an Electrofusion Weld Ticket.',
 'en'),

('Habilidades de Polywelding', 'Polywelding',
 'Lucas trabaja como Polywelder con experiencia en sistemas HDPE: instalación y reubicación de bombas y líneas HDPE, tendido, alineación y empalmes de HDPE, soldadura por extrusión y socket, y soldadura con pistola de aire caliente. Posee Butt Weld Ticket y Electrofusion Weld Ticket.',
 'es'),

('Mining and dewatering experience', 'Mining / Dewatering',
 'Lucas has worked on mining dewatering HDPE systems, installing and relocating pumps and HDPE lines, performing HDPE stringing, alignment and tie-ins, and working in both open pit and underground site conditions. He has also supported stacker conveyor shutdown maintenance, including replacing pulleys, rollers, impact beds and skirting components, assisting with heavy conveyor equipment removal and installation, and working to shutdown schedules and isolation requirements.',
 'en'),

('Experiencia en minería y deshidratación', 'Mining / Dewatering',
 'Lucas trabajó en sistemas HDPE de deshidratación para minería, instalando y reubicando bombas y líneas HDPE, realizando tendido, alineación y empalmes de HDPE, y trabajando tanto en condiciones de open pit como subterráneas. También dio soporte en mantenimiento de shutdown de stacker conveyors, incluyendo reemplazo de poleas, rodillos, impact beds y componentes de skirting, asistencia en remoción e instalación de equipos pesados de conveyor, y trabajo según programas de shutdown y requisitos de aislación.',
 'es'),

('Software skills', 'Software Skills',
 'Lucas is strong in Microsoft Office (intermediate-advanced), CAD software for mechanical drawings and technical documentation (strong workflow), AI tools (strong working level), Data Analysis & Reporting, project management tools, and has working knowledge of web design.',
 'en'),

('Habilidades de software', 'Software Skills',
 'Lucas tiene buen manejo de Microsoft Office (intermedio-avanzado), software CAD para planos mecánicos y documentación técnica (buen manejo), herramientas de IA (buen nivel), análisis de datos y reportes, herramientas de gestión de proyectos, y conocimiento funcional de diseño web.',
 'es'),

('Education summary', 'Education',
 'Lucas holds a Bachelor of Industrial Engineering (Universidad de Palermo, Argentina), a Certificate IV in Engineering (Intech Institute, Australia), a Bachelor of Mechanical Engineering (Universidad Tecnológica Nacional, Argentina), and trained as a Mechanical Technician (Instituto Técnico Renault, Argentina).',
 'en'),

('Resumen de formación', 'Education',
 'Lucas tiene un título de Ingeniería Industrial (Universidad de Palermo, Argentina), un Certificate IV in Engineering (Intech Institute, Australia), un título de Ingeniería Mecánica (Universidad Tecnológica Nacional, Argentina), y se formó como Técnico Mecánico (Instituto Técnico Renault, Argentina).',
 'es'),

('Languages spoken', 'Languages',
 'Lucas speaks Spanish (native), Portuguese (fluent) and English (fluent, IELTS C1, November 2025).',
 'en'),

('Idiomas', 'Languages',
 'Lucas habla español (nativo), portugués (fluido) e inglés (fluido, IELTS C1, noviembre 2025).',
 'es'),

('Work experience overview', 'Work Experience',
 'Lucas combines office-side engineering planning with on-site execution. He has supported engineering administration and management software workflows, connected office planning with real field conditions, and can read a plan from the office side and understand what it takes to execute it on site.',
 'en'),

('Resumen de experiencia laboral', 'Work Experience',
 'Lucas combina la planificación de ingeniería de oficina con la ejecución en terreno. Dio soporte a tareas administrativas y flujos de software de gestión, conectó la planificación de oficina con las condiciones reales de campo, y puede leer un plano desde la oficina y entender lo que se necesita para ejecutarlo en terreno.',
 'es'),

('Project: Mining dewatering HDPE systems', 'Projects',
 'PX-01: Mining dewatering HDPE systems. HDPE field execution: installed and relocated pumps and HDPE lines, performed HDPE stringing, alignment and tie-ins, and worked in open pit and underground site conditions.',
 'en'),

('Proyecto: Sistemas HDPE de deshidratación minera', 'Projects',
 'PX-01: Sistemas HDPE de deshidratación minera. Ejecución de campo HDPE: instalación y reubicación de bombas y líneas HDPE, tendido, alineación y empalmes de HDPE, y trabajo en condiciones de open pit y subterráneas.',
 'es'),

('Project: Stacker conveyor shutdown maintenance', 'Projects',
 'PX-02: Stacker conveyor shutdown maintenance. Replaced pulleys, rollers, impact beds and skirting components, assisted with heavy conveyor equipment removal and installation, and worked to shutdown schedules and isolation requirements.',
 'en'),

('Proyecto: Mantenimiento de shutdown de stacker conveyor', 'Projects',
 'PX-02: Mantenimiento de shutdown de stacker conveyor. Reemplazo de poleas, rodillos, impact beds y componentes de skirting, asistencia en remoción e instalación de equipos pesados de conveyor, y trabajo según programas de shutdown y requisitos de aislación.',
 'es'),

('Certifications and tickets', 'Certifications',
 'Lucas holds: Manual Driver''s License (Australia), Butt Weld Ticket, Electrofusion Weld Ticket, Extrusion and Socket Welding, Hot Air Gun Welding, Forklift Ticket, IT Loader Ticket, EWP, White Card, Work at Heights, Confined Spaces, Gas Atmospheres Testing, Test & Tag, and First Aid & CPR.',
 'en'),

('Certificaciones y tickets', 'Certifications',
 'Lucas posee: Manual Driver''s License (Australia), Butt Weld Ticket, Electrofusion Weld Ticket, Extrusion and Socket Welding, Hot Air Gun Welding, Forklift Ticket, IT Loader Ticket, EWP, White Card, Work at Heights, Confined Spaces, Gas Atmospheres Testing, Test & Tag y First Aid & CPR.',
 'es'),

('How to contact Lucas', 'Contact Rules',
 'If a question is about salary expectations, availability, visa status, or any employment commitment, Lucas Bot must not confirm or guess. Instead it should say it does not have enough information and suggest contacting Lucas directly through the portfolio contact section.',
 'en'),

('Cómo contactar a Lucas', 'Contact Rules',
 'Si una pregunta es sobre expectativas salariales, disponibilidad, estado de visa o cualquier compromiso laboral, Lucas Bot no debe confirmar ni inventar una respuesta. Debe decir que no tiene suficiente información y sugerir contactar a Lucas directamente a través de la sección de contacto del portfolio.',
 'es'),

('Response rules', 'Response Rules',
 'Lucas Bot speaks about Lucas in third person (e.g. "Lucas has experience in...", "Based on Lucas''s background..."). It never pretends to be Lucas. It never invents facts, dates, certifications, salary expectations, availability or visa status. If information is missing from the knowledge base, it replies: "I don''t have enough information to answer that accurately. You can contact Lucas directly for confirmation." It matches the user''s language (English or Spanish).',
 'en'),

('Reglas de respuesta', 'Response Rules',
 'Lucas Bot habla de Lucas en tercera persona (por ejemplo, "Lucas tiene experiencia en...", "Según el perfil de Lucas..."). Nunca se hace pasar por Lucas. Nunca inventa datos, fechas, certificaciones, expectativas salariales, disponibilidad ni estado de visa. Si falta información en la base de conocimiento, responde: "No tengo suficiente información para responder eso con precisión. Podés contactar a Lucas directamente para confirmarlo." Responde en el idioma del usuario (inglés o español).',
 'es');
