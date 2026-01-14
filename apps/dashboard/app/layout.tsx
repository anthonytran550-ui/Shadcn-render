import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'json-render Dashboard Demo',
  description: 'AI-powered dashboard widget generator with guardrails',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
