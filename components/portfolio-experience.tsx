"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Factory,
  FileText,
  Flame,
  Hammer,
  Languages,
  Mail,
  MapPin,
  Moon,
  Pickaxe,
  Phone,
  Sun,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { copy, type ExpertiseNode, type Locale, type PortfolioCopy } from "@/lib/portfolio-content";

type ThemeMode = "dark" | "light";
type ProfileSide = "engineering" | "field";

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
  const [activeProfileSide, setActiveProfileSide] = useState<ProfileSide | null>(null);
  const [hoverProfileSide, setHoverProfileSide] = useState<ProfileSide | null>(null);
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

  function enterProfile(side: ProfileSide) {
    setActiveProfileSide(side);
  }

  function returnToOverview() {
    setActiveProfileSide(null);
  }

  return (
    <main className="site-shell" onPointerMove={handlePointerMove}>
      <AmbientSystem />
      <ControlDock locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} label={t.ui.language} />
      <Hero
        t={t}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        activeProfileSide={activeProfileSide}
        hoverProfileSide={hoverProfileSide}
        setHoverProfileSide={setHoverProfileSide}
        enterProfile={enterProfile}
        returnToOverview={returnToOverview}
        portraitX={portraitX}
        portraitY={portraitY}
      />
      <LanguagesSection t={t} />
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
  activeProfileSide,
  hoverProfileSide,
  setHoverProfileSide,
  enterProfile,
  returnToOverview,
  portraitX,
  portraitY,
}: {
  t: PortfolioCopy;
  activeNode: ExpertiseNode | null;
  setActiveNode: (node: ExpertiseNode | null) => void;
  activeProfileSide: ProfileSide | null;
  hoverProfileSide: ProfileSide | null;
  setHoverProfileSide: (side: ProfileSide | null) => void;
  enterProfile: (side: ProfileSide) => void;
  returnToOverview: () => void;
  portraitX: ReturnType<typeof useTransform<number, number>>;
  portraitY: ReturnType<typeof useTransform<number, number>>;
}) {
  const nodes = t.sections.identity.nodes;
  const displayedProfileSide = activeProfileSide ?? hoverProfileSide;
  const softwareGroup = t.sections.skills.groups.find((group) => group.software);
  const fieldTickets = t.sections.education.certifications.filter((item) => !item.toLowerCase().includes("certificate iv"));
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    requestAnimationFrame(() => {
      track.scrollTo({ left: track.clientWidth, behavior: "auto" });
    });
  }, []);

  function scrollToPanel(panel: "engineering" | "overview" | "field") {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const index = panel === "engineering" ? 0 : panel === "overview" ? 1 : 2;
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });

    if (panel === "overview") {
      returnToOverview();
    } else {
      enterProfile(panel);
    }
  }

  function handleTrackScroll(event: React.UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    const side = index === 0 ? "engineering" : index === 2 ? "field" : null;

    if (side && activeProfileSide !== side) {
      enterProfile(side);
    }

    if (!side && activeProfileSide) {
      returnToOverview();
    }
  }

  function ProfileCopy({ side }: { side: ProfileSide }) {
    const profile = t.sections.profiles[side];
    const isEngineering = side === "engineering";
    const profileNodes = nodes.filter((node) => (isEngineering ? node.side !== "field" : node.side === "field"));
    const profileExperience = t.sections.experience.items.filter((item) =>
      isEngineering
        ? ["planning-control", "documentation-cad", "quality-improvement"].includes(item.id)
        : ["shutdown-execution", "hdpe-systems", "fabrication-fitting"].includes(item.id),
    );
    const profileSkillGroups = t.sections.skills.groups.filter((group) =>
      isEngineering
        ? ["Engineering", "Ingeniería", "Management and Communication", "Gestión y Comunicación"].includes(group.title)
        : ["Polywelding", "Field Operations", "Operaciones de Campo", "Tools and Machines", "Herramientas y Máquinas"].includes(group.title),
    );

    return (
      <div className="profile-page-copy">
        <button className="back-overview" type="button" onClick={() => scrollToPanel("overview")}>
          {profile.back}
        </button>
        <p className="section-eyebrow">{profile.eyebrow}</p>
        <h2>{profile.title}</h2>
        <p className="profile-intro">{profile.intro}</p>
        <div className="profile-mini-grid" aria-label={profile.pointsTitle}>
          {profileNodes.map((node) => (
            <article className={`profile-mini-card ${node.side}`} key={node.id}>
              <strong>{node.label}</strong>
              <span>{node.summary}</span>
            </article>
          ))}
        </div>
        <div className="profile-page-columns">
          <div className="profile-points" aria-label={profile.pointsTitle}>
            <h3>{profile.pointsTitle}</h3>
            <div>
              {profile.points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>
          {isEngineering ? (
            <div className="mode-list-block learning-block">
              <h3>{t.sections.education.title}</h3>
              <div className="profile-learning-list">
                {t.sections.education.items.map((item) => (
                  <span key={`${item.title}-${item.institution}`}>
                    <strong>{item.title}</strong>
                    <small>{item.institution}</small>
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {isEngineering && softwareGroup?.software ? (
            <div className="mode-list-block">
              <h3>{softwareGroup.title}</h3>
              <div className="software-list compact">
                {softwareGroup.software.map((item) => (
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
            </div>
          ) : null}
          {!isEngineering ? (
            <div className="mode-list-block">
              <h3>Tickets</h3>
              <div className="ticket-list">
                {fieldTickets.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="profile-skill-matrix">
          {profileSkillGroups.map((group) => (
            <article className="profile-skill-card" key={group.title}>
              <h3>{group.title}</h3>
              {group.software ? (
                <div className="software-list compact">
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
            </article>
          ))}
        </div>
        <div className="profile-experience-strip">
          {profileExperience.map((item) => (
            <article key={item.id}>
              <strong>{item.role}</strong>
              <span>{item.focus}</span>
              <small>{item.achievements[0]}</small>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="overview" className={`hero-section ${displayedProfileSide ? `is-${displayedProfileSide}-active` : ""}`} aria-labelledby="hero-title">
      <motion.div className="portrait-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="split-scroll-track" ref={trackRef} onScroll={handleTrackScroll} aria-label="Horizontal profile navigation">
          <section className="split-panel split-profile-panel engineering-page" aria-label={t.sections.profiles.engineering.title}>
            <div className="split-panel-content">
              <ProfileCopy side="engineering" />
            </div>
            <div className="split-panel-portrait portrait-at-right" aria-hidden="true">
              <Image src="/hero.png" alt="" fill priority sizes="48vw" className="split-panel-image engineering-image" />
              <span className="split-edge" />
            </div>
          </section>

          <section className="split-panel split-overview-panel" aria-labelledby="hero-title">
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
                <div className="face-hotspots" aria-label="Split portrait navigation">
                  <button
                    className="face-hotspot face-hotspot-engineering"
                    type="button"
                    aria-label={t.sections.profiles.engineering.title}
                    onPointerEnter={() => setHoverProfileSide("engineering")}
                    onPointerLeave={() => setHoverProfileSide(null)}
                    onFocus={() => setHoverProfileSide("engineering")}
                    onBlur={() => setHoverProfileSide(null)}
                    onClick={() => scrollToPanel("engineering")}
                  />
                  <button
                    className="face-hotspot face-hotspot-field"
                    type="button"
                    aria-label={t.sections.profiles.field.title}
                    onPointerEnter={() => setHoverProfileSide("field")}
                    onPointerLeave={() => setHoverProfileSide(null)}
                    onFocus={() => setHoverProfileSide("field")}
                    onBlur={() => setHoverProfileSide(null)}
                    onClick={() => scrollToPanel("field")}
                  />
                </div>
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
                const isEngineeringRelevant = node.side === "engineering" || node.side === "bridge";
                const isProfileRelevant =
                  displayedProfileSide === "engineering" ? isEngineeringRelevant : displayedProfileSide === "field" ? node.side === "field" : false;
                return (
                  <motion.button
                    key={node.id}
                    className={`skill-orb skill-orb-${index + 1} ${activeNode?.id === node.id ? "is-open" : ""} ${
                      isProfileRelevant ? "is-profile-highlighted" : displayedProfileSide ? "is-profile-dimmed" : ""
                    }`}
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
          </section>

          <section className="split-panel split-profile-panel field-page" aria-label={t.sections.profiles.field.title}>
            <div className="split-panel-portrait portrait-at-left" aria-hidden="true">
              <Image src="/hero.png" alt="" fill priority sizes="48vw" className="split-panel-image field-image" />
              <span className="split-edge" />
            </div>
            <div className="split-panel-content">
              <ProfileCopy side="field" />
            </div>
          </section>
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

function LanguagesSection({ t }: { t: PortfolioCopy }) {
  const title = t.sections.education.languages[0]?.startsWith("Español") ? "Idiomas" : "Languages";

  return (
    <SectionFrame id="languages" eyebrow={t.sections.education.eyebrow} title={title}>
      <div className="credential-grid languages-only">
        <CredentialBlock title={title} icon={<Languages size={18} />} items={t.sections.education.languages} />
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
    <section id="contact" className="contact-band" aria-labelledby="contact-title">
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
