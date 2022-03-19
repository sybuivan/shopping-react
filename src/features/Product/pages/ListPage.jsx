import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "../../../api/productApi";
import SkeletonProductList from "../components/SkeletonProductList";
import ProductList from "../components/ProductList";

const useStyles = makeStyles({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },
  pagination: {
    margin: "20px 0",
    justifyContent: "center",
    display: "flex",
  },
});

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
  });
  // console.log('pagination', pagination);
  console.log('loading: ',loading);
  useEffect(() => {
    try {
      (async () => {
        const { data, pagination } = await productApi.getAll(filters);
        console.log({ data, pagination });
        setPagination(pagination);
        setProductList(data.data);

        setLoading(false);
      })();
    } catch (error) {
      console.log("fail to get product: ", error);
    }
  }, [filters]);

  // handle onChange pagination
  const handleOnChangePage = (e, page) => {
    // setFilters
    setFilters(preFilter => ({
      ...preFilter,
      _page: page,
    }))
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? (
                <SkeletonProductList lenght={10} />
              ) : (
                <ProductList data={productList} />
              )}

              <Pagination
                count={Math.ceil((pagination.total.data/pagination.limit))}
                color="primary"
                page={pagination.page}
                className={classes.pagination}
                onChange={handleOnChangePage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
