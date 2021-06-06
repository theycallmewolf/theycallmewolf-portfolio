import { useRouter } from 'next/router';

import { useNav } from '../../../../../hooks/useNav';
import styles from './styles.module.scss';

interface NavLinkProps {
  href: string;
  label: string;
}
export function NavLink({ href, label }: NavLinkProps): JSX.Element {
  const router = useRouter();
  const { toggleNav } = useNav();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(href);
    toggleNav();
  };

  return (
    <a
      href={href}
      className={`${styles.link} ${router.pathname === href && styles.active}`}
      onClick={handleClick}>
      {label}
    </a>
  );
}