import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Grid, Skeleton } from '@mui/material'

function SkeletonProductList({lenght}) {
  return (
    <Box>
      <Grid container>
         {
            Array.from(new Array(lenght)).map((item, index) => (
               <Grid item key={index} xs={12} sm={6} md={4} lg={3}> 
                  <Box padding={1}>
                     <Skeleton variant="rect" width="100%" height={118}/>

                     <Skeleton />

                     <Skeleton width="60%" />
                  </Box>
               </Grid>
            ))
         }
      </Grid>
    </Box>
  )
}

SkeletonProductList.propTypes = {
   lenght: PropTypes.number
}

SkeletonProductList.defaultProps = {
   lenght: 6
}

export default SkeletonProductList
