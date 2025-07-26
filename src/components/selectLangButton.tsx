"use client";
import { MenuItem, Select } from "@mui/material";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function SelectLangButton() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLanguage = (newLocale: string) => {
    // Create new path with the new locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

    // Set cookie for locale persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`;

    // Navigate to new path
    router.push(newPath);
    router.refresh();
  };

  const handleChange = (event: any) => {
    const newLocale = event.target.value.toLowerCase();
    changeLanguage(newLocale);
  };

  return (
    <Select value={locale.toUpperCase()} size="small" onChange={handleChange}>
      <MenuItem value="EN">{locale === "th" ? "อังกฤษ" : "EN"}</MenuItem>
      <MenuItem value="TH">{locale === "th" ? "ไทย" : "TH"}</MenuItem>
    </Select>
  );
}
