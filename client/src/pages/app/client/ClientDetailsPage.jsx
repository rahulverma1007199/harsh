import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { PATHS } from "../../../routes/paths";
import { URL } from "../../../api/constants";

const ClientDetailsPage = () => {

  const [client_name, setClient] = useState();
  const [mobile_number, setContact] = useState();
  const [descriptions, setDescription] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${URL}editClient/` + id,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
        setClient(res.data.Message.client_name)
        setContact(res.data.Message.mobile_number)
        setDescription(res.data.Message.descriptions)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const editFun = (e) => {
    e.preventDefault();
    axios({
      url: `${URL}updateClient/` + id,
      method: 'put',
      headers: { "Authorization": `Bearer ${token}` },
      data: {
        client_name, descriptions, mobile_number
      }
    })
      .then(res => {
        console.log(res.data)
        navigate(PATHS.clients, { replace: true });
      }).catch(err => {
        alert(err.Message)
        console.log(err)
      })
  }
  return (
    <Layout>
      <div>Client Details</div>
      <>
        <Grid container spacing={3} item sm={8}>
          <Grid item md={8} >
            <Typography>Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={client_name}
              onChange={e => setClient(e.target.value)}
            />
          </Grid >
          <Grid item md={8}>
            <Typography>Mobile Number</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={mobile_number}
              onChange={e => setContact(e.target.value)}
            />
          </Grid>
          <Grid item md={8} >
            <Typography> Descriptions
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={descriptions}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>

        </Grid>
        <Grid container spacing={3} sm={8}>
          <Grid item md={3} xs={6} >
            <Button variant >Cancel</Button>
          </Grid>
          <Grid item md={2} xs={3} >
            <Button variant="primary" onClick={editFun}
            >Save</Button>
          </Grid>

        </Grid>
      </>
    </Layout>
  );
};
export default ClientDetailsPage;
