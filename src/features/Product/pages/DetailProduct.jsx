import {
  Container,
  Grid,
  LinearProgress,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { addToCart, showMiniCart } from "../../Cart/cartSlice";
import AddToCardForm from "../components/AddToCardForm";
import ProductDesciption from "../components/ProductDesciption";
import ProductInfo from "../components/ProductInfo";
import ProductInformation from "../components/ProductInformation";
import ProductMenu from "../components/ProductMenu";
import ProductReview from "../components/ProductReview";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetail";

const useStyles = makeStyles({
  left: {
    width: "250px",
    borderRight: "2px solid #ccc",
    padding: "12px",
  },

  right: {
    flex: "1 1 0",
    padding: "12px",
  },
  productBox: {
    // width: "50%",
    margin: "auto",
  },

  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
});

function DetailProduct(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const { productId } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return (
      <Box className={classes.progress}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  const handleAddToCardForm = ({ quantity }) => {
    const action = addToCart({
      id: productId,
      product,
      quantity,
    });

    dispatch(action);
    dispatch(showMiniCart());
  };
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left} xs={5}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right} xs={7}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCardForm} />
            </Grid>
          </Grid>
        </Paper>

        <Box className={classes.productBox}>
          <ProductMenu />

          <Routes>
            <Route path="/" element={<ProductDesciption product={product} />} />
            <Route
              path="information"
              element={<ProductInformation product={product} />}
            />
            <Route
              path="review"
              element={<ProductReview product={product} />}
            />
          </Routes>

          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}

DetailProduct.propTypes = {};

export default DetailProduct;
