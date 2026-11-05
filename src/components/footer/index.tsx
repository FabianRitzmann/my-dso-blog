import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './footer.module.css';

interface FooterProps {
  name: string;
  legalPath: string;
}

export default function Footer({name, legalPath}: FooterProps): ReactNode {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.top}
        href="#top"
        aria-label="Back to top"
        onClick={(event) => {
          // A sticky header as anchor target would not scroll anywhere, so scroll to the top directly.
          event.preventDefault();
          window.scrollTo({top: 0});
        }}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </a>
      <p className={styles.copy}>
        © {name} {new Date().getFullYear()}
      </p>
      <Link className={styles.legal} to={legalPath}>
        Legal notice
      </Link>
    </footer>
  );
}
