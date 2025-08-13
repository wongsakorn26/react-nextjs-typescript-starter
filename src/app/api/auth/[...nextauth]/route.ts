import { ServerResErrorProps } from "@/types/error"
import axios from "axios"
import type { AuthOptions } from "next-auth"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "signin",
            name: "Signin",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(`${process.env.API_ENDPOINT}/api/v1/authentication/signin`, {
                        username: credentials?.username,
                        password: credentials?.password,
                    });

                    if (res) return res.data
                } catch (error) {
                    const err = error as ServerResErrorProps
                    throw new Error(err?.response.data.message)
                }
            },

        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                tokens: token.tokens,
                refresh: token.refresh,
                user: token["user"] as {},
            }
        },
        async jwt({ token, user }) {
            // return typeof user !== "undefined" ? (user as unknown as JWT) : token
            return { ...token, ...user }
        }
    },
    pages: {
        signIn: "/signin",
    }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
