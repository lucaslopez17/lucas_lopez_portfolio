"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Languages,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { copy, type Locale, type PortfolioCopy } from "@/lib/portfolio-content";
import LucasBot from "@/components/lucas-bot";

type ThemeMode = "dark" | "light";
type ProfileSide = "engineering" | "field";

// Light mode is disabled for now — the site is dark-only. Flip this back to
// `true` to re-enable the theme toggle and let visitors switch to light mode.
const THEME_TOGGLE_ENABLED = false;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem("lucas-portfolio-locale");
  return stored === "es" ? "es" : "en";
}

function getInitialTheme(): ThemeMode {
  if (!THEME_TOGGLE_ENABLED) {
    return "dark";
  }

  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("lucas-portfolio-theme");
  return stored === "dark" ? "dark" : "light";
}

export default function PortfolioExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<ThemeMode>(THEME_TOGGLE_ENABLED ? "light" : "dark");
  const [activeProfileSide, setActiveProfileSide] = useState<ProfileSide | null>(null);
  const [hoverProfileSide, setHoverProfileSide] = useState<ProfileSide | null>(null);
  const t = copy[locale];

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

  function enterProfile(side: ProfileSide) {
    setActiveProfileSide(side);
  }

  function returnToOverview() {
    setActiveProfileSide(null);
  }

  return (
    <main className={`site-shell ${activeProfileSide ? `is-${activeProfileSide}-selected` : ""}`}>
      <AmbientSystem />
      <ControlDock locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} label={t.ui.language} />
      <Hero
        t={t}
        activeProfileSide={activeProfileSide}
        hoverProfileSide={hoverProfileSide}
        setHoverProfileSide={setHoverProfileSide}
        enterProfile={enterProfile}
        returnToOverview={returnToOverview}
      />
      <LanguagesSection t={t} />
      <ProjectsSection t={t} />
      <ContactSection t={t} />
      <LucasBot locale={locale} />
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
      {THEME_TOGGLE_ENABLED && (
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
      )}
    </div>
  );
}

function Hero({
  t,
  activeProfileSide,
  hoverProfileSide,
  setHoverProfileSide,
  enterProfile,
  returnToOverview,
}: {
  t: PortfolioCopy;
  activeProfileSide: ProfileSide | null;
  hoverProfileSide: ProfileSide | null;
  setHoverProfileSide: (side: ProfileSide | null) => void;
  enterProfile: (side: ProfileSide) => void;
  returnToOverview: () => void;
}) {
  const displayedProfileSide = activeProfileSide ?? hoverProfileSide;
  const softwareGroup = t.sections.skills.groups.find((group) => group.software);
  const fieldTickets = t.sections.education.certifications.filter((item) => !item.toLowerCase().includes("certificate iv"));
  const trackRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  function syncPortraitPosition(track: HTMLDivElement) {
    const portrait = portraitRef.current;
    if (!portrait) {
      return;
    }
    const progress = track.scrollLeft / Math.max(track.clientWidth, 1);
    const shift = (1 - progress) * track.clientWidth * 0.5;
    portrait.style.setProperty("--portrait-shift", `${shift}px`);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const trackElement = track;

    function centerTrack() {
      trackElement.scrollTo({ left: trackElement.clientWidth, behavior: "auto" });
      syncPortraitPosition(trackElement);
    }

    const frame = requestAnimationFrame(() => {
      centerTrack();
      window.setTimeout(centerTrack, 140);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function handleWindowScroll() {
      const track = trackRef.current;
      if (!track || window.scrollY < window.innerHeight * 0.72) {
        return;
      }

      const overviewLeft = track.clientWidth;
      if (Math.abs(track.scrollLeft - overviewLeft) > 8) {
        track.scrollTo({ left: overviewLeft, behavior: "smooth" });
      }

      if (activeProfileSide) {
        returnToOverview();
      }
    }

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [activeProfileSide, returnToOverview]);

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
    syncPortraitPosition(track);
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    const side = index === 0 ? "engineering" : index === 2 ? "field" : null;

    if (side && activeProfileSide !== side) {
      enterProfile(side);
    }

    if (!side && activeProfileSide) {
      returnToOverview();
    }
  }

  function handleTrackWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (window.innerWidth <= 640) {
      return;
    }

    if (event.deltaY <= 14 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    const target = event.target as Element;
    const contentScroller = target.closest(".split-panel-content") as HTMLElement | null;
    const contentCanScroll =
      contentScroller && contentScroller.scrollHeight > contentScroller.clientHeight + 8;
    const contentHasRoom =
      contentScroller &&
      contentScroller.scrollTop < contentScroller.scrollHeight - contentScroller.clientHeight - 10;

    if (contentCanScroll && contentHasRoom) {
      return;
    }

    event.preventDefault();
    scrollToPanel("overview");
    window.setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, activeProfileSide ? 220 : 0);
  }

  function ProfileCopy({ side }: { side: ProfileSide }) {
    const profile = t.sections.profiles[side];
    const isEngineering = side === "engineering";
    const profileExperience = t.sections.experience.items.filter((item) =>
      isEngineering
        ? ["planning-control", "documentation-cad", "quality-improvement"].includes(item.id)
        : ["shutdown-execution", "hdpe-systems", "fabrication-fitting"].includes(item.id),
    );
    const profileSkillGroups = t.sections.skills.groups.filter((group) =>
      isEngineering
        ? ["Management and Communication", "Gestión y Comunicación"].includes(group.title)
        : ["Polywelding", "Field Operations", "Operaciones de Campo", "Tools and Machines", "Herramientas y Máquinas"].includes(group.title),
    );

    return (
      <div className="profile-page-copy">
        <p className="section-eyebrow">{profile.eyebrow}</p>
        <h2>{profile.title}</h2>
        <p className="profile-intro">{profile.intro}</p>
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
    <section
      id="overview"
      className={`hero-section ${displayedProfileSide ? `is-${displayedProfileSide}-active` : ""} ${
        activeProfileSide ? `is-${activeProfileSide}-selected` : ""
      }`}
      aria-labelledby="hero-title"
    >
      <motion.div className="portrait-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {activeProfileSide ? (
          <button
            type="button"
            className={`overview-return-zone side-${activeProfileSide}`}
            onClick={() => scrollToPanel("overview")}
            aria-label={t.sections.profiles[activeProfileSide].back}
          />
        ) : null}
        <div className="continuous-portrait" aria-hidden="true">
          <div className="continuous-portrait-track" ref={portraitRef}>
            <Image
              src="/hero.png"
              alt="Lucas Lopez portrait split between engineering and field work"
              fill
              priority
              sizes="100vw"
              className="continuous-portrait-image"
            />
          </div>
        </div>
        <div
          className="split-scroll-track"
          ref={trackRef}
          onScroll={handleTrackScroll}
          onWheel={handleTrackWheel}
          aria-label="Horizontal profile navigation"
        >
          <section className="split-panel split-profile-panel engineering-page" aria-label={t.sections.profiles.engineering.title}>
            <div className="split-panel-content">
              <ProfileCopy side="engineering" />
            </div>
          </section>

          <section className="split-panel split-overview-panel" aria-labelledby="hero-title">
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
          </section>

          <section className="split-panel split-profile-panel field-page" aria-label={t.sections.profiles.field.title}>
            <div className="split-panel-content">
              <ProfileCopy side="field" />
            </div>
          </section>
        </div>
      </motion.div>
    </section>
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
