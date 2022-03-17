import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
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
    position: "relative",
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: "red!important",
  },

  title: {
    textAlign: "center",
    paddingBottom: "10px",
  },

  submit: {
    padding: "8px",
  },
  progress: {
    position: "absolute",
    top: "-5px",
    left: 0,
    right: 0,
  },
});

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid your address email"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  console.log("Is submitting", isSubmitting);

  const handleOnSubmit = async (values, e) => {
    const { onSubmit } = props;

    if (onSubmit) {
      await onSubmit(values);

      // console.log("isSubmitting", isSubmitting);
    }
  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>

      <Typography component="h2" variant="h5" className={classes.title}>
        Login a account
      </Typography>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputField
              errors={errors}
              control={control}
              name="identifier"
              label="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              errors={errors}
              control={control}
              name="password"
              label="Password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              className={classes.submit}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
