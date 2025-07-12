"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectLangButton() {
  const router = useRouter();
  const [locale, setLocale] = useState("");
  const changeLanguage = (newLocale: string) => {
    // Set cookie and refresh

    setLocale(newLocale);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("th")}>ไทย</button>
    </div>
  );
}
