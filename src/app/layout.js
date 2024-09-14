import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/storeProvider";
import SessionWrapper from "@/utils/SessionWrapper";
import Header from "@/components/header";
import { usePathname } from "next/navigation";

const poopins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/localhost")) {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return (
    <html lang="en">
      <head>
        <title>Todo List</title>
      </head>
      <body className={`${poopins.className} h-screen`}>
        <SessionWrapper>
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
