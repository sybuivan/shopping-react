import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CartList from "./page/CartList";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Grid, Paper } from "@mui/material";
import { IconButton, Container } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },

  contentTitle: {
    display: "grid",
    gridTemplateColumns: "305px 145px 125px 130px 30px",
    alignItems: "center",
    padding: "0 10px",
    marginBottom: '12px'
  },

  removeAll: {},
});

function CartFeature(props) {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <Container>
      <h2>GIỎ HÀNG</h2>
      <Grid container>
        <Grid item className={classes.contentLeft} xs={8}>
          <Paper elevation={0} className={classes.contentTitle}>
            <label htmlFor="">Tất cả {cartItems.length} (sản phẩm)</label>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span className={classes.removeAll}>
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Paper>
          <CartList cartList={cartItems} />
        </Grid>

        <Grid item className={classes.contentRight} xs={4}>
        </Grid>
      </Grid>
    </Container>
  );
}

CartFeature.propTypes = {};

export default CartFeature;
