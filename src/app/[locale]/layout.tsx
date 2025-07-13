"use client";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Stack, Typography, ThemeProvider, CssBaseline } from "@mui/material";
import SelectLangButton from "@/components/select-lang-button";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CustomPageHeader from "@/components/page-container/custom-page-header";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "dashboard", // Remove leading slash
      title: t("dashboard"),
      // icon: <DashboardIcon />,
    },
    {
      segment: "member", // Remove leading slash
      title: t("member"),
      // icon: <ShoppingCartIcon />,
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
      // icon: <BarChartIcon />,
      children: [
        {
          segment: "sales",
          title: "Sales",
          // icon: <DescriptionIcon />,
        },
        {
          segment: "traffic",
          title: "Traffic",
          // icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: "integrations",
      title: "Integrations",
      // icon: <LayersIcon />,
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
    return <SelectLangButton />;
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
