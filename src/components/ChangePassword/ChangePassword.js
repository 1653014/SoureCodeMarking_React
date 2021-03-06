import React, { useState } from "react";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { withAxios } from "../../axios/index";
import Navigation from "../Navigation/Navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    justifyContent: "center",
  },
}));

const ConfirmPass = ({ axios }) => {
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.text}>
              Đổi mật khẩu
            </Typography>
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirm: "",
              }}
              validationSchema={Yup.object({
                oldPassword: Yup.string()
                  .min(6, "Ít nhất 6 kí tự")
                  .required("Vui lòng không để trống"),
                password: Yup.string()
                  .min(6, "Ít nhất 6 kí tự")
                  .required("Vui lòng không để trống"),
                confirm: Yup.string().when("password", {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Xác nhận mật khẩu không đúng"
                  ),
                }),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const header = {
                  "Content-Type": "application/json",
                };
                setMessage("");
                axios
                  .put(
                    `users/password`,

                    {
                      old_password: values.oldPassword,
                      new_password: values.password,
                    },
                    {
                      headers: header,
                    }
                  )
                  .then((response) => {
                    if (response.status === 204) {
                      setSubmitting(false);
                      setMessage("Đổi mật khẩu thành công!");
                      setTypeAlert(ALERT_TYPE.SUCCESS);
                      resetForm({});
                    }
                  })
                  .catch((error) => {
                    if (
                      error.response.data.error.message ===
                      "Invalid old password"
                    ) {
                      setMessage("");
                      setMessage("Mật khẩu cũ không đúng");
                      setTypeAlert(ALERT_TYPE.WARNING);
                      resetForm({});
                    }
                    if (
                      error.response.data.error.message === "Not have password"
                    ) {
                      setMessage("");
                      setMessage(
                        "Bạn đang đăng nhập bằng Google hoặc Facebook"
                      );
                      setTypeAlert(ALERT_TYPE.WARNING);
                      resetForm({});
                    }
                    setSubmitting(false);
                  })
                  .finally(() => {});
              }}
              handleReset={({ resetForm }) => {
                resetForm({});
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Grid container spacing={2} className={classes.submit}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        type="password"
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : ""
                        }
                        error={Boolean(errors.password && touched.password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        label="Mật khẩu mới"
                        name="password"
                        type="password"
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : ""
                        }
                        error={Boolean(errors.password && touched.password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        label="Nhập lại mật khẩu"
                        name="confirm"
                        type="password"
                        helperText={
                          errors.confirm && touched.confirm
                            ? errors.confirm
                            : ""
                        }
                        error={Boolean(errors.confirm && touched.confirm)}
                      />
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Đổi mật khẩu
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
          <Alert message={message} type={typeAlert} />
        </Container>
      </div>
    </div>
  );
};
export default withAxios(ConfirmPass);
