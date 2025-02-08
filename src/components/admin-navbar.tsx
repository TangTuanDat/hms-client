import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export interface IAdminNavbar {
  title: string;
  href?: string;
  description?: string;
}

export function AdminNavbar({
  items,
  sidebarTrigger,
}: {
  items: IAdminNavbar[];
  sidebarTrigger: React.ReactNode;
}) {
  return (
    <NavigationMenu className='max-w-full justify-between'>
      {sidebarTrigger ? sidebarTrigger : <div></div>}
      {buildMenu(items)}
      <div className='px-4'>Profile</div>
    </NavigationMenu>
  );
}

function buildMenu(items: IAdminNavbar[]) {
  return (
    <NavigationMenuList>
      {items.map((item) => (
        <NavigationMenuItem key={item.title}>
          <Link href={item.href ? item.href : '#'} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {item.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}
