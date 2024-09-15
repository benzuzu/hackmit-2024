import './globals.css'; // Ensure you import your global CSS styles
import localFont from "next/font/local";
import Sidebar from './sidebar'
import { ConvexClientProvider } from "./components/ConvexClientProvider"; // Example, if using this component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Your App Title",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body>
        <ConvexClientProvider>
        <div className="flex h-full fixed main">
            <div className="mainDiv">
              {/* Sticky Sidebar */}
              <div className="hidden sm:block sticky h-screen z-20">
                <Sidebar />
              </div>
              {/* Scrollable Main Content Area */}
              <div className="flex-1 overflow-y-auto h-screen z-10">
                  {children}
              </div>
            </div>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
