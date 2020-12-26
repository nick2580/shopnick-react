import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DashboardTitle from "./DashboardTitle";
import { getAllOrders } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = () => {
  const classes = useStyles();
  const [orderData, setOrderData] = useState([]);

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrderData(data);
      }
    });
  };
  // I don't know what that line at the end of preload() does, but adding it has caused a warning to stop in my console. Don't remove it
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, token } = isAuthenticated();

  const dateFilter = (object) => {
    const date = new Date(object);
    return date.toDateString();
  };
  var recentPay;
  var recentDate;
  const recentPayment = () => {
    const length = orderData.length - 1;
    orderData.slice(length).map((obj, index) => {
      console.log(obj);
      recentPay = obj.amount;
      recentDate = obj.createdAt;
    });
  };

  recentPayment();

  return (
    <React.Fragment>
      <DashboardTitle>Recent Order Info</DashboardTitle>
      <Typography component="p" variant="h4">
        ₹{recentPay}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {dateFilter(recentDate)}
      </Typography>
    </React.Fragment>
  );
};

export default Deposits;
