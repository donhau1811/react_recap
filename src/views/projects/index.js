import React, { useState, useEffect } from "react";
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
import {
  ROWS_PER_PAGE_DEFAULT,
  REAL_NUMBER,
} from "../../utility/constants/common";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { getUsersLimit } from "../../redux/actions/users";
import { getAllRoofVendor } from "../../redux/actions/roofVendor";
import { getAllCustomer } from "../../redux/actions/customer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.scss";

const style = {
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  marginX: "auto",
  position: "relative",
  top: "10vh",
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
  const [open, setOpen] = useState(false);
  const [cleanData, setCleanData] = useState();
  const [showClearIcon, setShowClearIcon] = useState("none");
  // const [listAccountant, setListAccountant] = useState([]);
  const dispatch = useDispatch();
  const { data, params, total } = useSelector((state) => state.projects);
  let { pagination = {}, searchValue, filterValue } = params || {};
  const userList = useSelector((state) => state.users?.data);
  const reduxRoofVendor = useSelector((state) => state.roofVendors?.data);
  const reduxCustomer = useSelector((state) => state.customers?.data);

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

  // useEffect( () => {
  //   try {
  //     const [AccountantsRes, MAccountantRes] =  Promise.all([
  //       axios.get(`${GET_USER_BY_ROLE_ID}/${5}`),
  //       axios.get(`${GET_USER_BY_ROLE_ID}/${4}`),
  //     ]);

  //     let allAccountant = [];
  //     if (AccountantsRes.status === 200 && AccountantsRes.data?.data) {
  //       allAccountant = allAccountant.concat(
  //         (AccountantsRes.data.data || []).map(({ id, fullName }) => ({
  //           value: id,
  //           label: fullName,
  //         }))
  //       ); // AccountantROle
  //     }
  //     if (MAccountantRes.status === 200 && MAccountantRes.data?.data) {
  //       allAccountant = allAccountant.concat(
  //         (MAccountantRes.data.data || []).map(({ id, fullName }) => ({
  //           value: id,
  //           label: fullName,
  //         }))
  //       );
  //       //ManageAccountantRole
  //       setListAccountant(allAccountant);
  //       console.log(listAccountant);
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //   }

  // }, []);

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
      name: "M?? d??? ??n",
      selector: (row) => row["code"],
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "T??n d??? ??n",
      sortable: true,
      selector: (row) => row["name"],
      minWidth: "100px",
    },
    {
      name: "?????a ch???",
      selector: (row) => row["address"],
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "T??n c??ng ty kh??ch h??ng",
      selector: (row) => row["companyName"],
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "K??? to??n ph??? tr??ch",
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
      name: "Tr???ng th??i",
      sortable: true,
      center: true,
      minWidth: "150px",
      cell: (row) => {
        return row.state === "ACTIVE" ? (
          <Chip label="Ho???t ?????ng" variant="outlined" className="activeState" />
        ) : (
          <Chip
            label="Kh??ng ho???t ?????ng"
            variant="outlined"
            className="inactiveState"
          />
        );
      },
    },
    {
      name: "Thao t??c",
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
        displayUnit="d??? ??n"
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
    searchValue: "",
  };

  const defaultValuesFilter = {
    roofVendorId: "",
    customerId: "",
    state: "",
    capacity: "",
    userId: "",
    start: "",
    end: "",
  };

  const ValidateSchema = yup.object().shape({
    capacity: yup
      .string()
      .matches(REAL_NUMBER, {
        message: "D??? li???u kh??ng h???p l???",
        excludeEmptyString: true,
      })
      .max(16, "T???i ??a 16 s???"),
  });

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (isDirty) {
      setShowClearIcon("flex");
    }
  }, [isDirty]);

  const handleSearch = (value) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: 1,
      },
      searchValue: value.searchValue,
    });
  };

  const handleFilter = (value) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: 1,
      },
      searchValue: "",
      filterValue: value,
    });
  };

  const handleSearchKeyDown = (e) => {
    if (e?.keyCode === 13) {
      e.preventDefault();
      handleSubmit(handleSearch);
    }
  };

  const onFilter = (data) => {
    // console.log(data.start.format("YYYY-MM-DD"));
    const payload = {};
    if (data.state?.value !== "ALL_STATUS") {
      payload.state = data.state;
    }
    payload.customerId = data.customerId || null;
    payload.roofVendorId = data.roofVendorId || null;
    payload.userId = data.userId || null;
    payload.startDate =
      data.start && data.end
        ? {
            start: data.start.format("YYYY-MM-DD"),
            end: data.end.format("YYYY-MM-DD"),
          }
        : null;
    payload.capacity = data.capacity;

    handleFilter(payload);
    toggle();

    // console.log(payload);
  };

  const methods2 = useForm({
    defaultValues: defaultValuesFilter,
    resolver: yupResolver(ValidateSchema),
    shouldUnregister: false,
  });

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
                L???c th??ng tin d??? ??n
              </Typography>
              <Divider sx={{ backgroundColor: "black", mt: 2 }} />
              <Box sx={{ mt: 2 }}>
                <InputLabel1 htmlFor="customer">Kh??ch h??ng</InputLabel1>
                <FSelect name="customerId" id="customer" size="small">
                  {reduxCustomer?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.fullName}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1 htmlFor="roofRental">
                  ????n v??? cho thu?? m??i
                </InputLabel1>
                <FSelect name="roofVendorId" id="roofRental" size="small">
                  {reduxRoofVendor?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1 htmlFor="status">Tr???ng th??i</InputLabel1>
                <FSelect
                  name="state"
                  id="status"
                  size="small"
                  placeholder="Ch???n tr???ng th??i"
                >
                  {[
                    { value: null, label: "T???t c??? tr???ng th??i" },
                    { value: "ACTIVE", label: "Ho???t ?????ng" },
                    { value: "INACTIVE", label: "Kh??ng ho???t ?????ng" },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1 html="power">C??ng su???t</InputLabel1>
                <FTextField
                  name="capacity"
                  id="power"
                  size="small"
                  placeholder="Nh???p c??ng su???t"
                />
                <InputLabel1 htmlFor="accountant">
                  K??? to??n ph??? tr??ch
                </InputLabel1>
                <FSelect
                  name="userId"
                  id="accountant"
                  size="small"
                  placeholder="Ch???n k??? to??n ph??? tr??ch"
                  defaultValue={defaultValues.userId}
                >
                  {[
                    { value: "", label: "T???t c??? k??? to??n ph??? tr??ch" },
                    { value: 1, label: "H???a V??n C?????ng" },
                    { value: 2, label: "B??i Nh???t B??nh" },
                    { value: 3, label: "Nguy???n Duy Long" },
                    { value: 4, label: "La Du??? T??n" },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FSelect>
                <InputLabel1>Ng??y v???n h??nh</InputLabel1>
                <Grid sx={{ mb: 2 }} container spacing={5}>
                  <Grid xs>
                    <FDatePicker name="start" />
                  </Grid>
                  <Grid xs>
                    <FDatePicker name="end" />
                  </Grid>
                </Grid>{" "}
                <Box
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
                    onClick={handleSubmitFilter(onFilter)}
                  >
                    Ho??n t???t
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="inherit"
                    size="medium"
                    onClick={toggle}
                  >
                    H???y b???
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </FormProvider>
    );
  };

  return (
    <Grid container spacing={2} padding={2}>
      <ModalComponent />

      <Grid xs={1}>
        {" "}
        <IconButton onClick={toggle}>
          <IconFilter />
        </IconButton>
      </Grid>

      <Tooltip title="T??m theo m??, t??n d??? ??n, kh??ch h??ng" placement="top">
        <Grid xs={3}>
          <FormProvider methods={methods} onSubmit={handleSubmit(handleSearch)}>
            <FTextField
              name="searchValue"
              autoComplete="on"
              size="small"
              onKeyDown={() => handleSearchKeyDown()}
              placeholder="T??m theo m??, t??n d??? ??n, kh??ch h??ng"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        reset({ searchValue: "" });
                        setShowClearIcon("none");
                        handleSubmit(handleSearch(""));
                      }}
                    >
                      <ClearIcon
                        sx={{ display: showClearIcon, fontSize: "medium" }}
                        color="primary"
                      />
                    </IconButton>
                    <IconButton
                      disabled={!isDirty}
                      onClick={handleSubmit(handleSearch)}
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

      <Grid xs></Grid>

      <Grid xs="auto">
        {" "}
        <Button variant="contained" size="medium">
          Th??m m???i
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
