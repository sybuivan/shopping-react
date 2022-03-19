import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "../../../api/productApi";

const useStyles = makeStyles({
   root: {},

   left: {
      width: '250px'
   },

   right: {
      flex: '1 1 auto',
   }
})

function ListPage(props) {
   const classes = useStyles();

   useEffect(() => {
    (async () => {
      const response = await productApi.getAll({_page: 1, _limit: 20})
      console.log(response);
    })()

   }, [])
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>Left column</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
