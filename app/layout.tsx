import type { Metadata } from "next";
import "./globals.css";
import { DialectProvider } from "@/context/DialectContext";
import { WalletProvider } from "@/context/WalletContext";
import { LocationProvider } from "@/context/LocationContext";

export const metadata: Metadata = {
  title: "EkitiWorks — Project Omoluabi Digital",
  description:
    "Ekiti State's civic micro-tasking, tax mapping, and agricultural portal — audio-first, geofenced, and built for every citizen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ekiti-canvas text-ekiti-neutral font-body antialiased">
        <LocationProvider>
          <WalletProvider>
            <DialectProvider>{children}</DialectProvider>
          </WalletProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
