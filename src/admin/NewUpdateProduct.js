import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DashboardLayout from "../user/DashboardLayout";
import { isAuthenticated } from "../auth/helper";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewUpdateProduct = ({ match }) => {
  const classes = useStyles();

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    createdProduct,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  // I don't know what that line at the end of preload() does, but adding it has caused a warning to stop in my console. Don't remove it
  useEffect(() => {
    preload(match.params.productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <Alert style={{ display: createdProduct ? "" : "None" }} severity="success">
      {createdProduct} updated successfully
    </Alert>
  );

  const errorMessage = () => (
    <Alert style={{ display: error ? "" : "none" }} severity="error">
      {error}
    </Alert>
  );

  const NewProductForm = () => {
    return (
      <Grid item xs={12} md={12} lg={12} component={Paper} elevation={3} square>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography align="center" component="h1" variant="h5">
              Create Product
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={handleChange("name")}
                    value={name}
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange("description")}
                    value={description}
                    id="description"
                    label="Description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange("price")}
                    value={price}
                    id="price"
                    label="Price"
                    name="Price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    required
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Select Category</InputLabel>
                    <Select displayEmpty onChange={handleChange("category")}>
                      <MenuItem value="" disabled>
                        Select Category
                      </MenuItem>
                      {categories &&
                        categories.map((cate, index) => (
                          <MenuItem key={index} value={cate._id}>
                            {cate.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange("stock")}
                    value={stock}
                    name="Quantity"
                    label="Quantity"
                    type="number"
                    id="quantity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    onChange={handleChange("photo")}
                    variant="outlined"
                    required
                    fullWidth
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="Choose a file"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSubmit}
                className={classes.submit}
              >
                Create Product
              </Button>
              {successMessage()}
              {errorMessage()}
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </Grid>
    );
  };

  return <DashboardLayout>{NewProductForm()}</DashboardLayout>;
};
export default NewUpdateProduct;
