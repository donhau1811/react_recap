// import React from "react";
// import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import "./styles.scss";

// const Login = () => {
//   return (
//     <div fluid className="login-page d-flex justify-content-center align-items-center  img-fluid">
//       <div className="login-container">
//         <div className="logo">
//           <img
//             src={require("../../assets/logo/logo.svg").default}
//             alt="REE logo"
//           />
//         </div>

//         <Form className="form">
//           <FormGroup>
//             <Label for="exampleEmail">Username</Label>
//             <Input
//               type="email"
//               name="email"
//               id="exampleEmail"
//               placeholder="example@example.com"
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="examplePassword">Password</Label>
//             <Input
//               type="password"
//               name="password"
//               id="examplePassword"
//               placeholder="********"
//             />
//           </FormGroup>
//           <Button className="w-100">Submit</Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, InputLabel, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FTextField, FormProvider } from "../../components/form/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import "./styles.scss";
import useJwt from "../../auth/jwt/useJwt";
import { handleLogin } from "../../redux/actions/auth";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const defaultValues = {
    email: "",
    password: "",
    remember: false,
  };
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const login = async (loginData) => {
    useJwt
      .login(loginData)
      .then(async (res) => {
        if (!res.data.status) {
          throw new Error(res.data.message);
        }

        const data = {
          accessToken: res?.data?.data?.accessToken,
          refreshToken: res?.data?.data?.refreshToken,
          user: res?.data?.data?.user,
        };

        dispatch(handleLogin(data));
        navigate("/project");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    login({
      username: data.email,
      password: data.password,
    });
    // console.log(data.email, data.password);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack className="login-page">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "rgba(4,43,82,.7)",
            }}
          >
            <Container
              sx={{
                backgroundColor: "#042b52",
                p: "auto",
              }}
              component="main"
              maxWidth="xs"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "70vh",
                }}
              >
                <Box sx={{ m: 2 }}>
                  <img
                    src={require("../../assets/logo/logo.svg").default}
                    alt=""
                  />
                </Box>
                <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                  Energy Solutions For Green Life
                </Typography>
                <Box m={1} p={1}>
                  <InputLabel sx={{ color: "#fff" }}>Thư điện tử</InputLabel>
                  <FTextField
                    name="email"
                    margin="normal"
                    autoComplete="on"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white" },
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                  />
                  <InputLabel sx={{ color: "#fff" }}>Mật khẩu</InputLabel>
                  <FTextField
                    name="password"
                    margin="normal"
                    size="small"
                    inputProps={{ style: { color: "white" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "white" },
                      },
                    }}
                    autoComplete="on"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: 5 }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                  <Grid container>
                    <Grid xs></Grid>
                    <Grid>
                      <Link
                        href="#"
                        variant="body2"
                        sx={{ textDecoration: "none", color: "#8aaccb" }}
                      >
                        Quên mật khẩu?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </Box>
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
}
