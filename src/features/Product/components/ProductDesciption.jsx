import React, { useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import { Button, Paper } from "@mui/material";

function ProductDesciption({ product: { description } }) {
  const safeDesciption = DOMPurify.sanitize(description);
  const [seeMore, setSeeMore] = useState(true);
  const handleSeeMore = () => {
    setSeeMore(false);
  };
  const handleHidden = () => {
    setSeeMore(true);
  };

  const style = {
    padding: "20px",
    overflow: "hidden",
    height: seeMore ? "1000px" : "100%",
    marginBottom: '12px'
  };

  return (
    <Paper elevation={0}>
      <div dangerouslySetInnerHTML={{ __html: safeDesciption }} style={style} />
      {seeMore ? (
        <Button onClick={handleSeeMore} variant="contained">
          See more
        </Button>
      ) : (
        <Button onClick={handleHidden} variant="contained">
          Hidden
        </Button>
      )}
    </Paper>
  );
}

ProductDesciption.propTypes = {
  product: PropTypes.object,
};

export default ProductDesciption;
