import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const EmpList = () => {
  const [empList, setEmpList] = useState(null);
  const navigate = useNavigate();

  const detailOfEmployee = (id) => {
    navigate("/employee/detail/" + id);
  };

  const editEmployee = (id) => {};

  const removeEmployee = (id) => {};

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpList(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card  d-flex justify-content-center align-items-center">
        <div className="card-title text-center">
          <h2>Employee List</h2>
        </div>
        <div className="card-body">
          <div>
            <Link to="create" className="btn btn-success">
              ADD NEW EMPLOYEE
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {empList?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.employeeName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      onClick={() => editEmployee(item.id)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeEmployee(item.id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => detailOfEmployee(item.id)}
                      className="btn btn-warning"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default EmpList;
