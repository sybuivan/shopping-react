import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Button, IconButton, Paper } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";
import formatPrice from "../../../utils/common";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../cartSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const useStyles = makeStyles({
  boxCartItem: {
    display: "grid",
    gridTemplateColumns: "305px 120px 149px 134px 30px",
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
  boxQuantity: {
    display: "flex",

    "& > input": {
      width: "30px",
      height: "30px",
      ouline: "none",
      textAlign: "center",
    },
  },
});

function CartItem({ cart }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    product: { name, salePrice, thumbnail },
    quantity,
    id,
  } = cart;

  const handleAddQuantity = () => {
    const action = setQuantity({
      id: id,
      quantity: quantity + 1,
    });

    dispatch(action);
  };
  const handleRemoveQuantity = () => {
    const action = setQuantity({
      id: id,
      quantity: quantity - 1,
    });

    dispatch(action);
  };

  const handleOnChange = (e) => {};

  const handleRemoveCart = () => {
    dispatch(removeFromCart({id}))
    setOpen(false)
  }


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
        <Box className={classes.boxQuantity}>
          <IconButton
            onClick={handleRemoveQuantity}
            disabled={quantity > 1 ? false : true}
          >
            <RemoveIcon />
          </IconButton>
          <input type="text" value={quantity} onChange={handleOnChange} />
          <IconButton onClick={handleAddQuantity}>
            <AddIcon />
          </IconButton>
        </Box>
        <p style={{ color: "red" }}>{formatPrice(salePrice * quantity)}</p>
        <IconButton onClick={() => setOpen(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <WarningAmberIcon style={{ color: "#fc8918", marginRight: '8px' }} />
          <span>Xoá sản phẩm</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa sản phẩm đang chọn?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCart} variant="outlined">Xác nhận</Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

CartItem.propTypes = {};

export default CartItem;
