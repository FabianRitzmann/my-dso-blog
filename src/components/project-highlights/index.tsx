import {useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import ProjectCard from '@site/src/components/project-card';
import {MAX_HIGHLIGHTS_DESKTOP, MAX_HIGHLIGHTS_MOBILE} from '@site/src/data/portfolio';
import type {Project, Skill} from '@site/src/data/portfolio';
import styles from './project-highlights.module.css';

interface ProjectHighlightsProps {
  projects: Project[];
  skills: Skill[];
  moreProjectsPath: string;
  githubProfileUrl?: string;
  /** {projekt-id: repo-url}, kommt aus customFields.githubProjectUrls. */
  githubProjectUrls?: Record<string, string>;
}

/** Eigener Link des Projekts, sonst Fallback auf das GitHub-Profil. */
function getGithubUrl(
  project: Project,
  projectUrls: Record<string, string>,
  profileUrl?: string,
): string | undefined {
  return projectUrls[project.id] ?? profileUrl;
}

export default function ProjectHighlights({
  projects,
  skills,
  moreProjectsPath,
  githubProfileUrl,
  githubProjectUrls = {},
}: ProjectHighlightsProps): ReactNode {
  const highlights = projects.slice(0, MAX_HIGHLIGHTS_DESKTOP);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <h2 className={styles.heading}>My project highlights</h2>

        <div className={styles.layout}>
          {/* Liste links: nur auf Desktop sichtbar */}
          <ol className={styles.tabs} aria-label="Projects">
            {highlights.map((project, index) => (
              <li key={project.id}>
                <button
                  type="button"
                  className={clsx(styles.tab, index === activeIndex && styles.tabActive)}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}>
                  {index + 1}. {project.title}
                </button>
              </li>
            ))}
          </ol>

          {/* Karten: auf Mobile alle untereinander, auf Desktop nur die aktive */}
          <ol className={styles.cards}>
            {highlights.map((project, index) => (
              <li
                key={project.id}
                className={clsx(
                  styles.cardItem,
                  index === activeIndex && styles.cardItemActive,
                  index >= MAX_HIGHLIGHTS_MOBILE && styles.desktopOnly,
                )}>
                <ProjectCard
                  project={project}
                  index={index}
                  skills={skills.filter((skill) => project.skillIds.includes(skill.id))}
                  githubUrl={getGithubUrl(project, githubProjectUrls, githubProfileUrl)}
                />
              </li>
            ))}
          </ol>

          <Link className={styles.more} to={moreProjectsPath}>
            <span aria-hidden="true">↳ </span>see more projects
          </Link>
        </div>
      </div>
    </section>
  );
}
