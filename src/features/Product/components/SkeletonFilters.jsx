import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  boxSkeleton: {
    display: "flex",
    justifyContent: "space-between"
  }
})

function SkeletonFilters({ lenght }) {
  const classes = useStyles();

  return (
    <Box>
      {Array.from(new Array(lenght)).map((item, index) => (
        <Box padding={1} key={index}>
          <Skeleton width="100%" />
        </Box>
      ))}
      {/* <Box>
        <Skeleton width="50%" />
        <Box className={classes.boxSkeleton}>
          <Skeleton width="40%" height="50px" />
          <Skeleton width="40%" height="50px" />
        </Box>
        <Box className={classes.boxSkeleton}>
          <Skeleton width="40%" height="50px"/>
          <Skeleton width="40%" height="50px"/>
        </Box>
      </Box> */}
    </Box>
  );
}

SkeletonFilters.propTypes = {};

export default SkeletonFilters;
