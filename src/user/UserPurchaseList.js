import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DashboardTitle from "./DashboardTitle";
import { getUserOrderList } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const UserOrders = () => {
  const classes = useStyles();

  const [userOrderData, setUserOrderData] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getUserOrderList(user._id, token).then((data) => {
      setUserOrderData(data);
      console.log(data);
    });
  };
  // I don't know what that line at the end of preload() does, but adding it has caused a warning to stop in my console. Don't remove it
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateFilter = (object) => {
    const date = new Date(object);
    return date.toDateString();
  };

  return (
    <React.Fragment>
      <DashboardTitle>User Orders</DashboardTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrderData.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{dateFilter(order.createdAt)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell align="right">₹{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
};

export default UserOrders;
