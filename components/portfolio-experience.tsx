"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Factory,
  FileText,
  Flame,
  GraduationCap,
  Hammer,
  Languages,
  Mail,
  MapPin,
  Moon,
  Pickaxe,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { copy, type Experience, type ExpertiseNode, type Locale, type PortfolioCopy } from "@/lib/portfolio-content";

type ThemeMode = "dark" | "light";

const expertiseIcons: Record<string, LucideIcon> = {
  "industrial-engineering": Factory,
  "maintenance-planning": Wrench,
  polywelding: Flame,
  "mining-operations": Pickaxe,
  "technical-documentation": FileText,
  fabrication: Hammer,
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem("lucas-portfolio-locale");
  return stored === "es" ? "es" : "en";
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("lucas-portfolio-theme");
  return stored === "dark" ? "dark" : "light";
}

export default function PortfolioExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeNode, setActiveNode] = useState<ExpertiseNode | null>(null);
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const t = copy[locale];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 24 });
  const portraitX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    setLocale(getInitialLocale());
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("lucas-portfolio-locale", locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("lucas-portfolio-theme", theme);
  }, [theme]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <main className="site-shell" onPointerMove={handlePointerMove}>
      <AmbientSystem />
      <ControlDock locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} label={t.ui.language} />
      <Hero
        t={t}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        portraitX={portraitX}
        portraitY={portraitY}
      />
      <IdentitySection t={t} activeNode={activeNode} setActiveNode={setActiveNode} />
      <ExperienceSection t={t} activeExperience={activeExperience} setActiveExperience={setActiveExperience} />
      <SkillsSection t={t} />
      <EducationSection t={t} />
      <ProjectsSection t={t} />
      <ContactSection t={t} />
    </main>
  );
}

function ControlDock({
  locale,
  setLocale,
  theme,
  setTheme,
  label,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  label: string;
}) {
  return (
    <div className="control-dock" aria-label={`${label} and theme controls`}>
      <div className="control-group">
        <span>{label}</span>
        <div className="language-switch">
        {(["en", "es"] as Locale[]).map((option) => (
          <button
            key={option}
            className={locale === option ? "is-active glitch-chip" : "glitch-chip"}
            onClick={() => setLocale(option)}
            type="button"
            aria-pressed={locale === option}
          >
            {option.toUpperCase()}
          </button>
        ))}
        </div>
      </div>
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={theme === "dark"}
      >
        {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </div>
  );
}

function Hero({
  t,
  activeNode,
  setActiveNode,
  portraitX,
  portraitY,
}: {
  t: PortfolioCopy;
  activeNode: ExpertiseNode | null;
  setActiveNode: (node: ExpertiseNode | null) => void;
  portraitX: ReturnType<typeof useTransform<number, number>>;
  portraitY: ReturnType<typeof useTransform<number, number>>;
}) {
  const nodes = t.sections.identity.nodes;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <motion.div
        className="portrait-stage"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <NetworkLines />
        <motion.div className="portrait-orbit" style={{ x: portraitX, y: portraitY }}>
          <div className="portrait-halo" />
          <div className="portrait-frame">
            <Image
              src="/hero.png"
              alt="Lucas Lopez portrait split between engineering and field work"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 58vw"
              className="portrait-image"
            />
            <span className="split-axis" />
            <span className="scanline" />
          </div>
        </motion.div>

        <div className="hero-copy">
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {t.hero.roles[0]}
          </motion.p>
          <motion.h1
            id="hero-title"
            className="glitch-title"
            data-text={t.hero.name.toUpperCase()}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {t.hero.name}
          </motion.h1>
          <motion.p className="hero-role" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {t.hero.roles[1]}
          </motion.p>
          <motion.p className="hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
            {t.hero.tagline}
          </motion.p>
        </div>

        <div className="floating-nav" aria-label="Expertise navigation">
          {nodes.map((node, index) => {
            const Icon = expertiseIcons[node.id] ?? Factory;
            return (
              <motion.button
                key={node.id}
                className={`skill-orb skill-orb-${index + 1} ${activeNode?.id === node.id ? "is-open" : ""}`}
                type="button"
                onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
                aria-expanded={activeNode?.id === node.id}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.05 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="orb-heading">
                  <Icon size={18} aria-hidden="true" />
                  <span>{node.label}</span>
                </span>
                <AnimatePresence>
                  {activeNode?.id === node.id ? (
                    <motion.span
                      className="orb-expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <span>{node.summary}</span>
                      <small>{node.details[0]}</small>
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}

function NetworkLines() {
  return (
    <svg className="network-lines" viewBox="0 0 1000 700" aria-hidden="true">
      <path d="M140 260 C310 190 370 250 500 340 S760 445 880 300" />
      <path d="M110 470 C300 360 390 520 520 360 S740 180 905 450" />
      <path d="M500 88 L500 630" />
      <circle cx="140" cy="260" r="5" />
      <circle cx="880" cy="300" r="5" />
      <circle cx="110" cy="470" r="5" />
      <circle cx="905" cy="450" r="5" />
    </svg>
  );
}

function IdentitySection({
  t,
  activeNode,
  setActiveNode,
}: {
  t: PortfolioCopy;
  activeNode: ExpertiseNode | null;
  setActiveNode: (node: ExpertiseNode | null) => void;
}) {
  return (
    <SectionFrame id="identity" eyebrow={t.sections.identity.eyebrow} title={t.sections.identity.title} intro={t.sections.identity.intro}>
      <div className="identity-grid">
        {t.sections.identity.nodes.map((node, index) => (
          <motion.button
            type="button"
            key={node.id}
            className={`identity-node ${node.side} ${activeNode?.id === node.id ? "is-open" : ""}`}
            onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
            aria-expanded={activeNode?.id === node.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.04 }}
          >
            <span className="node-index">0{index + 1}</span>
            <strong>{node.label}</strong>
            <span className="node-summary">{node.summary}</span>
            <AnimatePresence>
              {activeNode?.id === node.id ? (
                <motion.span
                  className="identity-expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {node.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </SectionFrame>
  );
}

function ExperienceSection({
  t,
  activeExperience,
  setActiveExperience,
}: {
  t: PortfolioCopy;
  activeExperience: Experience | null;
  setActiveExperience: (item: Experience | null) => void;
}) {
  const first = t.sections.experience.items[0];
  const selected = activeExperience ?? first;

  return (
    <SectionFrame
      id="experience"
      eyebrow={t.sections.experience.eyebrow}
      title={t.sections.experience.title}
      intro={t.sections.experience.intro}
    >
      <div className="experience-console">
        <div className="experience-map" aria-label={t.sections.experience.title}>
          {t.sections.experience.items.map((item, index) => {
            const isOpen = activeExperience?.id === item.id;

            return (
              <div className="experience-node-wrap" key={item.id}>
                <button
                  type="button"
                  className={isOpen ? "experience-node is-active" : "experience-node"}
                  onClick={() => setActiveExperience(isOpen ? null : item)}
                  aria-expanded={isOpen}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.role}</strong>
                  <small>{item.focus}</small>
                </button>
                <AnimatePresence>
                  {isOpen ? (
                    <motion.article
                      className="experience-inline"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <ExperienceDetailBody t={t} selected={item} />
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            className="experience-detail"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
          >
            <ExperienceDetailBody t={t} selected={selected} />
          </motion.article>
        </AnimatePresence>
      </div>
    </SectionFrame>
  );
}

function ExperienceDetailBody({ t, selected }: { t: PortfolioCopy; selected: Experience }) {
  return (
    <>
      <div>
        <span className="detail-chip">{selected.focus}</span>
      </div>
      <h3>{selected.role}</h3>
      <div className="detail-columns">
        <div>
          <h4>{t.sections.experience.scopeLabel}</h4>
          <ul>
            {selected.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.sections.experience.signalsLabel}</h4>
          <ul>
            {selected.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function SkillsSection({ t }: { t: PortfolioCopy }) {
  return (
    <SectionFrame id="skills" eyebrow={t.sections.skills.eyebrow} title={t.sections.skills.title}>
      <div className="skills-grid">
        {t.sections.skills.groups.map((group, index) => (
          <motion.article
            className="skill-panel"
            key={group.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ delay: index * 0.035 }}
          >
            <div className="panel-topline">
              <Sparkles size={16} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{group.title}</h3>
            {group.software ? (
              <div className="software-list" aria-label={`${group.title} - ${t.sections.skills.levelLabel}`}>
                {group.software.map((item) => (
                  <div className="software-row" key={item.name}>
                    <div className="software-row-header">
                      <strong>{item.name}</strong>
                      <small>{item.note}</small>
                    </div>
                    <div className="software-meter" aria-label={`${item.name}: ${item.level}%`}>
                      <span style={{ width: `${item.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="skill-tags">
                {(group.skills ?? []).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}

function EducationSection({ t }: { t: PortfolioCopy }) {
  return (
    <SectionFrame id="education" eyebrow={t.sections.education.eyebrow} title={t.sections.education.title}>
      <div className="education-layout">
        <div className="education-stack">
          {t.sections.education.items.map((item) => (
            <article key={`${item.title}-${item.institution}`} className="education-item">
              <GraduationCap size={20} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.institution}</p>
                <span>{item.detail}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="credential-grid">
          <CredentialBlock title="Certifications" icon={<ShieldCheck size={18} />} items={t.sections.education.certifications} />
          <CredentialBlock title="Languages" icon={<Languages size={18} />} items={t.sections.education.languages} />
        </div>
      </div>
    </SectionFrame>
  );
}

function CredentialBlock({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <article className="credential-block">
      <h3>
        {icon}
        {title}
      </h3>
      <div>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function ProjectsSection({ t }: { t: PortfolioCopy }) {
  return (
    <SectionFrame id="projects" eyebrow={t.sections.projects.eyebrow} title={t.sections.projects.title}>
      <div className="project-track">
        {t.sections.projects.items.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.04 }}
          >
            <span>PX-{String(index + 1).padStart(2, "0")}</span>
            <h3>{project.title}</h3>
            <p>{project.context}</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}

function ContactSection({ t }: { t: PortfolioCopy }) {
  return (
    <section className="contact-band" aria-labelledby="contact-title">
      <div>
        <p className="section-eyebrow">Contact</p>
        <h2 id="contact-title">{t.sections.contact.title}</h2>
        <p>{t.sections.contact.body}</p>
      </div>
      <div className="contact-actions">
        <a href={`mailto:${t.sections.contact.email}`}>
          <Mail size={18} />
          {t.sections.contact.email}
        </a>
        <a href={`tel:${t.sections.contact.phone.replace(/\s/g, "")}`}>
          <Phone size={18} />
          {t.sections.contact.phone}
        </a>
        <span>
          <MapPin size={18} />
          {t.sections.contact.location}
        </span>
      </div>
    </section>
  );
}

function SectionFrame({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-frame" id={id} aria-labelledby={`${id}-title`}>
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}

function AmbientSystem() {
  const dots = useMemo(() => Array.from({ length: 34 }, (_, index) => index), []);

  return (
    <div className="ambient-system" aria-hidden="true">
      <div className="blueprint-grid" />
      <div className="noise-layer" />
      <div className="data-dots">
        {dots.map((dot) => (
          <span key={dot} style={{ "--i": dot } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
