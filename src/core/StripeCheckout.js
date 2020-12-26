import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // const [data, setData] = useState({
  //   loading: false,
  //   success: false,
  //   error: "",
  //   address: "",
  // });

  const atoken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Success Response: ", response);
        //Call further methods
        const { status } = response;
        console.log("STATUS ", status);

        //Note to me: I can do better that this, for createOrder (Try razorpay and its callbacks)
        const orderData = {
          products: products,
          amount: products.price,
        };
        createOrder(userId, atoken, orderData);
        //Empty Cart
        cartEmpty(() => {
          console.log("Did we got a crash");
        });
        //Force Reload
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const showStripButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HxBbYBfSCo9BOIAUNLvJUlE9DvPi8jgn8H6Wc2v1pXg6i2haVN0TQygHQKY1TcdWVmhYSiF5RYLp83DKbNpqpvU00D9kOcySm"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Shopnick"
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Strip</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn-warning">Sign In</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-black">Get final price: ₹{getFinalPrice()}</h3>
      {showStripButton()}
    </div>
  );
};

export default StripeCheckout;
