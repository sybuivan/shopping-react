import {
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  boxQuantity: {
    maxWidth: "200px",
    display: "flex",
    justifyContent: "center",
  },
});

function QuantityField(props) {
  const { label, name, errors, control, setValue } = props;
  const classes = useStyles();

//   console.log("setValue", setValue);
  const hasError = errors[name];
  return (
    <FormControl sx={{ m: 1, width: "100%", margin: "0px" }} size="small">
      <Typography variant="body2" mb={1}>
        {label}
      </Typography>
      <Controller
        id={name}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Box className={classes.boxQuantity} mb={2}>
            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                )
              }
              disabled={Number.parseInt(value) === 1 ? true : false} 
            >
              <RemoveIcon />
            </IconButton>
            <OutlinedInput
              type="number"
              id={name}
              fullWidth
              inputProps={{ min: "1", max: "10", step: "1" }}
              value={value}
              variant="outlined"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              error={!!hasError}
            />

            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                )
              }
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

QuantityField.propTypes = {};

export default QuantityField;
