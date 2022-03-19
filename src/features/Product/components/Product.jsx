import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_DEMO;
  return (
    <Box>
      {/* <Skeleton variant="rect" width="100%" height={118}/> */}
      <Box spacing={1}>
        <img
          src={thumbnailUrl}
          alt={product.name}
          width="100%"
          height="200px"
        />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="span" fontSize="16px" fontWeight="bold">
        {new Intl.NumberFormat("vn-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.salePrice)}
        {product.promotionPercent ? ` -${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
