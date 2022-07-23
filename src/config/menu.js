import OnlinePredictionRoundedIcon from "@mui/icons-material/OnlinePredictionRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";

const menu = [
  {
    text: "Prediksi",
    to: "/",
    icon: <OnlinePredictionRoundedIcon style={{ fill: "#eeeeee" }} />,
  },
  {
    text: "Penjualan",
    to: "/sales",
    icon: <MonetizationOnRoundedIcon style={{ fill: "#eeeeee" }} />,
  },
  {
    text: "Sepeda Motor",
    to: "/motorcycle",
    icon: <TwoWheelerRoundedIcon style={{ fill: "#eeeeee" }} />,
  },
];

export default menu;
