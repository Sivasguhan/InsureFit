import localFont from "next/font/local";
import "./globals.scss";
import ReduxProvider from "./reduxProvider";

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
  title: "InsureFit",
  description: "We e(i)nsure you're fit!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        <script src="https://cdn.tailwindcss.com"></script>
      </header>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
