import React from "react";

const Product = props => {
  const programs = ["web", "ux/ui", "ds"];

  return (
    <div
      onClick={() => props.setActiveProduct(props.i)}
      id={
        props.active === props.i
          ? "product-active" : undefined
      }
      className="product-container"
    >
      <div className="product-description">
        <h3 className="product-title">{props.el.productName}</h3>
        {props.i % 2 === 0 ? (
          <p className="product-status-completed">Completed</p>
        ) : (
          <p className="product-status-not-completed">Not Completed</p>
        )}
      </div>
      <div className="product-programs">
        {programs.map(
          (el, i) =>
            (el === "ux/ui" && (
              <p key={i} className="product-program-avatar program-ux">
                {el.toUpperCase()}
              </p>
            )) ||
            (el === "ds" && (
              <p key={i} className="product-program-avatar program-ds">
                {el.toUpperCase()}
              </p>
            )) ||
            (el === "web" && (
              <p key={i} className="product-program-avatar program-web">
                {el.toUpperCase()}
              </p>
            ))
        )}
      </div>
    </div>
  );
};

export default Product;
