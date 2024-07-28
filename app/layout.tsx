import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default : "Workflo",
    template : "%s | Workflo"
  },
  description: "Manage your tasks in an interactive way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="An interactive way to manage your tasks and work!"
        />
        <meta name="application-name" content="Workflo" />

        <meta property="og:title" content="Workflo" />
        <meta
          property="og:description"
          content="Manage your work interactively in contemprary way!"
        />
        <meta property="og:image" content="/procedure.png" />
        <meta property="og:image:alt" content="Workflo" />

        <meta name="twitter:title" content="Workflo" />
        <meta
          name="twitter:description"
          content="Manage your work interactively with Workflo."
        />
        <meta name="twitter:image" content="/procedure.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="whyankush07" />

        <link rel="icon" type="image/png" href="/procedure.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C084FC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Workflo"></meta>
      </head>

      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body >
    </html >
  );
}
