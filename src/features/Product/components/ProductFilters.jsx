import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import FilterByCategory from './Filters/FilterByCategory'
import { makeStyles } from "@mui/styles";
import SkeletonFilters from './SkeletonFilters';
import FilterByPrice from './Filters/FilterByPrice';

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

  const handlePriceChange = (values) => {
    if(onChange) onChange(values)
  }

  return (
    <Box className={classes.root}>
      Danh mục sản phẩm
      <FilterByCategory onChange={handleCategoryChange}/>
      <FilterByPrice onChange={handlePriceChange}/>
    </Box>
  )
}

ProductFilter.propTypes = {}

export default ProductFilter
