import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";
import {
  FormProvider,
  FTextField,
  FSelect,
  FDatePicker,
} from "../../components/form/index";
import DataTable from "react-data-table-component";
import { Code } from "react-feather";
import classNames from "classnames";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CP from "../../components/pagination/index";
import "./styles.scss";

const style = {
  width: "30vw",
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: 4,
};

const InputLabel1 = styled(InputLabel)(() => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: "#000",
  marginTop: "10px",
  marginBottom: "10px",
}));

const EmpList = () => {
  const [empList, setEmpList] = useState(null);
  const [userList, setUserList] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  const [roofRentalList, setRoofRentalList] = useState(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const replaceIdByUserName = (listId) => {
    return (listId || [])
      ?.map(
        (item) => userList?.find((data) => data?.id === item)?.fullName || ""
      )
      ?.toString();
  };

  useEffect(() => {
    axios
      .get("https://rsm2021-d3bzmmng.an.gateway.dev/glf_user?rowsPerPage=9999")
      .then((resp) => {
        setUserList(resp.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dev---core-api-nnoxwxinaq-as.a.run.app/customer/all")
      .then((resp) => {
        setCustomerList(resp.data.data);
        console.log(resp.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const body = {
      limit: 25,
      offset: 0,
      sortBy: "code",
      sortDirection: "asc",
    };

    axios
      .post(
        "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
        body
      )
      .then((resp) => {
        const newData = (resp.data.data || [])?.map((item) => ({
          ...item,
          userIds: replaceIdByUserName(item.userIds),
        }));
        setEmpList(newData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const methods = useForm();
  const { handleSubmit } = methods;

  const columns = [
    {
      name: "STT",
      selector: "id",
      center: true,
      maxWidth: "50px",
    },
    {
      name: "Mã dự án",
      selector: "code",
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Tên dự án",
      sortable: true,
      selector: "name",
      minWidth: "100px",
    },
    {
      name: "Địa chỉ",
      selector: "address",
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "Tên công ty khách hàng",
      selector: "companyName",
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Kế toán phụ trách",
      selector: "userIds",
      minWidth: "200px",
      cell: (row) => {
        return (
          <>
            <div id={`user_name${row.id}`} className="text-truncate">
              {row.userIds}
            </div>
          </>
        );
      },
    },
  ];

  // const currentPage = 1

  const CustomPagination = () => {
    const count = Math.ceil(empList?.length / 10);

    return (
      <CP
        totalRows="10"
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handleChangePage}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination react-paginate px-1"}
        pageRange={2}
        nextPagesClassName={"page-item next"}
        nextPagesLinkClassName={"page-link double"}
        nextPagesLabel={""}
        previousPagesClassName={"page-item prev"}
        previousPagesLinkClassName={"page-link double"}
        previousPagesLabel={""}
        rowsPerPage={10}
        rowsPerPageOptions={[
          { label: 10, value: 10 },
          { label: 25, value: 25 },
          { label: 50, value: 50 },
          { label: 75, value: 75 },
          { label: 100, value: 100 },
        ]}
        // handlePerPage={handlePerPage}
        displayUnit="dự án"
      />
    );
  };

  const handleChangePage = (e) => {
    const body = {
      limit: 10,
      offset: 10 * e.selected,
      sortBy: "code",
      sortDirection: "asc",
    };
    axios
      .post(
        "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
        body
      )
      .then((resp) => {
        const newData = (resp.data.data || [])?.map((item) => ({
          ...item,
          userIds: replaceIdByUserName(item.userIds),
        }));
        setEmpList(newData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Container maxWidth="lg">
        <Grid
          container
          rowSpacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            // m: 1,
          }}
        >
          <Grid item xs>
            {" "}
            <IconButton onClick={toggle}>
              <FilterAltIcon aria-label="filter projects" fontSize="large" />
            </IconButton>
          </Grid>
          <Modal
            open={open}
            onClose={toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={Backdrop}
            slotProps={{
              timeout: 500,
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "18px",
                    textTransform: "uppercase",
                    color: "#042b52",
                  }}
                  id="modal-modal-title"
                >
                  Lọc thông tin dự án
                </Typography>
                <Divider sx={{ backgroundColor: "black", mt: 2 }} />
                <Box sx={{ mt: 2 }}>
                  <InputLabel1 htmlFor="customer">Khách hàng</InputLabel1>
                  <FSelect name="customer" id="customer" size="small">
                    {customerList?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.fullName}
                      </option>
                    ))}
                  </FSelect>
                  <InputLabel1 htmlFor="roofRental">
                    Đơn vị cho thuê mái
                  </InputLabel1>
                  <FSelect name="roofRental" id="roofRental" size="small">
                    {[
                      { code: "HCMC", label: "Ho Chi Minh City" },
                      { code: "HN", label: "Hanoi" },
                      { code: "DN", label: "Da Nang" },
                    ].map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                  <InputLabel1 htmlFor="status">Trạng thái</InputLabel1>
                  <FSelect name="status" id="status" size="small">
                    {[
                      { code: "All", label: "Tất cả trạng thái" },
                      { code: "Active", label: "Hoạt động" },
                      { code: "Inactive", label: "Không hoạt động" },
                    ].map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                  <InputLabel1 html="power">Công suất</InputLabel1>
                  <FTextField name="power" id="power" size="small" />
                  <InputLabel1 htmlFor="accountant">
                    Kế toán phụ trách
                  </InputLabel1>
                  <FSelect name="accountant" id="accountant" size="small">
                    {[
                      { code: "All", label: "Tất cả trạng thái" },
                      { code: "Active", label: "Hoạt động" },
                      { code: "Inactive", label: "Không hoạt động" },
                    ].map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                  <InputLabel1>Ngày vận hành</InputLabel1>
                  <Grid sx={{ mb: 2 }} container spacing={5}>
                    <Grid item xs>
                      <FDatePicker name="startDate" />
                    </Grid>
                    <Grid item xs>
                      <FDatePicker name="endDate" />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Button variant="contained" size="medium" sx={{ mr: 2 }}>
                      Hoàn tất
                    </Button>{" "}
                    <Button
                      variant="contained"
                      color="inherit"
                      size="medium"
                      onClick={toggle}
                    >
                      Hủy bỏ
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>

          <Grid item xs="3">
            {" "}
            <FTextField
              name="search"
              label="Search"
              autoComplete="on"
              size="small"
            />
          </Grid>
          <Grid item xs="7"></Grid>
          <Grid item xs="auto">
            {" "}
            <Button variant="contained" size="medium">
              Thêm mới
            </Button>
          </Grid>
          <Grid item xs="12">
            <Box>
              <DataTable
                columns={columns}
                striped
                data={empList || []}
                pagination
                paginationServer
                paginationComponent={CustomPagination}
                persistTableHead
                fixedHeader
                noHeader
                fixedHeaderScrollHeight="calc(100vh - 200px)"
                className={classNames(
                  `react-dataTable react-dataTable--projects hover react-dataTable-version-2`,
                  {
                    "overflow-hidden": empList?.length <= 0,
                  }
                )}
                sortIcon={
                  <div className="custom-sort-icon">
                    <Code />
                  </div>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
};

export default EmpList;
