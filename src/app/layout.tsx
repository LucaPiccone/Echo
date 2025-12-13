import '@/src/app/ui/globals.css';
import { work_sans } from './ui/fonts';

export default function RootLayout({ children }: { children: React.ReactNode; }) 
{
  return (
    <html lang="en">
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}
