import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Base({ children }) {
  return (
    <div>
      <Header title={"Shopnick"} />
      <div>{children}</div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </div>
  );
}
