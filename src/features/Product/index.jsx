import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import ListPage from "./pages/ListPage";
import { Route, Routes } from "react-router";
import DetailProduct from "./pages/DetailProduct";
import ProductDesciption from "./components/ProductDesciption";
import ProductInformation from "./components/ProductInformation";

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":productId/*" element={<DetailProduct />} />
      </Routes>
    </Box>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
