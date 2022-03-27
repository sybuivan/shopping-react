import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
  const {label, name, errors, control} = props
  // const { touchedFields } = formState;
  // formState.touched[name] && errors[name]
  const hasError = errors[name]

  return (
    <Controller
      name={name}
      control={control}
      width="100%"
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          label={label}
          fullWidth
          variant="outlined"
          margin="dense"
          onChange={onChange}
          onBlur={onBlur}
          selected={value}
          error={!!hasError}
          helperText={errors[name]?.message}
        />)}
    />
  )
}

InputField.propTypes = {}

export default InputField
