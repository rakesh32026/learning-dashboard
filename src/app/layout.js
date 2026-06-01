import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1 min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 hidden lg:block">
            <div className="sticky top-0 h-screen overflow-y-auto">
              <Sidebar />
            </div>
          </aside>

          {/* Mobile Sidebar + Main Content */}
          <div className="flex-1 w-full">
            <Sidebar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

