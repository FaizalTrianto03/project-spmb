// app/layout.js
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import WhatsAppGuide from "@/components/layouts/whatsapp_guide";
import Footer from "@/components/layouts/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "PMB UNIMMAN - Penerimaan Mahasiswa Baru",
  description: "Penerimaan Mahasiswa Baru Universitas Muhammadiyah Manado",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.className}>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#fafafa]`}
        suppressHydrationWarning={true}
      >
        {/* Header - Fixed */}
        <Header />
        
        {/* Main Content - Dengan padding top untuk offset fixed header */}
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        
        {/* WhatsApp Guide */}
        <WhatsAppGuide />
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
