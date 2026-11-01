import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Button from '@site/src/components/button';
import styles from './hero.module.css';

interface HeroProps {
  name: string;
  subtitle: string;
  intro: string;
  photo: string;
}

export default function Hero({name, subtitle, intro, photo}: HeroProps): ReactNode {
  const photoUrl = useBaseUrl(photo);

  return (
    <section className={styles.hero} id="about">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.greeting}>Hey there 👋 I am</p>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.intro}>{intro}</p>
          <Button href="#contact">Contact me</Button>
        </div>
        <img className={styles.photo} src={photoUrl} alt={`Portrait of ${name}`} width={300} height={400} />
      </div>
    </section>
  );
}
