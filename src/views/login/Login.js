import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./styles.scss";

const Login = () => {
  return (
    <div fluid className="login-page d-flex justify-content-center align-items-center  img-fluid">
      <div className="login-container">
        <div className="logo">
          <img
            src={require("../../assets/logo/logo.svg").default}
            alt="REE logo"
          />
        </div>

        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
          <Button className="w-100">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
