import * as zod from "zod"
import { TranslationProps } from "@/i18n/request"

export default function SignInSchema(t: TranslationProps) {
    return zod.object({
        username: zod
            .string()
            .min(1, t("required", { name: t("username") })),
        password: zod
            .string()
            .min(1, t("required", { name: t("password") })),
    })
}
