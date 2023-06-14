import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        type="button"
        className="prodcard-btn"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={props.onClick}
      >
        加入購物車
      </button>
    </>
  );
};

export default Button;
