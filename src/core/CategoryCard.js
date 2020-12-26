import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { deleteCategory, getCategories } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CategoryCard = ({
  category,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const classes = useStyles();
  const date = category.updatedAt;
  const UpdateDate = new Date(date);

  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Category Name:
        </Typography>
        <Typography variant="h5" component="h2">
          {category.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Last Updated on:
        </Typography>
        <Typography variant="body2" component="p">
          {`${UpdateDate.toLocaleDateString()} ${UpdateDate.toLocaleTimeString()}`}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/admin/category/update/${category._id}`}>
          <Button size="small" color="primary">
            Update
          </Button>
        </Link>
        <Button
          onClick={() => {
            deleteThisCategory(category._id);
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

export default CategoryCard;
