import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FirstStep from "./FirstStep";
import Confirm from "./Confirm";
import Success from "./Success";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Footer from "../core/Footer";
import { signout, isAuthenticated } from "../auth/helper";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingRight: 24, // keep right padding when drawer closed
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
  toollink: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
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
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

// Step titles
const steps = ["Address Form", "Review"];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  date: "",
  city: "",
  phone: "",
  address: "",
  state: "",
  zip: "",
  country: "",
};

const StepForm = () => {
  const classes = useStyles();
  let history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={formValues}
          />
        );
      case 1:
        return (
          <Confirm
            handleNext={handleNext}
            handleBack={handleBack}
            values={formValues}
          />
        );
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* NavBar Starts */}
      <Toolbar className={classes.toolbarnav}>
        <Fragment>
          <Link href="/">
            <Button variant="outlined" size="small">
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
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              //Success Page
              <Success values={formValues} />
            ) : (
              <div>{handleSteps(activeStep)}</div>
            )}
          </React.Fragment>
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

export default StepForm;
