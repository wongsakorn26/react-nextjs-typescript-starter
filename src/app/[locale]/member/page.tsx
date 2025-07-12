// app/[locale]/member/page.tsx
import { useTranslations } from "next-intl";
import { Typography, Box, Card, CardContent } from "@mui/material";

export default function MemberPage() {
  const t = useTranslations();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("member")}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            This is the member management page.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
