import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Button from '@site/src/components/button';
import styles from './hero.module.css';

interface HeroProps {
  name: string;
  subtitle: string;
  intro: string;
  photo: string;
  photoMobile?: string;
}

export default function Hero({name, subtitle, intro, photo, photoMobile}: HeroProps): ReactNode {
  const photoUrl = useBaseUrl(photo);
  const photoMobileUrl = useBaseUrl(photoMobile ?? photo);

  // DOM order = mobile order: greeting, name, subtitle, photo, intro, button.
  // On desktop the grid areas put the photo to the right of the text.
  return (
    <section className={styles.hero} id="about">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.greeting}>Hey there 👋 I am</p>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <picture className={styles.picture}>
          <source media="(max-width: 800px)" srcSet={photoMobileUrl} />
          <img className={styles.photo} src={photoUrl} alt={`Portrait of ${name}`} width={441} height={441} />
        </picture>
        <div className={styles.body}>
          <p className={styles.intro}>{intro}</p>
          <Button href="#contact">Contact me</Button>
        </div>
      </div>
    </section>
  );
}
