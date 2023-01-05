import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form/index";

const EmpList = () => {
  const [empList, setEmpList] = useState(null);
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit } = methods;

  const detailOfEmployee = (id) => {
    navigate("/project/detail/" + id);
  };

  const editEmployee = (id) => {};

  const removeEmployee = (id) => {};

  const headers = {
    "x-api-key": "AIzaSyBS6rQ_3nB2TN6NCnFlCzhMYeRGL3WEhZI",
    "x-user-agent-t":
      "bfe6f00df8f7aefbd2660be0d5810cfd.T1629692448457.e048a206b8af0918f3a61cd125ba32e4",
    ree_user_id: "188",
    ree_token:
      "b89732125abc453d3c9539318f568b6f.T1672711022001.c8a768dccd0ac98a527670741eb05891",
  };

  const body = {
    limit: 25,
    offset: 0,
    sortBy: "id",
    sortDirection: "asc",
  };

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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.sidebar.secondary,
  }));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
        <Grid
          container
          direction="row"
          //   justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <IconButton sx={{ my: "auto" }}>
              <FilterAltIcon aria-label="filter projects" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <FTextField
              name="search"
              label="Search"
              size="small"
              autoComplete="on"
            />
          </Grid>
          <Grid item justifyItems="flex-end">
            <Button variant="contained" size="medium">Thêm mới</Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default EmpList;
