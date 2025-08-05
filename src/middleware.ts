import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
    // Run the next-intl middleware
    const response = intlMiddleware(req)

    // Fetch the token from the request
    const token = await getToken({ req })

    console.log("token : ",token);
    // return NextResponse.redirect(
    //     new URL("/th/member", req.url)
    //   )
        // NextResponse.redirect(new URL("/member", req.url))
  

    // Return the response from the next-intl middleware
    // return response
  }
export const config = {
    matcher: ['/((?!_next|api|.*\\.).*)']
}