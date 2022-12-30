import React, { useState, useEffect } from "react";
import EmployeeForm from "../../components/employeeForm/EmployeeForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EmpDetail = () => {
  const { empId } = useParams();
  const [empDetail, setEmpDetail] = useState({});

  const defaultValues = {
    employeeName: "",
    email: "",
    phone: "",
    active: false,
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empId)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpDetail(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empId]);

  return (
    <EmployeeForm
      methods={methods}
      onSubmit={handleSubmit}
      text="Employee Detail"
      employeeName={empDetail.employeeName}
      employeeId={empDetail.id}
      employeeActive={empDetail.active}
      employeePhone={empDetail.phone}
      employeeEmail={empDetail.email}
    />
  );
};

export default EmpDetail;
