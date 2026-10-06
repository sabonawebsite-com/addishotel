import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: { default: "Addis Eats", template: "%s · Addis Eats" },
  description: "Fresh Ethiopian food, delivered.",
};

// Root layout: owns <html> and <body>, imports global CSS, wraps every route.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}