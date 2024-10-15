import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import ReactQueryProvider from "@/app/react-query-provider";
import theme from "./theme";

export const metadata: Metadata = {
  title: "Simple System",
  description: "Nelson Orduz - Code Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
