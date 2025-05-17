"use client";

import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/app/i18n/settings";
import { useLang } from "@/context/lang-context";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function SelectLangButton() {
  const pathname = usePathname();
  const router = useRouter();

  const { lang, setLang } = useLang();

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = (event.target.value as string).toLowerCase();
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

  return (
    <Select value={lang.toUpperCase()} onChange={handleChange} size="small">
      <MenuItem value="EN">{lang === "th" ? "อังกฤษ" : "EN"}</MenuItem>
      <MenuItem value="TH">{lang === "th" ? "ไทย" : "TH"}</MenuItem>
    </Select>
  );
}
