import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.CUSTOM_DOMAIN
  ? `https://${process.env.CUSTOM_DOMAIN}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "URL短縮サービス",
  description: "URL短縮サービス",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
