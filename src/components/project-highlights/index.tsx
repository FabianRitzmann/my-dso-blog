import {useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ProjectCard from '@site/src/components/project-card';
import type {Project, Skill} from '@site/src/data/portfolio';
import styles from './project-highlights.module.css';

interface ProjectHighlightsProps {
  projects: Project[];
  skills: Skill[];
  moreProjectsPath: string;
  githubProfileUrl?: string;
}

export default function ProjectHighlights({
  projects,
  skills,
  moreProjectsPath,
  githubProfileUrl,
}: ProjectHighlightsProps): ReactNode {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const projectSkills = skills.filter((skill) => project.skillIds.includes(skill.id));
  const githubUrl =
    githubProfileUrl && project.repoName ? `${githubProfileUrl}/${project.repoName}` : githubProfileUrl;

  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <h2 className={styles.heading}>My project highlights</h2>
        <div className={styles.layout}>
          <nav aria-label="Projects">
            <ol className={styles.list}>
              {projects.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className={`${styles.item} ${index === selected ? styles.active : ''}`}
                    aria-current={index === selected ? 'true' : undefined}
                    onClick={() => setSelected(index)}>
                    {index + 1}. {item.title}
                  </button>
                </li>
              ))}
            </ol>
            <Link className={styles.more} to={moreProjectsPath}>
              <span aria-hidden="true">↳ </span>see more projects
            </Link>
          </nav>
          <ProjectCard project={project} skills={projectSkills} githubUrl={githubUrl} />
        </div>
      </div>
    </section>
  );
}
