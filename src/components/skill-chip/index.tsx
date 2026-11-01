import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/portfolio';
import styles from './skill-chip.module.css';

interface SkillChipProps {
  skill: Skill;
}

export default function SkillChip({skill}: SkillChipProps): ReactNode {
  const iconUrl = useBaseUrl(skill.icon);

  return (
    <li className={styles.chip}>
      <img className={styles.icon} src={iconUrl} alt="" width={22} height={22} />
      <span className={styles.label}>{skill.label}</span>
    </li>
  );
}
