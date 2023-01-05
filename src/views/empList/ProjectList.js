{/* <div className="container">
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
            <td>STT</td>
            <td>Mã dự án</td>
            <td>Tên dự án</td>
            <td>Địa chỉ</td>
            <td>Tên công ty khách hàng</td>
            <td>Kế toán phụ trách</td>
            <td>Thao tác</td>
          </tr>
        </thead>
        <tbody>
          {empList?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.companyName}</td>
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
</div>; */}
