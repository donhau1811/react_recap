import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FCheckBox, FormProvider, FTextField } from "../form";

const EmployeeForm = ({
  methods,
  onSubmit,
  text,
  employeeName,
  employeeId,
  employeeActive,
  employeeEmail,
  employeePhone,
}) => {
  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      text={text}
      employeeName={employeeName}
      employeeActive={employeeActive}
      employeeEmail={employeeEmail}
      employeeId={employeeId}
      employeePhone={employeePhone}
    >
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card">
              <div className="card-title text-center">
                <h2>{text}</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <FTextField
                        name="id"
                        label={employeeId ? employeeId : "id"}
                        margin="normal"
                        autoComplete="off"
                        value={employeeId}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <FTextField
                        name="employeeName"
                        label={employeeName ? employeeName : "name"}
                        margin="normal"
                        autoComplete="off"
                        value={employeeName}
                        disabled={!!employeeName}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <FTextField
                        name="email"
                        label={employeeEmail ? employeeEmail : "email"}
                        margin="normal"
                        autoComplete="off"
                        value={employeeEmail}
                        disabled={!!employeeEmail}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <FTextField
                        name="phone"
                        label={employeePhone ? employeePhone : "phone"}
                        margin="normal"
                        autoComplete="off"
                        value={employeePhone}
                        disabled={!!employeePhone}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <FCheckBox name="active" label="Is Active?" checked={employeeActive} disabled={!!employeeActive}/>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Button sx={{ mr: 2 }} variant="contained" type="submit">
                        Save
                      </Button>
                      <Button
                        component={Link}
                        to="/employee"
                        variant="contained"
                        color="error"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EmployeeForm;
