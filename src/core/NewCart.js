import React, { Fragment, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { loadCart } from "./helper/cartHelper";
import { removeItemFromCart } from "./helper/cartHelper";
import Footer from "../core/Footer";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { isAuthenticated, signout } from "../auth/helper";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  toolbarnav: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    padding: theme.spacing(1),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(25),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    position: "absolute",
  },
}));

const NewCart = () => {
  const classes = useStyles();
  let history = useHistory();

  const [products, setProducts] = useState([]);
  //This is a dummy state introduce to force reload card component when user clicks on "remove from cart"
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* NavBar Starts */}
      <Toolbar className={classes.toolbarnav}>
        <Fragment>
          <Link href="/">
            <Button
              className={classes.toollink}
              variant="outlined"
              size="small"
            >
              Home
            </Button>
          </Link>
        </Fragment>
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Fragment>
            <Link href="/admin/dashboard">
              <Button variant="outlined" size="small">
                Admin
              </Button>
            </Link>
          </Fragment>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Fragment>
            <Link href="/user/dashboard">
              <Button variant="outlined" size="small">
                Dashboard
              </Button>
            </Link>
          </Fragment>
        )}
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
        {!isAuthenticated() && (
          <Fragment>
            <Link href="/signin">
              <Button variant="outlined" size="small">
                Sign in
              </Button>
            </Link>
          </Fragment>
        )}
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
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Cart
          </Typography>
          <div className={classes.stepper}>
            <Typography variant="h6" gutterBottom>
              Cart summary
            </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem className={classes.listItem} key={product.name}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.desc}
                  />
                  <Typography variant="body2">₹ {product.price}</Typography>
                  <Link
                    onClick={() => {
                      removeItemFromCart(product._id);
                      setReload(!reload);
                    }}
                  >
                    <DeleteIcon color="secondary" />
                  </Link>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  ₹{getFinalPrice()}
                </Typography>
              </ListItem>
            </List>
            <div
              style={{
                display: "flex",
                marginTop: 50,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="contained" color="default" href="/">
                Back
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="primary"
                href="/checkout"
              >
                Confirm & Continue
              </Button>
            </div>
          </div>
        </Paper>
      </main>
      {/* Footer */}
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
        className={classes.footer}
      />
      {/* End footer */}
    </React.Fragment>
  );
};

export default NewCart;
