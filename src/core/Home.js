import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../core/Footer";
import { getProducts } from "./helper/coreapicalls";
import MainCard from "./Card";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { isAuthenticated, signout } from "../auth/helper";
import { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    width: "100%",
    // padding: theme.spacing(8, 0, 6),
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
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  toollink: {
    margin: theme.spacing(1),
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  let history = useHistory();

  const classes = useStyles();
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* NavBar Starts */}
      <Toolbar className={classes.toolbarnav}>
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
              <Button
                className={classes.toollink}
                variant="outlined"
                size="small"
              >
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

      {/* NavBar Ends */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Carousel
            size="sm"
            style={({ width: "100%" }, { height: "25%" })}
            touch={true}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <Typography
          component="h5"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
          id="ProductTitle"
        >
          Our Products
        </Typography>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <MainCard key={index} product={product}></MainCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
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

export default Home;
