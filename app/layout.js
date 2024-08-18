import "@/app/ui/global.css";
import { lusitana } from '@/app/ui/fonts'; // Import the configured font

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
