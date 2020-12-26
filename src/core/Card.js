import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelperDirect from "./helper/ImageHelperDirect";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    height: 440,
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 240,
  },
});

//Card componant is expecting product, AddtoCart...etc whenever we use it, which makes it re-usable componant
const MainCard = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  //A dummy function
  //f => f means function (f) {return f}
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const cardTitle = product ? product.name : "A Dog photo";

  const cardDescription = product
    ? product.description
    : "Because something went wrong";

  const cardPrice = product ? product.price : "Priceless!";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const imageurl = ImageHelperDirect(product);

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <Button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
          size="small"
          color="primary"
        >
          Add to cart
        </Button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <Button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-error mt-2 mb-2"
          size="small"
          color="secondary"
        >
          Remove from cart
        </Button>
      )
    );
  };

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageurl} />
          <CardContent>
            {getRedirect(redirect)}
            <Typography gutterBottom variant="h5" component="h2">
              {cardTitle}
            </Typography>
            <Typography className={classes.pos}>₹ {cardPrice}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cardDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {showAddToCart(addtoCart)}
          {showRemoveFromCart(removeFromCart)}
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default MainCard;
