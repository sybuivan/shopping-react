import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import formatPrice from "../../../utils/common";
const useStyles = makeStyles({
  shortDescription: {
    padding: "12px 0",
  },

  priceBox: {
    padding: "12px 14px",
    marginBottom: '16px',
    backgroundColor: "#f2f2f2",
    borderRadius: "5px",
  },
  originalPrice: {
    fontSize: "20px!important",
    fontWeight: "700!important",
    paddingRight: "12px",
  },
  salePrice: {
    fontSize: "17px!important",
    fontWeight: "400!important",
    paddingRight: "12px",
    textDecoration: "line-through",
  },
});

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const {
    name,
    shortDescription,
    isPromotion,
    originalPrice,
    promotionPercent,
    salePrice,
  } = product;
  return (
    <Box>
      <Typography variant="h4" component="h2">
        {name}
      </Typography>

      <Typography variant="body2" className={classes.shortDescription}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Typography
          variant="body2"
          component="span"
          className={classes.originalPrice}
        >
          {formatPrice(originalPrice)}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className={classes.salePrice}
        >
          {isPromotion ? formatPrice(salePrice) : ""}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className={classes.promotionPercent}
        >
          {isPromotion ? "-" + promotionPercent + "%": ""}
        </Typography>
      </Box>
    </Box>
  );
}

ProductInfo.propTypes = {};

export default ProductInfo;
