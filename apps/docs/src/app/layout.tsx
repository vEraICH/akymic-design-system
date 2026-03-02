import "./globals.css";
import { DocLayout } from "@/components/doc-layout";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: { default: "Akymic Design System", template: "%s — Akymic DS" },
  description: "Token-driven component library for Next.js. Design with precision, build with confidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DocLayout>{children}</DocLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
