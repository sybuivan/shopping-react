import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import formatPrice from "../../../utils/common";

const useStyles = makeStyles({
  productItem: {
    padding: "8px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
  },
  productImage: {
    borderRadius: "5px",
  },

  name: {
    textTransform: "none ",
    height: "42px",
  },
});
function Product({ product }) {
  const classes = useStyles();

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`${product.id}`)
  }

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_DEMO;
  return (
    <Box className={classes.productItem} onClick={handleClick}>
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
        {formatPrice(product.originalPrice)}
        {product.promotionPercent ? ` -${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
