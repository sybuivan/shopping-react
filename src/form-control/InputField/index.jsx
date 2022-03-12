import React from 'react'
import PropTypes from 'prop-types'
import {Controller} from 'react-hook-form'
import { TextField } from '@mui/material'

function InputField(props) {
  const {form, label, name} = props
  const  {formState: { errors } } = form
  // const { touchedFields } = formState;
  // formState.touched[name] && errors[name]
  const hasError = errors[name]

  return (
    <Controller
      name={name}
      control={form.control}
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
