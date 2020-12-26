import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import DashboardLayout from "../user/DashboardLayout";
import { isAuthenticated } from "../auth/helper";
import { getCategory, updateCategory } from "./helper/adminapicall";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    position: "center",
  },
  paper: {
    margin: theme.spacing(12, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewUpdateCategory = ({ match }) => {
  const classes = useStyles();

  const { user, token } = isAuthenticated();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //CATEGORY DATA IS PRELOADING!!!
  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };
  // I don't know what that line at the end of preload() does, but adding it has caused a warning to stop in my console. Don't remove it
  useEffect(() => {
    preload(match.params.categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <Alert severity="success">Category updated successfully</Alert>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <Alert severity="error">Failed to update category</Alert>;
    }
  };

  const NewCategoryForm = () => {
    return (
      <Grid item xs={12} md={12} lg={12} component={Paper} elevation={3} square>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography align="center" component="h1" variant="h5">
            Update Category
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              value={name}
              id="text"
              label="Category Name"
              placeholder="Example: Summer"
              name="category"
              autoComplete="text"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSubmit}
              className={classes.submit}
            >
              Create Category
            </Button>
          </form>
          {successMessage()}
          {warningMessage()}
        </div>
      </Grid>
    );
  };

  return <DashboardLayout>{NewCategoryForm()}</DashboardLayout>;
};
export default NewUpdateCategory;
