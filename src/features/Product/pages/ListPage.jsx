import { Box, Container, Grid, Pagination, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import SkeletonProductList from "../components/SkeletonProductList";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const useStyles = makeStyles({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },
  pagination: {
    padding: "20px 0",
    justifyContent: "center",
    display: "flex",
  },

  textWaring: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxedWarning: {
    padding: '8px 12px',
    border: '1px solid red',
    marginTop: '20px'
  },

  iconWarning: {
    color: 'red',
    marginRight: '12px'
  }
});

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
    _sort: "salePrice:ASC",
  });
  // console.log('pagination', pagination);
  console.log("loading: ", loading);
  useEffect(() => {
    try {
      (async () => {
        const { data, pagination } = await productApi.getAll(filters);
        // console.log({ data, pagination });
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
    setFilters((preFilter) => ({
      ...preFilter,
      _page: page,
    }));
  };

  const handleOnChangeSort = (newSortValue) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _sort: newSortValue,
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));

    console.log("productList", productList);
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={filters._sort}
                onChange={handleOnChangeSort}
              />

              <Box>
                {productList.length === 0 ? (
                  <Box className={classes.boxedWarning}>
                    <Typography className={classes.textWaring}>
                      <ReportGmailerrorredIcon className={classes.iconWarning}/>
                      Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của
                      bạn
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </Box>

              {loading ? (
                <SkeletonProductList lenght={10} />
              ) : (
                <ProductList data={productList} />
              )}

              <Pagination
                count={Math.ceil(pagination.total.data / pagination.limit)}
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
