// src/app/layout.js
import "./globals.css";
import Navigation from "../components/Navigation";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
