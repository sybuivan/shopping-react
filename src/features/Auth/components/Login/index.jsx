import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../userSlice";
import LoginForm from "../LoginForm";

function Login(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values) => {
    try {

      console.log("form values", values);

      const resultAction = await dispatch(login(values));

      unwrapResult(resultAction);


      // Do something here on register successfully

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
      <LoginForm onSubmit={handleOnSubmit} />
    </div>
  );
}

Login.propTypes = {};

export default Login;
