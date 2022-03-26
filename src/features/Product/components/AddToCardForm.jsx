import React from "react";
import PropTypes from "prop-types";
import { useForm, useFormState } from "react-hook-form";
import InputField from "../../../form-control/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import QuantityField from "../../../form-control/QuantityField/QuantityField";

function AddToCardForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity")
      .min(1, "Please enter at least 1")
      .nullable(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });


  const handleOnSubmit = async (values, e) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>

        <QuantityField
          errors={errors}
          control={control}
          name="quantity"
          label="Quantity"
          setValue={setValue}
        />

        <Button type="submit" variant="contained" size="large">
          Buy
        </Button>
      </form>
    </div>
  );
}

AddToCardForm.propTypes = {};

export default AddToCardForm;
