import React from "react";
import PropTypes from "prop-types";
import CartItem from "../components/CartItem";
import Images from "../../../constants/images";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function CartList({ cartList }) {
  console.log("cartList", cartList);
  const navigate = useNavigate();
  
  if (cartList.length > 0) {
    return (
      <div>
        {cartList.map((cart) => (
          <CartItem cart={cart} key={cart.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img src={Images.EMPTY_CART} alt="" style={{ marign: "auto" }} />
          <p style={{ textAlign: "center" }}>
            Không có sản phẩm nào trong giỏ hàng của bạn.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="warning"
              variant="contained"
              onClick={() => navigate("/products")}
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CartList.propTypes = {};

export default CartList;
