import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "30px 2px",
  },
  pageNumber: {
    margin: "0 20px !important",
    color: theme.palette.text.primary,
  },
}));
