import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["en", "th"], // Define in this line the possible languages for translation
    defaultLocale: "th", // Define in this line the default language to be shown
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);