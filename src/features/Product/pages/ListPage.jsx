import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useState } from "react";
import productApi from "../../../api/productApi";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import SkeletonProductList from "../components/SkeletonProductList";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import FilterViewer from "../components/FilterViewer";
import { Outlet, useLocation, useNavigate } from "react-router";
import queryString from 'query-string'

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  boxedWarning: {
    padding: "8px 12px",
    border: "1px solid red",
    marginTop: "20px",
  },

  iconWarning: {
    color: "red",
    marginRight: "12px",
  },
});

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate()
  const location = useLocation();

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: "salePrice:ASC",
  // });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true'
    }
  }, [location.search])

  console.log('queryParams', queryParams)
  

  useEffect(() => {
    try {
      (async () => {
        const { data, pagination } = await productApi.getAll(queryParams);
        // console.log({ data, pagination });
        setPagination(pagination);
        setProductList(data.data);

        // console.log(data.data);

        setTotalPage(Math.ceil(pagination.total.data / pagination.limit));

        setLoading(false);
      })();
    } catch (error) {
      console.log("fail to get product: ", error);
    }
  }, [queryParams]);

  // handle onChange pagination
  const handleOnChangePage = (e, page) => {
    // setFilters
    const filters = {
      ...queryParams,
      _page: page
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
    setLoading(true);
  };

  const handleOnChangeSort = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue
    }
    
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
    setLoading(true);
  };

  const handleFilterChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters
    }
    
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
    setLoading(true);
    // console.log("productList", productList);
  };

  const setFiltersViewer = (newFilters) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
    setLoading(true);
  };

  // useEffect(() => {
  //   navigate({
  //     pathname: location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [navigate, filters])

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleOnChangeSort}
              />

              <FilterViewer
                onChange={setFiltersViewer}
                filters={queryParams}
              />

              <Box>
                {productList.length === 0 ? (
                  <Box className={classes.boxedWarning}>
                    <Typography className={classes.textWaring}>
                      <ReportGmailerrorredIcon
                        className={classes.iconWarning}
                      />
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
                count={totalPage}
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
