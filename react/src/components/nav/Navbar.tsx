import { useRef, type PropsWithChildren } from 'react';
import { NavbarItem } from './NavbarItem';
import { Link, useLocation } from 'react-router';
import { routeDef } from '../../utils/routes';
import { NavbarLogoLink } from './NavbarLogoLink';
import { useModal } from '../../hooks/useModal';
import { LogoutIcon, UserIcon } from '../icon/icons';
import { useDetectClickOutside } from '../../hooks/useDetectClickOutside';
import { NavbarItemMobile } from './NavbarItemMobile';

const routes = [routeDef.timeline];

export function Navbar(props: PropsWithChildren) {
  const location = useLocation();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLLIElement>(null);
  const { userMenuOpen, onUserMenuToggle } = useModal('userMenu');
  useDetectClickOutside([userMenuRef, userMenuButtonRef], onUserMenuToggle);

  return (
    <div className='relative flex h-dvh w-screen'>
      <div className='hidden h-screen flex-col sm:flex'>
        <NavbarLogoLink />
        <nav className='flex w-64 flex-1 overflow-x-hidden bg-slate-600'>
          <ul className='w-full text-lg font-light text-slate-300'>
            {routes.map((route) => (
              <NavbarItem
                key={route.id}
                url={route.url}
                text={route.text}
                icon={<route.icon />}
                selected={route.url === location.pathname}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className='relative flex h-dvh w-full flex-col overflow-x-hidden overflow-y-auto'>
        <nav className='relative flex h-14 basis-auto items-center justify-between border-b border-slate-800 bg-slate-800 sm:justify-end'>
          <NavbarLogoLink className='flex sm:hidden' />
          <ul className='mr-1 flex h-14 items-center'>
            <li
              ref={userMenuButtonRef}
              role='button'
              className='h-11 w-11 cursor-pointer bg-transparent'
              onClick={onUserMenuToggle}
            >
              <div className='flex h-full w-full items-center justify-center rounded-lg bg-slate-400'>
                <div className='flex h-10 w-10 items-center justify-center rounded-md bg-slate-200'>
                  <UserIcon size={1.2} className='text-slate-500' />
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className='flex flex-1 flex-col overflow-auto'>
          {props.children}
        </div>

        <nav className='flex h-14 w-screen flex-row items-center justify-center bg-slate-800 sm:hidden'>
          <ul className='mx-1 flex text-lg font-light text-slate-300'>
            {routes.map((route) => (
              <NavbarItemMobile
                key={route.id}
                url={route.url}
                text={route.text}
                icon={<route.icon size='36px' />}
                selected={route.url === location.pathname}
              />
            ))}
          </ul>
        </nav>
      </div>

      {userMenuOpen && (
        <div
          ref={userMenuRef}
          className='absolute top-14 right-0 z-20 mt-0.5 w-32 rounded-sm rounded-r-none border border-r-0 border-slate-300 bg-white px-3 py-1'
        >
          <ul className='flex flex-col text-slate-800'>
            <Link
              onClick={onUserMenuToggle}
              to={routeDef.settings.url}
              className='my-1 flex items-center'
            >
              <routeDef.settings.icon size={0.8} />
              <li className='ml-2'>Settings</li>
            </Link>
            <span className='mx-1 my-1 h-px bg-slate-100'></span>
            <Link
              onClick={onUserMenuToggle}
              to={routeDef.login.url}
              className='my-1 flex items-center'
            >
              <LogoutIcon size={0.8} />
              <li className='ml-2'>Logout</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
