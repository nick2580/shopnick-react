import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;

  return (
    <div>
      <CardMedia
        component="img"
        alt="photo"
        height="140"
        src={imageurl}
        title="Contemplative Reptile"
      />
    </div>
  );
};

export default ImageHelper;
