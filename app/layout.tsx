import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { Toaster } from "sonner";
import themeConfig from "../theme.config";
import "nextra-theme-docs/style.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Superseed Docs",
    template: "%s - Superseed Docs",
  },
  description: "Documentation for the Superseed ecosystem.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <html lang="en">
      <body>
        <Layout pageMap={pageMap} {...themeConfig}>
          {children}
          <Analytics />
          <Toaster />
        </Layout>
      </body>
    </html>
  );
}
