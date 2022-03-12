import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { OutlinedInput } from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

function PasswordField(props) {
  const { label, name, form } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        id={name}
        name={name}
        control={form.control}
        width="100%"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            label={label}
            fullWidth
            variant="outlined"
            margin="dense"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
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
    </FormControl>
  );
}

PasswordField.propTypes = {};

export default PasswordField;
