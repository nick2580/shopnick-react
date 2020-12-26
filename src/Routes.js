import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import "./styles.css";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import SignInSide from "./user/SignInSide";
import NewAdminDashBoard from "./user/NewAdminDashBoard";
import AddNewCategory from "./admin/AddNewCategory";
import AddNewProduct from "./admin/AddNewProduct";
import NewManageCategories from "./admin/NewManageCategories";
import NewUpdateCategory from "./admin/NewUpdateCategory";
import NewManageProduct from "./admin/NewManageProduct";
import NewUpdateProduct from "./admin/NewUpdateProduct";
import NewCart from "./core/NewCart";
import StepForm from "./core/StepForm";
import NewUserDashBoard from "./user/NewUserDashBoard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={SignInSide} />
        <Route path="/cart" exact component={NewCart} />
        <PrivateRoute
          path="/user/dashboard"
          exact
          component={NewUserDashBoard}
        />
        <PrivateRoute path="/checkout" exact component={StepForm} />
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={NewAdminDashBoard}
        />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddNewCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={NewManageCategories}
        />
        <AdminRoute
          path="/admin/create/product"
          exact
          component={AddNewProduct}
        />
        <AdminRoute path="/admin/products" exact component={NewManageProduct} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={NewUpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={NewUpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
