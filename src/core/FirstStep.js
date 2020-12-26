import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Destructuring props
const FirstStep = ({
  handleNext,
  handleChange,
  values: {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    country,
    phone,
  },
}) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            placeholder="Your first name"
            margin="normal"
            value={firstName || ""}
            onChange={handleChange}
            // error={!!formErrors.firstName}
            // helperText={formErrors.firstName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            placeholder="Your last name"
            margin="normal"
            value={lastName || ""}
            onChange={handleChange}
            // error={!!formErrors.lastName}
            // helperText={formErrors.lastName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            value={email || ""}
            onChange={handleChange}
            margin="normal"
            // error={!!formErrors.email}
            // helperText={formErrors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            placeholder="Phone Number"
            type="phone"
            value={phone || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            placeholder="Address"
            margin="normal"
            value={address || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            placeholder="City"
            type="city"
            value={city || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State/Province/Region"
            name="state"
            placeholder="State"
            type="state"
            value={state || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Zip / Postal code"
            name="zip"
            placeholder="Zip"
            type="zip"
            value={zip || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            placeholder="Country"
            type="country"
            value={country || ""}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" href="/cart">
          Back
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;
