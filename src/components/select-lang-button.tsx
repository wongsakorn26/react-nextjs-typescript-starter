"use client";

import { Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/app/i18n/settings";
import { useLang } from "@/context/lang-context";

export default function SelectLangButton() {
  const pathname = usePathname();
  const router = useRouter();

  const { lang, setLang } = useLang();

  const handleChange = (value: string) => {
    const newLang = value.toLowerCase();
    setLang(newLang);

    const segments = pathname.split("/");

    if (languages.includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.unshift("", newLang);
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  const langOptionsEn = [
    { value: "EN", label: "EN" },
    { value: "TH", label: "TH" },
  ];
  const langOptionsTh = [
    { value: "EN", label: "อังกฤษ" },
    { value: "TH", label: "ไทย" },
  ];

  return (
    <Select
      value={lang.toUpperCase()}
      onChange={handleChange}
      options={lang === "th" ? langOptionsTh : langOptionsEn}
      dropdownStyle={{ zIndex: 2000 }}
    />
  );
}
