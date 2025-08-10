import { useEffect, useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { status, data: session } = useSession();
  console.log("session useSession:  ",session);
  console.log("status useSession:  ", status);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (status === "unauthenticated") {
      const newParams = new URLSearchParams();
      router.replace("signin?" + newParams.toString());
    // } else if (status === "authenticated") {
    //   router.replace("dashboard")
      // setChecked(true)
    } else if (status === "loading") {
      return;
    }
  }, [status, router, params, pathname, session]);

  useEffect(() => {
    check();
  }, [status, check]);

  if (!checked) return null;

  return (
    <>
      {/* <AlertNotification> */}
      {children}
      {/* </AlertNotification> */}
    </>
  );
}
