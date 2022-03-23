import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const useStyles = makeStyles({
  root: {
    padding: '12px'
  }
})

function ProductFilter({filters, onChange}) {
  const classes = useStyles()

  const handleCategoryChange = (newCategoryId) => {
    if(!onChange) return

    const newFilters = {
      ...filters,
      'category.id': newCategoryId
    }

    onChange(newFilters)
  }

  const handleChange = (values) => {

    if(onChange) onChange(values)
    console.log('value checked ', values)
  }


  // console.log('Filter product filters', filters);

  return (
    <Box className={classes.root}>
      Danh mục sản phẩm
      <FilterByCategory onChange={handleCategoryChange}/>
      <FilterByPrice onChange={handleChange}/>
      <FilterByService onChange={handleChange} filters={filters}/>
    </Box>
  )
}

ProductFilter.propTypes = {}

export default ProductFilter
