"use client";
import { NextIntlClientProvider } from "next-intl";
import DashboardWrapper from "./dashboard-wrapper";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
