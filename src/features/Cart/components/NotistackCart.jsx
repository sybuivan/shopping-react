import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { hiddenMiniCart } from "../cartSlice";

const useStyles = makeStyles({
  paperBox: {
    position: "relative",
    width: '100%'
  },
  
  wrapper: {
    padding: "12px 10px",
    // animation: "myEffect 3s ease",
    position: "absolute",
    top: 0,
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    right: '32px',
    borderRadius: '4px'
  },

  
  boxButton: {
    marginTop:'12px',

    '& > button': {
      marginRight: '8px'
    }
  }
});


function NotistackCart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleClose = () => {
    dispatch(hiddenMiniCart())
  }
  return (
    <Box className={classes.paperBox}>
      <Box className={classes.wrapper}>
        <span>Thêm sản phẩm vào giỏ hành thành công</span>
        <Box className={classes.boxButton}>
          <Button variant="contained" color="primary" onClick={() => navigate('/cart')}>Đi đến giỏ hàng</Button>
          <Button variant="contained" color="error" onClick={handleClose}>Đóng</Button>
        </Box>
      </Box>
    </Box>
  );
}

NotistackCart.propTypes = {};

export default NotistackCart;
