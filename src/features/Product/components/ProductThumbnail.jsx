import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { STATIC_HOST, THUMBNAIL_DEMO } from "../../../constants";

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_DEMO;
  return (
    <Box>
      <img src={thumbnailUrl} alt="" width="100%" />
    </Box>
  );
}

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

export default ProductThumbnail;
