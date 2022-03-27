import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";
import formatPrice from '../../../utils/common'

const useStyles = makeStyles({
  boxCartItem: {
    display: "grid",
    gridTemplateColumns: "305px 145px 125px 130px 30px",
    alignItems: "center",
    marginBottom: "12px",
    padding: "20px 12px",
  },

  wrapperProduct: {
    display: "flex",
    alignItems: "center",
  },

  productImage: {
    display: "flex",
    marginLeft: "8px",

    "& > img": {
      width: "90px",
      height: "90px",
      marginRight: "12px",
    },
  },

  productName: {
    fontWeight: "700",
    fontSize: "13px",
  },
  productPrice: {
    fontWeight: "700",
  },
});

function CartItem({ cart }) {
  const classes = useStyles();
  const {
    product: { name, salePrice, thumbnail },
    quantity,
  } = cart;

  const thumbnailUrl = thumbnail
    ? `${STATIC_HOST}${thumbnail?.url}`
    : THUMBNAIL_DEMO;
  return (
    <Paper elevation={0}>
      <Box className={classes.boxCartItem}>
        <Box className={classes.wrapperProduct}>
          <label htmlFor="">
            <input type="checkbox" />
          </label>
          <Box className={classes.productImage}>
            <img src={thumbnailUrl} alt="" />
            <span className={classes.productName}>{name}</span>
          </Box>
        </Box>
        <span className={classes.productPrice}>{formatPrice(salePrice)}</span>
        <p>{quantity}</p>
        <p>{formatPrice(salePrice*quantity)}</p>
      </Box>
    </Paper>
  );
}

CartItem.propTypes = {};

export default CartItem;
