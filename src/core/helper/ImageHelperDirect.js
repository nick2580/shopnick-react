import { API } from "../../backend";

const ImageHelperDirect = (product) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return imageurl;
};

export default ImageHelperDirect;
