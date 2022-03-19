import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import ListPage from './pages/ListPage'

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <ListPage />
    </Box>
  )
}

ProductFeature.propTypes = {}

export default ProductFeature
