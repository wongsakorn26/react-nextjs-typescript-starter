// import acceptLanguage from "accept-language";
// import { NextResponse, NextRequest } from "next/server";

// import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";

// acceptLanguage.languages(languages);

// export const config = {
//     // matcher: '/:lng*'
//     matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
// };

// export function middleware(req: NextRequest) {
//     if (
//         req.nextUrl.pathname.indexOf("icon") > -1 ||
//         req.nextUrl.pathname.indexOf("chrome") > -1
//     )
//         return NextResponse.next();

//     let lng: string | undefined | null;

//     if (req.cookies.has(cookieName))
//         lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

//     if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

//     if (!lng) lng = fallbackLng;

//     // Redirect if lng in path is not supported
//     if (
//         !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//         !req.nextUrl.pathname.startsWith("/_next")
//     ) {
//         return NextResponse.redirect(
//             new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
//         );
//     }

//     if (req.headers.has("referer")) {
//         const refererUrl = new URL(req.headers.get("referer") || "");
//         const lngInReferer = languages.find((l) =>
//             refererUrl.pathname.startsWith(`/${l}`)
//         );
//         const response = NextResponse.next();

//         if (lngInReferer) response.cookies.set(cookieName, lngInReferer);

//         return response;
//     }

//     return NextResponse.next();
// }

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!_next|api|.*\\.).*)']
}