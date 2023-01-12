import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form/index";
import DataTable from "react-data-table-component";
import { Code } from "react-feather";
import classNames from "classnames";

import "./styles.scss";

const EmpList = () => {
  const [empList, setEmpList] = useState(null);
  const [userList, setUserList] = useState(null);
  const navigate = useNavigate();

  const headers = {
    "x-api-key": "AIzaSyBS6rQ_3nB2TN6NCnFlCzhMYeRGL3WEhZI",
    "x-user-agent-t":
      "bfe6f00df8f7aefbd2660be0d5810cfd.T1629692448457.e048a206b8af0918f3a61cd125ba32e4",
    ree_user_id: "188",
    ree_token:
      "210a62493346436de668535f27ad964e.T1673406762509.611f1b34c44d5273c559ee8361686045",
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
      .get(
        "https://rsm2021-d3bzmmng.an.gateway.dev/glf_user?rowsPerPage=9999",
        { headers }
      )
      .then((resp) => {
        setUserList(resp.data.data);
        console.log(resp);
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
        body,
        {
          headers,
        }
      )
      .then((resp) => {
        const newData = (resp.data.data || [])?.map((item) => ({
          ...item,
          userIds: replaceIdByUserName(item.userIds),
        }));
        setEmpList(newData);
        console.log(resp);
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Container maxWidth="lg">
        <Grid
          container
          rowSpacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            m: 1,
          }}
        >
          <Grid item xs>
            {" "}
            <FilterAltIcon aria-label="filter projects" fontSize="large" />
          </Grid>
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
                paginationServer
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
