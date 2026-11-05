import {useRef, useState} from 'react';
import type {FocusEvent, KeyboardEvent, ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/portfolio';
import styles from './skill-card.module.css';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({skill}: SkillCardProps): ReactNode {
  const [flipped, setFlipped] = useState(false);
  const lastInput = useRef<string>('mouse');
  const iconUrl = useBaseUrl(skill.icon);
  const backId = `skill-usage-${skill.id}`;

  // Mouse users flip by hovering; touch and keyboard users flip by clicking or pressing Enter.
  const handleToggle = (): void => {
    if (lastInput.current !== 'mouse') {
      setFlipped((value) => !value);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFlipped(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    lastInput.current = 'keyboard';
    if (event.key === 'Escape') {
      setFlipped(false);
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${flipped ? styles.flipped : ''}`}
      onPointerDown={(event) => {
        lastInput.current = event.pointerType;
      }}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setFlipped(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setFlipped(false)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}>
      <div className={styles.inner}>
        <button
          type="button"
          className={`${styles.face} ${styles.front}`}
          aria-expanded={flipped}
          aria-controls={backId}
          onClick={handleToggle}>
          <img className={styles.icon} src={iconUrl} alt="" width={56} height={56} />
          <span className={styles.label}>{skill.label}</span>
        </button>
        <div
          id={backId}
          className={`${styles.face} ${styles.back}`}
          aria-hidden={!flipped}
          onClick={handleToggle}>
          <h3 className={styles.backTitle}>How I used this skill</h3>
          <ul className={styles.list}>
            {skill.usage.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}