import '@/src/app/ui/globals.css';
import { work_sans } from './ui/fonts';
import { verifySession } from './lib/dal';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
      <html lang="en">
        <body className={`${work_sans.className} font-light`}>{children}</body>
      </html>
    );
}
