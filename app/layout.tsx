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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full m-0 p-0 layout-gradient`}>
        <ConvexClientProvider>
        <div className="flex h-full main fixed">
            <div className="mainDiv">
              {/* Sticky Sidebar */}
              <div className="sticky top-0 h-screen z-20">
                <Sidebar />
              </div>
            {/* Scrollable Main Content Area */}
            <div className="flex-1 overflow-y-auto z-10">
              <div className="flex justify-center items-start w-full m">
                {children}
              </div>
            </div>
            </div>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
