import React, { useState, useEffect } from "react";
import DashboardLayout from "../user/DashboardLayout";
import ProductCard from "../core/ProductCard";
import { getProducts } from "./helper/adminapicall";

const NewManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [reload]);

  return (
    <DashboardLayout>
      {products.map((product, index) => {
        return (
          <ProductCard
            setReload={setReload}
            reload={reload}
            key={index}
            product={product}
          />
        );
      })}
    </DashboardLayout>
  );
};

export default NewManageProduct;
