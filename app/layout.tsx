import type { Metadata } from "next";
import { Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LoaderWrapper from "@/components/LoaderWrapper";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import ViewportFrame from "@/components/ViewportFrame";

const rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-rajdhani"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techgendm.dev"),
  title: "Devashish Mishra (TechGen_DM) | Portfolio",
  description: "Building Products at the Intersection of AI & Web.",
  openGraph: {
    title: "Devashish Mishra (TechGen_DM) | Portfolio",
    description: "Building Products at the Intersection of AI & Web.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechGen_DM Portfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable}`}>
      <body style={{ cursor: "none" }}>
        <CustomCursor />

        <div className="bg-black min-h-screen w-full m-0 p-0 relative flex flex-col">
          {/* Decorative SVG Frame Overlay */}
          <ViewportFrame />
          
          <LoaderWrapper>
            <Navbar />
            <PageTransition>
              <main className="flex-grow flex flex-col w-full">
                {children}
              </main>
            </PageTransition>
          </LoaderWrapper>
        </div>
      </body>
    </html>
  );
}
