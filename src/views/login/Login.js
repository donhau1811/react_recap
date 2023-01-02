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
// import CssBaseline from "@mui/material/CssBaseline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FTextField,
  FormProvider,
  FCheckBox,
} from "../../components/form/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import "./styles.scss";

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

  const defaultValues = {
    email: "",
    password: "",
    remember: false,
  };
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const headers = {
      "x-api-key": "AIzaSyBS6rQ_3nB2TN6NCnFlCzhMYeRGL3WEhZI",
      "x-user-agent-t":
        "bfe6f00df8f7aefbd2660be0d5810cfd.T1629692448457.e048a206b8af0918f3a61cd125ba32e4",
      "x-dev-db-key":
        "c508828c6779fe5b07f9770b0ddf2d1f.T1634806896324.6fa577c015f3345f816c1c1f68fd1e5c",
    };

    const body = {
      username: data.email,
      password: data.password,
      // typeLogin: 1,
    };
    await axios
      .post("https://rsm2021-d3bzmmng.an.gateway.dev/glf_user_auth", body, {
        headers,
      })
      .then((res) => {
        if (res.status === 200) navigate("employee");
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  // useEffect(() => {
  //   console.log(theme);
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack className="login-page">
          {/* <CssBaseline /> */}
          <Container
            sx={{
              marginY: "auto",
              backgroundColor: "#53a881",
            }}
            component="main"
            maxWidth="xs"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box>
                <img
                  src={require("../../assets/logo/logo.svg").default}
                  alt=""
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <FTextField
                  name="email"
                  label="Email"
                  margin="normal"
                  autoComplete="on"
                />
                <FTextField
                  name="password"
                  label="Password"
                  margin="normal"
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
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
                <FCheckBox name="remember" label="Remember me" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
}
