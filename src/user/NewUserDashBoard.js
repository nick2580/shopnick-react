import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import UserOrders from "./UserPurchaseList";
import UserDashBoardLayout from "./UserDashBoardLayout";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const OrderBox = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <UserOrders />
      </Paper>
    </Grid>
  );
};

const NewUserDashBoard = () => {
  return <UserDashBoardLayout>{OrderBox()}</UserDashBoardLayout>;
};

export default NewUserDashBoard;
