import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIIrkutsk — экосистема ИИ-агентов",
  description: "Интерактивная демонстрация архитектуры ИИ-агентов AIIrkutsk для бизнеса.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
