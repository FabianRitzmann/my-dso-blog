import type {ReactNode} from 'react';
import type {NavItem} from '@site/src/data/portfolio';
import styles from './header.module.css';

interface HeaderProps {
  navItems: NavItem[];
}

export default function Header({navItems}: HeaderProps): ReactNode {
  return (
    <header className={styles.header} id="top">
      <nav className={styles.nav} aria-label="Portfolio sections">
        {navItems.map((item) => (
          <a key={item.href} className={styles.link} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
