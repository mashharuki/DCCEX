import { GlobalProvider } from "@/context/GlobalProvider";
import { XummProvider } from "@/context/XummProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/layout";
import "../styles/globals.css";

/**
 * MyApp Component
 * @param param0 
 * @returns 
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <NextUIProvider>
        <GlobalProvider>
          <XummProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </XummProvider>
        </GlobalProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
