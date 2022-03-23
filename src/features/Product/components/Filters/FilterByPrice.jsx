import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RX_LIVE } from "../../../../constants";

const useStyles = makeStyles({
  textPrice: {
    color: "rgb(133, 133, 133)",
  },

  boxedTextPrice: {
    display: "flex",
    marginBottom: "12px",
  },

  textField: {
    height: "40px",
  },

  spanSubtraction: {
    margin: "2px 4px",
    color: "#c1c1c1",
    fontSize: "20px",
  },

  boxedButton: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleObSubmit = () => {
    console.log("values", values);
    //  neu thang cha co truyen onChange vao thi se goi onChange roi truyen object lên
    if (onChange) onChange(values);
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  const handleOnChange = (e) => {
    if (RX_LIVE.test(e.target.value)) {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" className={classes.textPrice}>
        Chọn khoảng giá
      </Typography>
      <Box className={classes.boxedTextPrice}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleOnChange}
          size="small"
        />
        <span className={classes.spanSubtraction}> - </span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleOnChange}
          size="small"
        />
      </Box>

      <Box className={classes.boxedButton}>
        <Button variant="outlined" color="primary" onClick={handleObSubmit}>
          Áp dụng
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            setValues({
              salePrice_gte: 0,
              salePrice_lte: 0,
            })
          }
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

FilterByPrice.propTypes = {};

export default FilterByPrice;
