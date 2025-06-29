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
import { LangProvider } from "@/context/lang-context";
import { useTranslation } from "react-i18next";
import customTheme from "../../theme/theme";
import CustomPageHeader from "@/components/page-container/custom-page-header";

type Props = {
  children: React.ReactNode;
  params: { lng: string };
};

export default function LocaleLayout({ children, params }: Props) {
  // const params = useParams();
  // const lang = params.lng;
  // const { t } = useTranslation(lang);
  const lang = params.lng;
  const { t } = useTranslation(lang);

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: `${lang}/dashboard`,
      title: t("dashboard"),
      // icon: <DashboardIcon />,
    },
    {
      segment: `${lang}/member`,
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
    <LangProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <NextAppProvider navigation={NAVIGATION}>
          <Provider store={store}>
            <DashboardLayout
              slots={{
                appTitle: CustomAppTitle,
                sidebarFooter: CustomFooter,
              }}
            >
              <PageContainer
                slots={{ header: CustomPageHeader }}
                sx={{ m: 1, p: 1 }}
              >
                {children}
              </PageContainer>
            </DashboardLayout>
          </Provider>
        </NextAppProvider>
      </ThemeProvider>
    </LangProvider>
  );
}
