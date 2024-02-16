import { styled } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip } from "react-leaflet";
import { Paper } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

export const StyledReactLeafletTooltip = styled(Tooltip)(({ theme }) => ({
  backgroundColor: "transparent !important",
  border: "transparent !important",
  color: "#FFFFFF !important",
  boxShadow: "none !important",
  fontSize: "1.5em",
  fontWeight: 700,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  color: theme.palette.CRESTGridBackground.contrastText,
  borderColor: theme.palette.CRESTBorderColor.main,
}));

export const CrestList = styled("ol")(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

export const AboutImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
}));

export const ThreeColumnGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.2),
  height: "100%",
}));
