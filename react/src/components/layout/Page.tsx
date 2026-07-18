import type { PropsWithChildren } from 'react';
import { Navbar } from '../nav/Navbar';

export function Page(props: PropsWithChildren) {
  return <Navbar>{props.children}</Navbar>;
}
