import React from "react";
import ProdItem from "./ProdItem";
import "../../styles/card.css";

import { motion } from "framer-motion";

const ProdCard = ({ products, removeFromWishlist }) => {
  return (
    <motion.div
      className="grid-card"
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {products?.length > 0 &&
        products.map((prod) => (
          <ProdItem
            {...prod}
            key={prod._id}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
    </motion.div>
  );
};

export default ProdCard;
