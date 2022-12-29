import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const EmpList = () => {
  const [empList, setEmpList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => setEmpList(resp))
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
            <Link to='create' className="btn btn-success">ADD NEW EMPLOYEE</Link>
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
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <a
                      className="btn btn-success"
                      href="https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2#_5-navigate-programmatically-8"
                    >
                      Edit
                    </a>
                    <a
                      className="btn btn-danger"
                      href="https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2#_5-navigate-programmatically-8"
                    >
                      Remove
                    </a>
                    <a
                      className="btn btn-warning"
                      href="https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2#_5-navigate-programmatically-8"
                    >
                      Details
                    </a>
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
