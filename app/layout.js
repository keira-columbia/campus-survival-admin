import "./globals.css";

export const metadata = { title: "Campus Survival Control Room", description: "Private administration for Campus Survival Map" };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
