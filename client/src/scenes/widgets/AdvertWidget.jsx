import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
const apiBase = process.env.REACT_APP_API_BASE_URL;
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${apiBase}/assets/advert.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Coca Cola</Typography>
        <Typography color={medium}>CocaCola.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Taste the Thunder
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
