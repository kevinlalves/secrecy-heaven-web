'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENUS_OPTIONS = [
  {
    pageName: 'Upload',
    pagePath: '/home',
  },
  {
    pageName: 'Download',
    pagePath: '/home/download',
  },
  {
    pageName: 'Descriptografar',
    pagePath: '/home/decryption',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <main className="min-h-screen bg-accent-most">
      <menu className="flex h-24 items-center bg-black px-10">
        {MENUS_OPTIONS.map((option, key) => (
          <div className="h-full" key={key}>
            <Button as={Link} href={option.pagePath} className="mt-4" size="xxl" variant="ghost">
              {option.pageName}
            </Button>

            <div
              className={cn('mt-1 h-3 rounded-t-full bg-black', { 'bg-accent-main': option.pagePath == pathname })}
            ></div>
          </div>
        ))}
      </menu>
      <div className="px-8 pb-20 pt-40">{children}</div>
    </main>
  );
}
