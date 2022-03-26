import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Link, useParams, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width:'50%',
    margin: 'auto',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '12px 0'
  },
  linkMenu: {
    listStyleType: "none",
    padding: "0 10px",

    "& > a": {
      textDecoration: "none",
      color: "#4e07b0",
      fontWeight: "500",
      fontSize: "18px",
    },
  },
});

function ProductMenu(props) {
  const classes = useStyles();
  let { productId } = useParams();
  const pathname = `products/${productId}`

  return (
    <Box>
      <Box component="ul" className={classes.root}>
        <li className={classes.linkMenu}>
          <Link to="">Description</Link>
        </li>
        <li className={classes.linkMenu}>
          <Link to="information">Additional Information</Link>
        </li>
        <li className={classes.linkMenu}>
          <Link to="review">Review</Link>
        </li>
      </Box>
    </Box>
  );
}

ProductMenu.propTypes = {};

export default ProductMenu;
