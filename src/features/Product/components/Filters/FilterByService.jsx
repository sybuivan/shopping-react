import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "8px",
    marginTop: "10px",
  },

  list: {
    padding: "0px",
    margin: "0",
    listStyleType: "none",
  },
});

function FilterByService({ filters, onChange }) {
  const classes = useStyles();

  const handleOnChange = (e) => {
     if(!onChange) return

     const {name, checked} = e.target
     console.log("Checked", checked);

     onChange({ [name]: checked})
  }
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ</Typography>
      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyến mãi" },
          { value: "isFreeShip", label: "Miễn phí ship" },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleOnChange}
                />
              }
              label={service.label}
              name={service.value}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

FilterByService.propTypes = {};

export default FilterByService;
