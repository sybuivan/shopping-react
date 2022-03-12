import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Grid, Typography,Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../form-control/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordField from "../../../../form-control/PasswordField";

const useStyles = makeStyles({
  root:{
    paddingTop: '10px',

  },

  avatar: {
    margin: '0 auto',
    backgroundColor: 'red'
  },

  title: {
    textAlign: 'center',
    paddingBottom: '10px'
  },

  submit: {
    padding: '8px'
  },
})

function RegisterForm(props) {

  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter fullName")
      .min(5, "Title is to short"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      passWord: "",
      retypePassWord: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log("Form values", values);
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>

      <Typography component="h2" variant="h5" className={classes.title}>
        Create a account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField form={form} name="fullName" label="Full Name" />
          </Grid>
          <Grid item xs={6}>
            <InputField form={form} name="email" label="Email" />
          </Grid>
          <Grid item xs={12}>
            <PasswordField form={form} name="passWord" label="Password" />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              form={form}
              name="retypePassWord"
              label="Retype Password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Register
            </Button>

          </Grid>
        </Grid>

      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
