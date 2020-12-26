import React, { Fragment, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { loadCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { API } from "../backend";
import StripeCheckout from "react-stripe-checkout";

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
}));

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const classes = useStyles();

  const atoken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    country,
    phone,
  } = values;

  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(loadCart());
  }, []);

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    //START: Send product to backend to calculate total amount
    const body = {
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const data = await fetch(`${API}/razorpay`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((t) => t.json());
    //END: Send product to backend to calculate total amount

    var options = {
      key: process.env.RAZOR_KEY_ID,
      currency: data.currency,
      body: products,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Shopnick",
      description: "Thank you for choosing Shopnick",
      handler: function (response) {
        const transactionData = response;
        const payment_id = transactionData.razorpay_payment_id;
        console.log("TRANSACTION_DATA", { payment_id });
        handleSubmit(payment_id);
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleSubmit = (payment_id) => {
    // create order with orderData
    const orderData = {
      products: products,
      amount: getFinalPrice(),
      address: address,
      transaction_id: payment_id,
    };
    console.log(orderData);

    //Create Order
    createOrder(userId, atoken, orderData);
    //Empty Cart
    cartEmpty(() => {
      console.log("Cart Emptied!");
    });
    // Show success message
    handleNext();
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">₹ {product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ₹ {getFinalPrice()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Personal Details
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom>
            {email} {phone}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Grid container>
            <Typography gutterBottom>
              {address}, {city}-{zip}, {state}, {country}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          color="primary"
          onClick={displayRazorpay}
        >
          Pay with Razorpay
        </Button>
      </div>
    </Fragment>
  );
};

export default Confirm;
