import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form/index";
import DataTable from "react-data-table-component";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const EmpList = () => {
  // const [empList, setEmpList] = useState(null);
  // const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit } = methods;

  // const detailOfEmployee = (id) => {
  //   navigate("/project/detail/" + id);
  // };

  // const editEmployee = (id) => {};

  // const removeEmployee = (id) => {};

  // const headers = {
  //   "x-api-key": "AIzaSyBS6rQ_3nB2TN6NCnFlCzhMYeRGL3WEhZI",
  //   "x-user-agent-t":
  //     "bfe6f00df8f7aefbd2660be0d5810cfd.T1629692448457.e048a206b8af0918f3a61cd125ba32e4",
  //   ree_user_id: "188",
  //   ree_token:
  //     "b89732125abc453d3c9539318f568b6f.T1672711022001.c8a768dccd0ac98a527670741eb05891",
  // };

  // const body = {
  //   limit: 25,
  //   offset: 0,
  //   sortBy: "id",
  //   sortDirection: "asc",
  // };

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

  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 5,
  //   maxColumns: 12,
  // });

  const columns = [
    {
      field: "first",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 140,
    },
    {
      field: "last",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 140,
    },
  ];

  const rows = [
    {
      id: 1,
      first: "Jane",
      last: "Carter",
    },
    {
      id: 2,
      first: "Jack",
      last: "Smith",
    },
    {
      id: 3,
      first: "Gill",
      last: "Martin",
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack bgcolor="#dfe7f2" minHeight="91vh" overflow="hidden">
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            m: 1,
          }}
        >
          <Grid item>
            {" "}
            <IconButton>
              <FilterAltIcon aria-label="filter projects" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item lg="2">
            {" "}
            <FTextField
              name="search"
              label="Search"
              autoComplete="on"
              size="small"
            />
          </Grid>
          <Grid item lg="8" m="auto"></Grid>
          <Grid item m="auto">
            {" "}
            <Button variant="contained" size="medium">
              Thêm mới
            </Button>
          </Grid>
        </Grid>

        <Box
      sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: 16,
          fontWeight: 600,
          fontFamily: "Inter",
          fontStyle: "semi bold"
        }
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </Box>
      </Stack>
    </FormProvider>
  );
};

export default EmpList;
