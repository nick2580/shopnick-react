import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { isAuthenticated } from "../auth/helper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { deleteProduct, getProducts } from "../admin/helper/adminapicall";
import ImageHelper from "./helper/ImageHelper";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10,
  },
  pos: {
    marginBottom: 5,
  },
});

const ProductCard = ({ product, setReload = (f) => f, reload = undefined }) => {
  const classes = useStyles();

  const cardTitle = product ? product.name : "A Dog photo";
  const cardDescription = product
    ? product.description
    : "Because something went wrong";
  const cardPrice = product ? product.price : " Priceless!";
  const cardStock = product ? product.stock : " Infinite!";

  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <ImageHelper product={product} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {cardTitle}
          </Typography>
          <Typography className={classes.pos}>₹ {cardPrice}</Typography>
          <Typography className={classes.pos} color="textSecondary">
            Stock: {cardStock}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description: {cardDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={`/admin/product/update/${product._id}`}>
          <Button size="small" color="primary">
            Update
          </Button>
        </Link>
        <Button
          onClick={() => {
            deleteThisProduct(product._id);
            setReload(!reload);
          }}
          size="small"
          color="secondary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
