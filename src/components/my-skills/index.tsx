import type {ReactNode} from 'react';
import SkillCard from '@site/src/components/skill-card';
import type {Skill} from '@site/src/data/portfolio';
import styles from './my-skills.module.css';

interface MySkillsProps {
  skills: Skill[];
}

export default function MySkills({skills}: MySkillsProps): ReactNode {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.inner}>
        <h2 className={styles.heading}>My skills</h2>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
