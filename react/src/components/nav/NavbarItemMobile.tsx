import { Link } from 'react-router';

export type NavbarItemMobileProps = {
  icon: React.ReactNode;
  url: string;
  text: string;
  selected?: boolean;
};

export function NavbarItemMobile(props: NavbarItemMobileProps) {
  const selectedStyles = props.selected ? 'bg-slate-500/30' : 'bg-transparent';
  return (
    <li
      className={`${selectedStyles} mx-1 w-auto rounded-md py-1 transition-all duration-300`}
    >
      <Link to={props.url} className='flex h-full w-full items-center px-3'>
        {props.icon}
      </Link>
    </li>
  );
}
