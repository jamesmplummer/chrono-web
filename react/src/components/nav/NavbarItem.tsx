import { Link } from 'react-router';

export type NavbarItemProps = {
  icon: React.ReactNode;
  url: string;
  text: string;
  selected?: boolean;
};

export function NavbarItem(props: NavbarItemProps) {
  const selectedStyles = props.selected ? 'bg-slate-500/80' : 'bg-transparent';
  return (
    <li
      className={`${selectedStyles} w-auto transition-all duration-300 hover:bg-slate-500/30`}
    >
      <Link to={props.url}>
        <div className='flex h-full w-full items-center px-3'>
          {props.icon}
          <span className='h-full w-full py-3 pl-4'>{props.text}</span>
        </div>
      </Link>
    </li>
  );
}
