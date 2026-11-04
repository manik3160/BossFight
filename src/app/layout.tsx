import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "You Are the Final Boss — The First Trial",
  description:
    "Forge your Warden and survive your own creation. A dark fantasy boss-building browser game.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
