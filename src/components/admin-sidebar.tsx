import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
export interface IMenuItem {
  title: string;
  url?: string;
  icon?: React.FC;
}

export function AdminSidebar({ items }: { items: IMenuItem[] }) {
  return (
    <Sidebar>
      <Header />
      <Body>{BuildMenu(items)}</Body>
      <Footer />
    </Sidebar>
  );
}

export function AdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

export function AdminSidebarTrigger() {
  return <SidebarTrigger />;
}

function Header({ children }: { children?: React.ReactNode }) {
  return <SidebarHeader>{children}</SidebarHeader>;
}

function Body({ children }: { children?: React.ReactNode }) {
  return <SidebarContent>{children}</SidebarContent>;
}

function Footer({ children }: { children?: React.ReactNode }) {
  return <SidebarFooter>{children}</SidebarFooter>;
}

function BuildMenu(items: IMenuItem[]) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url ? item.url : '#'}>
              {item.icon ? <item.icon /> : null}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
