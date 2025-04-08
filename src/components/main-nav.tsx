'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';

interface MainNavProps {
  onMenuToggle: () => void;
}

export function MainNav({ onMenuToggle }: MainNavProps) {
  return (
    <div className='flex flex-1 items-center gap-4'>
      <button
        onClick={onMenuToggle}
        className='rounded-md p-2 transition-colors hover:bg-white/10'
        aria-label='Toggle menu'
      >
        <Menu className='h-5 w-5 text-white' />
      </button>
      <NavigationMenu className='flex-1'>
        <NavigationMenuList className='space-x-4'>
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className='text-lg font-semibold text-white hover:text-white/90'>
                HMS Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/staff' legacyBehavior passHref>
              <NavigationMenuLink className='text-white hover:text-white/90'>
                Staff Management
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/patients' legacyBehavior passHref>
              <NavigationMenuLink className='text-white hover:text-white/90'>
                Patient Management
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/appointments' legacyBehavior passHref>
              <NavigationMenuLink className='text-white hover:text-white/90'>
                Appointments
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
