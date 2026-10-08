import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: { default: "Addis Eats", template: "%s · Addis Eats" },
  description: "Fresh Ethiopian food, delivered.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}