import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  productItem: {
    padding: '8px',
    '&:hover': {
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    }
  },
  productImage: {
    borderRadius: '5px'
  },

  name: {
    textTransform: "none ",
    height: '42px'
  },
});
function Product({ product }) {
  const classes = useStyles();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_DEMO;
  return (
    <Box className={classes.productItem}>
      {/* <Skeleton variant="rect" width="100%" height={118}/> */}
      <Box spacing={1} minHeight="215px">
        <img
          src={thumbnailUrl}
          alt={product.name}
          width="100%"
          height="200px"
          className={classes.productImage}
        />
      </Box>
      <Typography variant="body2" className={classes.name}>
        {product.name}
      </Typography>
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
