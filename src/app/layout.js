import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: "800", variable: '--font-orbitron' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata = {
  title: "dany's web",
  description: "web developer, designer, artist, webflow",
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <link rel="icon" href="/favicon.ico" />
      <body>{children}
        
      </body>
    </html>
  );
}
