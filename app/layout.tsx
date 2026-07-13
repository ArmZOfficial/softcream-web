import { Outfit, Mitr, Prompt, Quicksand, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["600", "700", "800"],
});

const mitr = Mitr({
  subsets: ["thai", "latin"],
  variable: "--font-mitr",
  weight: ["500", "600", "700"],
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic"],
});

export const metadata = {
  title: "ดวงจันทร์ — VTuber Personal Site",
  description: "คืนพระจันทร์สีน้ำเงินในมหาวิหารดอกไม้ — Dreamy VTuber personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${outfit.variable} ${mitr.variable} ${prompt.variable} ${quicksand.variable} ${playfair.variable}`}>
      <body className="font-body bg-midnight text-moon-white antialiased">{children}</body>
    </html>
  );
}
