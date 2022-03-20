import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

function SkeletonFilters({ lenght }) {
   console.log('categoryList.length', lenght);
  return (
    <Box>
      {Array.from(new Array(lenght)).map((item, index) => (
        <Box padding={1} key={index}>
          <Skeleton width="100%" />
        </Box>
      ))}
    </Box>
  );
}

SkeletonFilters.propTypes = {};

export default SkeletonFilters;
