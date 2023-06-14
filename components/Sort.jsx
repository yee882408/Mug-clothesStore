import React from "react";

const Sort = ({ onSortChange }) => {
  return (
    <div className="ml-auto mt-2 mx-4">
      <select
        defaultValue="product_sort"
        onChange={onSortChange}
        className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500  transition-colors duration-300 bg-white text-gray-800"
      >
        <option value="product_sort" disabled>
          商品排序
        </option>
        <option value="price_asc">價格低至高</option>
        <option value="price_desc">價格高至低</option>
      </select>
    </div>
  );
};

export default Sort;
