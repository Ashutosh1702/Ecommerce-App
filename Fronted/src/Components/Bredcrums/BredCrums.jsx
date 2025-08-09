import React from "react";
import "./BredCrums.css";
import arrow_icons from "../../assets/images/arrow_icon.png";

const BredCrums = (props) => {
  const {product} = props;
  return (
    <div className="bredcrums">
      Home / {product.category} / {product.name}
    </div>
  );
};

export default BredCrums;
