import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DashboardWrapper from "./dashboardWrapper";
import { NextAuthProvider } from "@/auth/context/next-auth";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function Layout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
      <NextAuthProvider>
        <NextIntlClientProvider messages={messages}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </NextIntlClientProvider>
      </NextAuthProvider>
      </body>
    </html>
  );
}
