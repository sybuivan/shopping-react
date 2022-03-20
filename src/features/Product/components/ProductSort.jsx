import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

function ProductSort({ currentSort, onChange }) {
  const handleOnChangeSort = (event, newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs
      value={currentSort}
      onChange={handleOnChangeSort}
      variant="scrollable"
      scrollButtons={false}
      aria-label="scrollable prevent tabs example"
    >
      <Tab label="Giá từ thấp lên cao" value="salePrice:ASC" />
      <Tab label="Giá từ cao xuống thấp" value="salePrice:DESC" />
    </Tabs>
  );
}

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductSort;
