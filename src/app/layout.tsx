import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
