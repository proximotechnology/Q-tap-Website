import localFont from "next/font/local";
import "./globals.css";
import "/public/assets/icons/style.css";
import HomeContextProvider from "./context/homeContext.js";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import PusherProvider from "./context/PusherProvider";
import { ToastContainer } from "react-toastify";
import ClientProviders from "@/component/ClientProviders/ClientProviders";

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
  title: "Qtap",
  description: `Tap, Order, Pay and Eat Create a Smart menu suitable for any type of business. Engage more with your customers.`,
};

export default async function LocaleLayout({
  children,
  params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    // notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders >
          <HomeContextProvider>
            <NextIntlClientProvider>
              <PusherProvider>
                {children}
                <ToastContainer />
              </PusherProvider>
            </NextIntlClientProvider>
          </HomeContextProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
