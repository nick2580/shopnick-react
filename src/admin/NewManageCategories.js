import React, { useState, useEffect } from "react";
import DashboardLayout from "../user/DashboardLayout";
import { getCategories } from "./helper/adminapicall";
import CategoryCard from "../core/CategoryCard";

const NewManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);

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
  }, [reload]);

  return (
    <DashboardLayout>
      {categories.map((category, index) => {
        return (
          <CategoryCard
            setReload={setReload}
            reload={reload}
            key={index}
            category={category}
          />
        );
      })}
    </DashboardLayout>
  );
};

export default NewManageCategories;
