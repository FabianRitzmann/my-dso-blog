import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Button from '@site/src/components/button';
import SkillChip from '@site/src/components/skill-chip';
import type {Project, Skill} from '@site/src/data/portfolio';
import styles from './project-card.module.css';

interface ProjectCardProps {
  project: Project;
  skills: Skill[];
  githubUrl?: string;
}

export default function ProjectCard({project, skills, githubUrl}: ProjectCardProps): ReactNode {
  const imageUrl = useBaseUrl(project.image);

  return (
    <article className={styles.card} aria-live="polite">
      <div className={styles.top}>
        <h3 className={styles.title}>{project.title}</h3>
        <ul className={styles.chips} aria-label="Skills used in this project">
          {skills.map((skill) => (
            <SkillChip key={skill.id} skill={skill} />
          ))}
        </ul>
      </div>
      <div className={styles.body}>
        <img className={styles.image} src={imageUrl} alt={`${project.title} preview`} width={640} height={400} />
        <div className={styles.text}>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.actions}>
            <Button href={project.docPath} variant="solid">
              Documentation
            </Button>
            {githubUrl ? (
              <Button href={githubUrl} variant="outline" external>
                GitHub
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
