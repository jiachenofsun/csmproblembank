import { Montserrat } from "next/font/google";
import "./ui/globals.css";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "CSM 61B Problem Bank",
  description: "A web app for CSM 61B content organization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
