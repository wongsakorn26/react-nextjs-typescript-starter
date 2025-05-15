"use client";
import { dir } from "i18next";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { createTheme, Stack, Typography } from "@mui/material";
import SelectLangButton from "@/components/select-lang-button";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import { LangProvider, useLang } from "@/context/lang-context";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const BRANDING = {
  title: "My Toolpad Core App",
};

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#2A4364",
          paper: "#112E4D",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const params = useParams();
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
      title: "Member",
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
    <html>
      <body>
        <LangProvider>
          <NextAppProvider navigation={NAVIGATION} theme={customTheme}>
            <Provider store={store}>
              <DashboardLayout
                slots={{
                  appTitle: CustomAppTitle,
                  sidebarFooter: CustomFooter,
                }}
              >
                <PageContainer>{children}</PageContainer>
              </DashboardLayout>
            </Provider>
          </NextAppProvider>
        </LangProvider>
      </body>
    </html>
  );
}
