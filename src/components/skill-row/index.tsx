import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/portfolio';
import styles from './skill-row.module.css';

interface SkillRowProps {
  skill: Skill;
}

/** Mobile: Icon und Name links, "How I used this skill" als Liste rechts. */
export default function SkillRow({skill}: SkillRowProps): ReactNode {
  const iconUrl = useBaseUrl(skill.icon);

  return (
    <div className={styles.row}>
      <div className={styles.skill}>
        <img className={styles.icon} src={iconUrl} alt="" width={56} height={56} />
        <span className={styles.label}>{skill.label}</span>
      </div>
      <ul className={styles.list} aria-label={`How I used ${skill.label}`}>
        {skill.usage.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
