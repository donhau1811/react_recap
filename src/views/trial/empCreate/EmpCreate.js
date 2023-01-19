import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EmployeeForm from "../../../components/employeeForm/EmployeeForm";

const schema = yup
  .object({
    employeeName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
  })
  .required();

export default function EmpCreate() {
  const navigate = useNavigate();

  const defaultValues = {
    employeeName: "",
    email: "",
    phone: "",
    active: false,
  };

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully");
        navigate("/employee");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <EmployeeForm
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      text="Employee Create"
      // employeeName
      // employeeId
      // employeeActive
      // employeePhone
      // employeeEmail
    />
  );
}

// const EmpCreate = () => {
//   const [id, idchange] = useState("");
//   const [name, namechange] = useState("");
//   const [email, emailchange] = useState("");
//   const [phone, phonechange] = useState("");
//   const [active, activechange] = useState(true);
//   const [validation, valchange] = useState(false);

//   const navigate = useNavigate();

//   const handlesubmit = (e) => {
//     e.preventDefault();
//     const empdata = { name, email, phone, active };

//     fetch("http://localhost:8000/employee", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(empdata),
//     })
//       .then((res) => {
//         alert("Saved successfully.");
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return (
//     <div>
//       <div className="row">
//         <div className="offset-lg-3 col-lg-6">
//           <form className="container" onSubmit={handlesubmit}>
//             <div className="card" style={{ textAlign: "left" }}>
//               <div className="card-title">
//                 <h2>Employee Create</h2>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>ID</label>
//                       <input
//                         value={id}
//                         disabled="disabled"
//                         className="form-control"
//                       ></input>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>Name</label>
//                       <input
//                         required
//                         value={name}
//                         onMouseDown={(e) => valchange(true)}
//                         onChange={(e) => namechange(e.target.value)}
//                         className="form-control"
//                       ></input>
//                       {name.length == 0 && validation && (
//                         <span className="text-danger">Enter the name</span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>Email</label>
//                       <input
//                         value={email}
//                         onChange={(e) => emailchange(e.target.value)}
//                         className="form-control"
//                       ></input>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label>Phone</label>
//                       <input
//                         value={phone}
//                         onChange={(e) => phonechange(e.target.value)}
//                         className="form-control"
//                       ></input>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="form-check">
//                       <input
//                         checked={active}
//                         onChange={(e) => activechange(e.target.checked)}
//                         type="checkbox"
//                         className="form-check-input"
//                       ></input>
//                       <label className="form-check-label">Is Active</label>
//                     </div>
//                   </div>
//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <button className="btn btn-success" type="submit">
//                         Save
//                       </button>
//                       <Link to="/employee" className="btn btn-danger">
//                         Back
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpCreate;
