'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Map, Target, UserCog } from 'lucide-react';

const ITEMS = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/voters',     label: 'Voters',      icon: Users },
  { href: '/canvassing', label: 'Canvassing',  icon: Map },
  { href: '/gotv',       label: 'GOTV',        icon: Target },
  { href: '/team',       label: 'Team',        icon: UserCog },
];

interface BottomNavProps {
  primaryColor?: string;
}

export function BottomNav({ primaryColor = '#E30613' }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        height: 60,
        backgroundColor: 'white',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              height: '100%',
              textDecoration: 'none',
            }}
          >
            <Icon size={18} color={active ? primaryColor : '#94A3B8'} />
            <span style={{
              fontSize: 9,
              fontWeight: active ? 700 : 500,
              color: active ? primaryColor : '#94A3B8',
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
