import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import InputField from "../../../../form-control/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordField from "../../../../form-control/PasswordField";

const useStyles = makeStyles({
  root: {
    paddingTop: "10px",
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: "red",
  },

  title: {
    textAlign: "center",
    paddingBottom: "10px",
  },

  submit: {
    padding: "8px",
  },
});

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter fullName")
      .test(
        "Should has at least two words",
        "Please enter at least two words",
        (value) => {
          console.log("Value full name", value);
          return value.split(" ").length >= 2;
        }
      ),

    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid your address email"),

    passWord: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),

    retypePassWord: yup.string().required("Please retype your retypePassWord").oneOf([yup.ref('passWord')], "Password does not match")
              
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

  // const {isSubmitting} = useFormState()

  const handleSubmit = (values, e) => {
    const {onSubmit} = props;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(onSubmit) {
          onSubmit(values)
          
          // console.log("isSubmitting", isSubmitting);
          e.target.reset();
        }

        resolve(true)

      }, 2000)
    })

    // console.log();
    
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
          <Grid item xs={12}>
            <InputField form={form} name="fullName" label="Full Name" />
          </Grid>
          <Grid item xs={12}>
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
