import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { ReactComponent as IconDelete } from "../../assets/svg/table/ic-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/svg/table/ic-edit.svg";
import { ReactComponent as IconView } from "../../assets/svg/table/ic-view.svg";
import { ReactComponent as IconFilter } from "../../assets/svg/table/ic-filter.svg";
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
import { useDispatch, useSelector } from "react-redux";
import { getListProject } from "./store/actions";
import { SET_PROJECT_PARAMS } from "../../utility/constants/actions";
import { ROWS_PER_PAGE_DEFAULT } from "../../utility/constants/common";

const style = {
  position: "absolute",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "35vw",
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
  const [userList, setUserList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  // const [totalCount, setTotalCount] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [empList, setEmpList] = useState(null);
  const [open, setOpen] = useState(false);
  const [cleanData, setCleanData] = useState();

  const dispatch = useDispatch();
  const { data, params, total } = useSelector((state) => state.projects);
  const { pagination = {}, searchValue, filterValue } = params || {};
  const fetchProject = (payload) => {
    dispatch(
      getListProject({
        ...params,
        ...payload,
      })
    );
  };

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
    const initParamsToFetch = {
      pagination: {
        rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        currentPage: 1,
      },
      sortBy: "code",
      sortDirection: "asc",
    };
    fetchProject(initParamsToFetch);
    const newData = (data || [])?.map((item) => ({
      ...item,
      userIds: replaceIdByUserName(item.userIds),
    }));
    setCleanData(newData);
    return () => {
      dispatch({
        type: SET_PROJECT_PARAMS,
        payload: initParamsToFetch,
      });
    };
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://dev---core-api-nnoxwxinaq-as.a.run.app/customer/all")
  //     .then((resp) => {
  //       setCustomerList(resp.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // useEffect(() => {
  //   const body = {
  //     limit: rowsPerPage,
  //     offset: 0,
  //     sortBy: "code",
  //     sortDirection: "asc",
  //   };

  //   axios
  //     .post(
  //       "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
  //       body
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       setTotalCount(resp?.data.count);
  //       const newData = (resp?.data.data || [])?.map((item) => ({
  //         ...item,
  //         userIds: replaceIdByUserName(item.userIds),
  //       }));
  //       setEmpList(newData);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const methods = useForm();
  const { handleSubmit } = methods;

  const columns = [
    {
      name: "STT",
      selector: (row) => row["id"],
      center: true,
      maxWidth: "50px",
    },
    {
      name: "Mã dự án",
      selector: (row) => row["code"],
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Tên dự án",
      sortable: true,
      selector: (row) => row["name"],
      minWidth: "100px",
    },
    {
      name: "Địa chỉ",
      selector: (row) => row["address"],
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "Tên công ty khách hàng",
      selector: (row) => row["companyName"],
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Kế toán phụ trách",
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
    {
      name: "Trạng thái",
      sortable: true,
      center: true,
      minWidth: "150px",
      cell: (row) => {
        return row.state === "ACTIVE" ? (
          <Chip label="Hoạt động" variant="outlined" className="activeState" />
        ) : (
          <Chip
            label="Không hoạt động"
            variant="outlined"
            className="inactiveState"
          />
        );
      },
    },
    {
      name: "Thao tác",
      cell: (row) => {
        return (
          <>
            <IconView style={{ marginRight: "15px" }} />
            <IconEdit style={{ marginRight: "15px" }} />
            <IconDelete />
          </>
        );
      },
      center: true,
      width: "150px",
    },
  ];

  const CustomPagination = () => {
    const count = Math.ceil(total / pagination.rowsPerPage);

    return (
      <CP
        totalRows={total}
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={
          pagination.currentPage !== 0 ? pagination.currentPage - 1 : 0
        }
        onPageChange={handleChangePage}
        handlePerPage={handlePerPage}
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
        rowsPerPage={pagination.rowsPerPage}
        rowsPerPageOptions={[
          { label: 10, value: 10 },
          { label: 25, value: 25 },
          { label: 50, value: 50 },
          { label: 75, value: 75 },
          { label: 100, value: 100 },
        ]}
        displayUnit="dự án"
      />
    );
  };

  // const handleChangePage = (e) => {
  //   const body = {
  //     limit: pagination.rowsPerPage,
  //     offset: pagination.rowsPerPage * e.selected,
  //     sortBy: "code",
  //     sortDirection: "asc",
  //   };
  //   axios
  //     .post(
  //       "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
  //       body
  //     )
  //     .then((resp) => {
  //       const newData = (resp.data.data || [])?.map((item) => ({
  //         ...item,
  //         userIds: replaceIdByUserName(item.userIds),
  //       }));
  //       setEmpList(newData);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  //   // setCurrentPage(e.selected + 1);
  // };

  const handleChangePage = (e) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1,
      },
    });
  };

  // const handlePerPage = (e) => {
  //   const perPage = e.value;

  //   const body = {
  //     limit: perPage,
  //     offset: 0,
  //     sortBy: "code",
  //     sortDirection: "asc",
  //   };
  //   axios
  //     .post(
  //       "https://dev---core-api-nnoxwxinaq-as.a.run.app/project/search",
  //       body
  //     )
  //     .then((resp) => {
  //       console.log(perPage);
  //       const newData = (resp.data.data || [])?.map((item) => ({
  //         ...item,
  //         userIds: replaceIdByUserName(item.userIds),
  //       }));
  //       setEmpList(newData);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   // setRowsPerPage(perPage);
  // };

  const handlePerPage = (e) => {
    fetchProject({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1,
      },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Grid
          container
          rowSpacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs>
            {" "}
            <IconButton onClick={toggle}>
              <IconFilter />
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
            style={{ overflow: "scroll" }}
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
                data={cleanData || []}
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
                    "overflow-hidden": total <= 0,
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
