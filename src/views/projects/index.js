import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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
import { useDispatch, useSelector } from "react-redux";
import { getListProject } from "./store/actions";
import { SET_PROJECT_PARAMS } from "../../utility/constants/actions";
import { ROWS_PER_PAGE_DEFAULT } from "../../utility/constants/common";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { getUsersLimit } from "../../redux/actions/users";
import { getAllRoofVendor } from "../../redux/actions/roofVendor";
import { getAllCustomer } from "../../redux/actions/customer";
import "./styles.scss";

const style = {
  width: "500px",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
  // const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cleanData, setCleanData] = useState();
  const [showClearIcon, setShowClearIcon] = useState("none");
  const dispatch = useDispatch();
  const { data, params, total } = useSelector((state) => state.projects);
  let { pagination = {}, searchValue, filterValue } = params || {};
  const userList = useSelector((state) => state.users?.data);
  const inputRef = useRef();

  const toggle = () => {
    setOpen(!open);
  };

  const fetchProject = (payload) => {
    dispatch(
      getListProject({
        ...params,
        ...payload,
      })
    );
    dispatch(getUsersLimit());
  };

  const replaceIdByUserName = (listId) => {
    return (listId || [])
      ?.map(
        (item) => userList?.find((data) => data?.id === item)?.fullName || ""
      )
      ?.toString();
  };

  useEffect(() => {
    dispatch(getAllRoofVendor());
    dispatch(getAllCustomer());
  }, []);

  useEffect(() => {
    const newData = (data || [])?.map((item) => ({
      ...item,
      userIds: replaceIdByUserName(item.userIds),
    }));
    setCleanData(newData);
  }, [data, userList]);

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
    return () => {
      dispatch({
        type: SET_PROJECT_PARAMS,
        payload: initParamsToFetch,
      });
    };
  }, []);

  const columns = [
    {
      name: "STT",
      cell: (row, index) =>
        index + (pagination?.currentPage - 1) * pagination.rowsPerPage + 1,
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

  const handleChangePage = (e) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1,
      },
    });
  };

  const handlePerPage = (e) => {
    fetchProject({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1,
      },
    });
  };

  const handleSort = (column, direction) => {
    fetchProject({
      sortBy: column.selector,
      sortDirection: direction,
    });
  };

  const defaultValues = {
    searchValue: "" || undefined,
  };

  const defaultValuesFilter = {
    // roofRental: "" || undefined,
    // customer: "" || undefined,
    // status: "" || undefined,
    // power: "",
    // accountant: "" || undefined,
    // startDate: "" || undefined,
    // endDate: "" || undefined,
    example: "",
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const handleSearch = (value) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: 1,
      },
      searchValue: value,
    });
    console.log(value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearch(e.target.value);
    }
  };

  const reduxRoofVendor = useSelector((state) => state.roofVendors?.data);
  const reduxCustomer = useSelector((state) => state.customers?.data);

  const onFilter = (d) => {
    // console.log(value?.customer?.value || null);
    console.log(d);
  };

  const methods2 = useForm({ defaultValues: defaultValuesFilter });

  const { handleSubmit: handleSubmitFilter } = methods2;

  const ModalComponent = () => {
    return (
      <FormProvider methods={methods2} onSubmit={handleSubmitFilter(onFilter)}>
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
              <FTextField
                name="example"
                margin="normal"
                autoComplete="on"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                onClick={(d) => onFilter(d)}
              >
                Submit
              </Button>

              {/* <Typography
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
                <FSelect
                  name="customer"
                  id="customer"
                  size="small"
                  placeholder="Chọn khách hàng"
                >
                  {reduxCustomer?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.fullName}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1 htmlFor="roofRental">
                  Đơn vị cho thuê mái
                </InputLabel1>
                <FSelect
                  name="roofRental"
                  id="roofRental"
                  size="small"
                  placeholder="Chọn đơn vị cho thuê mái"
                >
                  {reduxRoofVendor?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1 htmlFor="status">Trạng thái</InputLabel1>
                <FSelect
                  name="status"
                  id="status"
                  size="small"
                  placeholder="Chọn trạng thái"
                >
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
                <FSelect
                  name="accountant"
                  id="accountant"
                  size="small"
                  placeholder="Chọn kế toán phụ trách"
                >
                  {[
                    { code: "All", label: "Tất cả trạng thái" },
                    { code: "Active", label: "Hoạt động" },
                    { code: "Inactive", label: "Không hoạt động" },
                  ].map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1>Ngày vận hành</InputLabel1>
                <Grid sx={{ mb: 2 }} container spacing={5}>
                  <Grid xs>
                    <FDatePicker name="startDate" />
                  </Grid>
                  <Grid xs>
                    <FDatePicker name="endDate" />
                  </Grid>
                </Grid> */}
              {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 1,
                    m: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ mr: 2 }}
                    type="submit"
                    onClick={() => onFilter()}
                  >
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
                </Box> */}
              {/* </Box> */}
            </Box>
          </Fade>
        </Modal>
      </FormProvider>
    );
  };

  return (
    <Grid container spacing={2} padding={1}>
      <Grid xs={1}>
        {" "}
        <IconButton onClick={toggle}>
          <IconFilter />
        </IconButton>
      </Grid>

      <Tooltip title="Tìm theo mã, tên dự án, khách hàng" placement="top">
        <Grid xs={3}>
          <FormProvider methods={methods} onSubmit={handleSubmit(handleSearch)}>
            <FTextField
              name="searchValue"
              autoComplete="on"
              inputRef={inputRef}
              size="small"
              onKeyDown={handleSearchKeyDown}
              onChange={(e) =>
                setShowClearIcon(e.target.value === "" ? "none" : "flex")
              }
              placeholder="Tìm theo mã, tên dự án, khách hàng"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                        setShowClearIcon("none");
                        handleSearch("");
                      }}
                    >
                      <ClearIcon
                        sx={{ display: showClearIcon, fontSize: "medium" }}
                        color="primary"
                      />
                    </IconButton>
                    <IconButton
                      disabled={!inputRef?.current?.value}
                      onClick={() => {
                        handleSearch(inputRef.current.value);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
        </Grid>
      </Tooltip>

      <ModalComponent />
      <Grid xs></Grid>

      <Grid xs="auto">
        {" "}
        <Button variant="contained" size="medium">
          Thêm mới
        </Button>
      </Grid>
      <Grid xs={12}>
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
            defaultSortAsc={params?.sortDirection === "asc"}
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
            onSort={handleSort}
            sortServer
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmpList;
