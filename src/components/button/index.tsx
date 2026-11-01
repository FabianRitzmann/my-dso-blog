import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './button.module.css';

interface ButtonProps {
  href: string;
  variant?: 'light' | 'solid' | 'outline';
  external?: boolean;
  children: ReactNode;
}

export default function Button({
  href,
  variant = 'light',
  external = false,
  children,
}: ButtonProps): ReactNode {
  const className = `${styles.button} ${styles[variant]}`;

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith('#')) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}
