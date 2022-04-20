import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

function PasswordField(props) {
  const { label, name ,errors, control} = props;

  const hasError = errors[name]
  // console.log('Has error', hasError);

  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <FormControl sx={{ m: 1, width: "100%",margin:"0px" }} >
      <InputLabel htmlFor={name} error={!!hasError}>{label}</InputLabel>
      <Controller
        id={name}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            label={label}
            id={name}
            fullWidth
            variant="outlined"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            error={!!hasError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

PasswordField.propTypes = {};

export default PasswordField;
