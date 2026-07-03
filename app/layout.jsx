
import "./globals.css";
import { ToastContainer } from "react-toastify";

import SessionWrapper from "./SessionWrapper";

export const metadata = {
  title: "Mini-Vercel Dashboard",
  description: "Automated deployment platform frontend",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <SessionWrapper>
          <ToastContainer />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}

