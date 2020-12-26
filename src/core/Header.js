import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { signout, isAuthenticated } from "../auth/helper";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    padding: theme.spacing(1),
  },
  toolbarSecondary: {
    backgroundColor: theme.palette.background.paper,
    justifyContent: "space-between",

    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toollink: {
    margin: theme.spacing(1),
  },
}));

export default function Header(props) {
  let history = useHistory();
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
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
            {title}
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
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
