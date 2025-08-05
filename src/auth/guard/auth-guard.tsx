import { useEffect, useCallback, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

type AuthGuardProps = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const { status, data: session } = useSession()
  console.log(session)
  const [checked, setChecked] = useState(false)

  const check = useCallback(() => {
    console.log(status)
    if (status === "unauthenticated") {
      const newParams = new URLSearchParams()
      newParams.set("redirect_to", `${pathname}?${params.toString()}`)
      router.replace("/signin?" + newParams.toString())
    } else if (status === "authenticated") {
      // if (
      //   session?.user.role === "User" &&
      //   (pathname.includes("/management") ||
      //     pathname.includes("alert-template"))
      // ) {
        router.replace("member")
      // } else {
      //   setChecked(true)
      // }
    } else if (status === "loading") {
      return
    }
  }, [status, router, params, pathname, session])

  useEffect(() => {
    check()
  }, [status, check])

  if (!checked) return null

  return (
    <>
      {/* <AlertNotification> */}
        {children}
        {/* </AlertNotification> */}
    </>
  )
}
