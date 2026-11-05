import type {ReactNode} from 'react';
import styles from './contact.module.css';

interface ContactProps {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const REQUESTED_INFO: string[] = [
  'What role are you looking for?',
  'How could I contribute to your team?',
  'Is the position remote, on-site or hybrid, and where is it located?',
  'How would you like to continue, e.g. a call or an interview?',
];

function MailIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6.5" width="16" height="11" rx="1.5" />
      <path d="M4.5 7.5l7.5 6 7.5-6" />
    </svg>
  );
}

function LinkedinIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10.5V17M7 7.5v.01M11 17v-6.5M11 13c0-1.7 1.2-2.5 2.5-2.5S16 11.300 16 13v4" />
    </svg>
  );
}

function GithubIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function toAbsoluteUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function Contact({email, linkedinUrl, githubUrl}: ContactProps): ReactNode {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>Contact me</h2>
          <p className={styles.text}>
            Feel free to reach out about job offers or other opportunities. To help me get back to
            you quickly, please include:
          </p>
          <ul className={styles.list}>
            {REQUESTED_INFO.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <ul className={styles.links}>
            {email ? (
              <li>
                <span className={styles.icon}>
                  <MailIcon />
                </span>
                <a className={styles.mail} href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            ) : null}
            {linkedinUrl ? (
              <li>
                <span className={styles.icon}>
                  <LinkedinIcon />
                </span>
                <a className={styles.profile} href={toAbsoluteUrl(linkedinUrl)} target="_blank" rel="noopener noreferrer">
                  Profile on LinkedIn
                </a>
              </li>
            ) : null}
            {githubUrl ? (
              <li>
                <span className={styles.icon}>
                  <GithubIcon />
                </span>
                <a className={styles.profile} href={toAbsoluteUrl(githubUrl)} target="_blank" rel="noopener noreferrer">
                  Profile on GitHub
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
