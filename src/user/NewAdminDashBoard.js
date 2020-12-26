import DashboardLayout from "./DashboardLayout";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./Charts";
import Deposits from "./Deposits";
import Orders from "./Orders";
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

const DepositBox = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper className={fixedHeightPaper}>
        <Deposits />
      </Paper>
    </Grid>
  );
};

const ChartBox = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper className={fixedHeightPaper}>
        <Charts />
      </Paper>
    </Grid>
  );
};

const OrderBox = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Orders />
      </Paper>
    </Grid>
  );
};

const NewAdminDashBoard = () => {
  return (
    <DashboardLayout>
      {ChartBox()}
      {DepositBox()}
      {OrderBox()}
    </DashboardLayout>
  );
};

export default NewAdminDashBoard;
