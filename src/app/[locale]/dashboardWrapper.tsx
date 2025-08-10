"use client";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { IconButton, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import SelectLangButton from "@/components/selectLangButton";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CustomPageHeader from "@/components/pageContainer/customPageHeader";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut();
  };

  if (pathname == "/en/signin" || pathname == "/th/signin") {
    return <>{children}</>;
  }
  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "dashboard",
      title: t("dashboard"),
      // icon: <DashboardIcon />,
    },
    {
      segment: "member",
      title: t("member"),
    },
    {
      segment: "skin",
      title: t("skin"),
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Analytics",
    },
    {
      segment: "reports",
      title: "Reports",
      children: [
        {
          segment: "sales",
          title: "Sales",
        },
        {
          segment: "traffic",
          title: "Traffic",
        },
      ],
    },
    {
      segment: "integrations",
      title: "Integrations",
    },
  ];

  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <CloudCircleIcon fontSize="large" color="primary" />
        <Typography variant="h6">My App</Typography>
      </Stack>
    );
  }

  function CustomFooter() {
    return (
      <Stack>
        <IconButton>
          <LogoutIcon
            style={{ color: "secondary.light" }}
            onClick={handleLogout}
            fontSize="medium"
          />
        </IconButton>
        <SelectLangButton />
      </Stack>
    );
  }

  return (
    <NextAppProvider navigation={NAVIGATION}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: CustomFooter,
        }}
      >
        <PageContainer slots={{ header: CustomPageHeader }} sx={{ m: 1, p: 1 }}>
          {children}
        </PageContainer>
      </DashboardLayout>
    </NextAppProvider>
  );
}
