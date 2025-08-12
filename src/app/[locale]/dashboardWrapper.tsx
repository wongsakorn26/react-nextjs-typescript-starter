"use client";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import SelectLangButton from "@/components/selectLangButton";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CustomPageHeader from "@/components/pageContainer/customPageHeader";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const { status, data: session } = useSession();
  
  const handleLogout = () => {
    signOut();
  };

  if (pathname == "/en/signin" || pathname == "/th/signin") {
    return <>{children}</>;
  }

  if (status === "unauthenticated") {
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
        <SelectLangButton />
      </Stack>
    );
  }

  function ToolbarActionsSearch() {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton>
          <LogoutIcon
            style={{ color: "secondary.light" }}
            onClick={handleLogout}
            fontSize="medium"
          />
        </IconButton>
        <Tooltip title={session?.user.username} enterDelay={1000}>
          <IconButton
            onClick={() => {
              console.log("test click avatar");
            }}
            size="medium"
          >
            <Avatar alt={session?.user.username} sx={{ width: 24, height: 24 }}>
              {session?.user.username?.split("")[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>

        <ThemeSwitcher />
      </Stack>
    );
  }

  return (
    <NextAppProvider navigation={NAVIGATION}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: CustomFooter,
          toolbarActions: ToolbarActionsSearch,
        }}
      >
        <PageContainer
          slots={{ header: CustomPageHeader }}
          fixed
          disableGutters
          sx={{ minWidth: "100%" }}
        >
          <Box
            sx={{
              height: "100%",
              m: 1,
            }}
          >
            {children}
          </Box>
        </PageContainer>
      </DashboardLayout>
    </NextAppProvider>
  );
}
