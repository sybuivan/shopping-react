import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

function Register(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values) => {
    try {
      values.username = values.email;

      console.log("form values", values);

      const resultAction = await dispatch(register(values));

      console.log("resultAction", resultAction);

      unwrapResult(resultAction);


      // Do something here on register successfully
      enqueueSnackbar("Register successfully!!", {
        variant: "success",
        autoHideDuration: 2000,
      });

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      // show error message
      console.log("Error message", error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 4000,
      });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleOnSubmit} />
    </div>
  );
}

Register.propTypes = {};

export default Register;
