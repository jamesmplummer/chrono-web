import { Link } from 'react-router';
import type { WithClassName } from '../../types/style';
import { routeDef } from '../../utils/routes';
import { Logo } from '../icon/icons';

export type NavbarLogoLinkProps = WithClassName;

export function NavbarLogoLink(props: NavbarLogoLinkProps) {
  return (
    <Link to={routeDef.home.url} className={props.className}>
      <div className='flex h-14 items-center bg-slate-800'>
        <span className='pl-4 text-lg font-bold text-slate-100'>
          <Logo />
        </span>
        <span className='pl-2 text-lg text-slate-100'>CHRONO</span>
      </div>
    </Link>
  );
}
