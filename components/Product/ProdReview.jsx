import React from "react";
import Stars from "../Stars";

const ProductReview = ({ comment, authorName, title, createAt, star }) => {
  return (
    <div className="bg-white p-4 flex flex-col">
      <div className="flex-start flex-col border-b p-4 ">
        <div className="sm:flex-row sm:justify-between w-full flex flex-col mr-auto mb-4">
          <p className="text-lg mb-1">{title}</p>
          <span className="text-lg">{createAt}</span>
        </div>
        <div className="flex flex-between w-full mb-4">
          <span className="text-sm">{comment}</span>
        </div>
        <div className="flex mb-4">
          <span className="text-sm">{authorName}</span>
        </div>
        <div className=" ml-auto">
          <Stars disabled={true} defaultHowMany={star} />
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
