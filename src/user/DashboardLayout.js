import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import CreateIcon from "@material-ui/icons/Create";
import SortIcon from "@material-ui/icons/Sort";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AssignmentIcon from "@material-ui/icons/Assignment";
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

const MainListItems = () => {
  return (
    <div>
      <Link href="/admin/create/category">
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Create Categories" />
        </ListItem>
      </Link>
      <Link href="/admin/categories">
        <ListItem button>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Categories" />
        </ListItem>
      </Link>
      <Link href="/admin/create/product">
        <ListItem button>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Create Product" />
        </ListItem>
      </Link>
      <Link href="/admin/products">
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Product" />
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Order" />
      </ListItem>
    </div>
  );
};

const SecondaryListItems = () => {
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  );
};

// const successMessage = () => {
//   //
// };

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  let history = useHistory();
  const {
    user: { name },
  } = isAuthenticated();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {open === true && (
              <Fragment>
                <Typography
                  component="h1"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={classes.toolbarTitle}
                >
                  <Link href="/admin/dashboard">
                    <span className="badge badge-info">{name}</span>
                  </Link>
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </Fragment>
            )}
            {open === false && (
              <Fragment>
                <IconButton onClick={handleDrawerOpen}>
                  <MenuIcon />
                </IconButton>
              </Fragment>
            )}
          </div>
          <Divider />
          <List>{MainListItems()}</List>
          <Divider />
          <List>{SecondaryListItems()}</List>
        </Drawer>
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

export default DashboardLayout;
