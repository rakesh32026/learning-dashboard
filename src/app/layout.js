import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { TabProvider } from "@/context/TabContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next-Gen Learning Dashboard",
  description: "A futuristic learning dashboard with Framer Motion animations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TabProvider>
          <div className="flex min-h-screen">
            {/* Sidebar handles both desktop and mobile modes */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 w-full">{children}</div>
          </div>
        </TabProvider>
      </body>
    </html>
  );
}
