import {useEffect, useRef, useState} from 'react';
import type {KeyboardEvent, ReactNode} from 'react';
import type {NavItem} from '@site/src/data/portfolio';
import styles from './header.module.css';

interface HeaderProps {
  navItems: NavItem[];
}

const SCROLL_THRESHOLD = 6;
const SHOW_ALWAYS_BELOW = 80;

function BurgerIcon({open}: {open: boolean}): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function Header({navItems}: HeaderProps): ReactNode {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Hide the header while scrolling down, show it again when scrolling up.
  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const update = (): void => {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY.current;
      if (y <= SHOW_ALWAYS_BELOW) {
        setHidden(false);
        lastY.current = y;
      } else if (Math.abs(delta) > SCROLL_THRESHOLD) {
        if (delta > 0) {
          setHidden(true);
          setOpen(false);
        } else {
          setHidden(false);
        }
        lastY.current = y;
      }
      ticking = false;
    };

    const onScroll = (): void => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <header
      className={`${styles.header} ${hidden ? styles.hidden : ''}`}
      onKeyDown={handleKeyDown}
      onFocus={() => setHidden(false)}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Portfolio sections">
          {navItems.map((item) => (
            <a key={item.href} className={styles.link} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}>
          <BurgerIcon open={open} />
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" className={styles.menu} aria-label="Mobile menu">
          {navItems.map((item) => (
            <a key={item.href} className={styles.menuLink} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
