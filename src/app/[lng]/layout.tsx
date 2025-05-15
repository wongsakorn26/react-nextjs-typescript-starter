import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import SelectLangButton from "@/components/select-lang-button";
import SideBar from "@/components/side-bar/side-bar";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <SideBar />
        {/* <SelectLangButton currentLang={lng} /> */}
        {children}
      </body>
    </html>
  );
}
