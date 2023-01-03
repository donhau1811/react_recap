// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmpList = () => {
//   const [empList, setEmpList] = useState(null);
//   const navigate = useNavigate();

//   const detailOfEmployee = (id) => {
//     navigate("/project/detail/" + id);
//   };

//   const editEmployee = (id) => {};

//   const removeEmployee = (id) => {};

//   const headers = {
//     "x-api-key": "AIzaSyBS6rQ_3nB2TN6NCnFlCzhMYeRGL3WEhZI",
//     "x-user-agent-t":
//       "bfe6f00df8f7aefbd2660be0d5810cfd.T1629692448457.e048a206b8af0918f3a61cd125ba32e4",
//     "ree_user_id": "188",
//     "ree_token":
//       "b89732125abc453d3c9539318f568b6f.T1672711022001.c8a768dccd0ac98a527670741eb05891",
//   };

//   const body = {
//     limit: 25,
//     offset: 0,
//     sortBy: "id",
//     sortDirection: "asc",
//   };

//   useEffect(() => {
//     axios
//       .post(
//         "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
//         body,
//         {
//           headers,
//         }
//       )
//       .then((resp) => {
//         setEmpList(resp.data.data);
//         console.log(resp);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);


//   return (
//     <div className="container">
//       <div className="card  d-flex justify-content-center align-items-center">
//         <div className="card-title text-center">
//           <h2>Employee List</h2>
//         </div>
//         <div className="card-body">
//           <div>
//             <Link to="create" className="btn btn-success">
//               ADD NEW EMPLOYEE
//             </Link>
//           </div>
//           <table className="table table-bordered">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <td>STT</td>
//                 <td>Mã dự án</td>
//                 <td>Tên dự án</td>
//                 <td>Địa chỉ</td>
//                 <td>Tên công ty khách hàng</td>
//                 <td>Kế toán phụ trách</td>
//                 {/* <td>Trạng thái</td> */}
//                 <td>Thao tác</td>
//               </tr>
//             </thead>
//             <tbody>
//               {empList?.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.code}</td>
//                   <td>{item.name}</td>
//                   <td>{item.address}</td>
//                   <td>{item.companyName}</td>
//                   {/* <td>{item.capacity}</td> */}
//                   <td>{item.phone}</td>
//                   <td>
//                     <button
//                       onClick={() => editEmployee(item.id)}
//                       className="btn btn-success"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => removeEmployee(item.id)}
//                       className="btn btn-danger"
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={() => detailOfEmployee(item.id)}
//                       className="btn btn-warning"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default EmpList;

