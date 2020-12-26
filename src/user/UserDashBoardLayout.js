import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { isAuthenticated, signout } from "../auth/helper";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../core/Footer";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarnav: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    padding: theme.spacing(1),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  toollink: {
    margin: theme.spacing(1),
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

const UserDashBoardLayout = ({ children }) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbarnav}>
        <Fragment>
          <Link href="/">
            <Button variant="outlined" size="small">
              Home
            </Button>
          </Link>
        </Fragment>
        <Fragment>
          <Link href="/cart">
            <Button
              className={classes.toollink}
              variant="outlined"
              size="small"
            >
              Cart
            </Button>
          </Link>
        </Fragment>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link href="/" id="Title">
            Shopnick
          </Link>
        </Typography>
        {isAuthenticated() && (
          <Link>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Sign out
            </Button>
          </Link>
        )}
      </Toolbar>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <Grid container spacing={2}>
              {children}
            </Grid>
          </Container>
        </main>
      </div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
};

export default UserDashBoardLayout;
