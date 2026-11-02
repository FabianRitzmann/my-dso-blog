import {useRef, useState} from 'react';
import type {CSSProperties, ReactNode} from 'react';
import SkillCard from '@site/src/components/skill-card';
import SkillRow from '@site/src/components/skill-row';
import type {Skill} from '@site/src/data/portfolio';
import styles from './my-skills.module.css';

interface MySkillsProps {
  skills: Skill[];
}

const PAGE_SIZE = 3;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

// Desktop: max. 3 skills per row, 2 or 3 columns depending on the number of skills.
function columnsFor(count: number): number {
  if (count <= 3) {
    return Math.max(count, 1);
  }
  return count === 4 ? 2 : 3;
}

export default function MySkills({skills}: MySkillsProps): ReactNode {
  const pages = chunk(skills, PAGE_SIZE);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Abstand von einem Slide zum nächsten (Slide-Breite + Lücke), damit auch ein sichtbarer Rand des nächsten Slides stimmt.
  const stepOf = (track: HTMLDivElement): number => {
    const [first, second] = Array.from(track.children) as HTMLElement[];
    return first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
  };

  const handleScroll = (): void => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) {
      return;
    }
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    setActive(atEnd ? pages.length - 1 : Math.round(track.scrollLeft / stepOf(track)));
  };

  const goTo = (index: number): void => {
    const track = trackRef.current;
    if (track) {
      track.scrollTo({left: index * stepOf(track), behavior: 'smooth'});
    }
  };

  return (
    <section className={styles.section} id="skills">
      <div className={styles.inner}>
        <h2 className={styles.heading}>My skills</h2>
        {/* Desktop: Grid mit Flip-Karten */}
        <div className={styles.grid} style={{'--cols': columnsFor(skills.length)} as CSSProperties}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Mobile: wischbarer Slider, 3 Skills pro Karte */}
        <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className={styles.slide}>
              {page.map((skill) => (
                <SkillRow key={skill.id} skill={skill} />
              ))}
            </div>
          ))}
        </div>
        {pages.length > 1 ? (
          <div className={styles.dots}>
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                aria-label={`Skills page ${index + 1} of ${pages.length}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
