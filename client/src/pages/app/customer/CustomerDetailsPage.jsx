import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { PATHS } from "../../../routes/paths";
import { URL, GETCUSTOMERURL } from "../../../api/constants";

const CustomerDetailsPage = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [cattle, setCattle] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [tehsil, setTehsil] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(GETCUSTOMERURL + id,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
        console.log(res.data.Message)
        setName(res.data.Message.first_name)
        setMobile(res.data.Message.mobile_number)
        setCattle(res.data.Message.number_of_cattle_to_buy)
        setDistrict(res.data.Message.districtref.district)
        setState(res.data.Message.stateref.name)
        setTehsil(res.data.Message.tehsilref.tahshil)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const editFun = (e) => {
    e.preventDefault();
    axios({
      url: `${URL}updateCustomer/` + `${id}`,
      method: 'put',
      headers: { "Authorization": `Bearer ${token}` },
      data: {
        name, mobile, cattle, district, state, tehsil
      }
    })
      .then(res => {
        alert(res.data.Message)
        console.log(res.data)
        navigate(PATHS.customers, { replace: true });
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <Layout>
      <div>Customer Details </div>
      <>

        <Grid container spacing={3}>
          <Grid item md={4} xs={6}>
            <Typography>Name</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="name"
              required
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Mobile</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  Mobile"
              name="mobile"
              required
              variant="outlined"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography> No. of cattles
            </Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="cattles"
              required
              variant="outlined"
              value={cattle}
              onChange={e => setCattle(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Client</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="client"
              required
              variant="outlined"
              value={district}
              onChange={e => setDistrict(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Campaign Title</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="CampaignTitle"
              required
              variant="outlined"
              
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>State</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="state"
              required
              variant="outlined"
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>District</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="District"
              required
              variant="outlined"
              value={district}
              onChange={e => setDistrict(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Tehsil</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="Tehsil"
              required
              variant="outlined"
              value={tehsil}
              onChange={e => setTehsil(e.target.value)}
            />
          </Grid>

        </Grid>
        <Grid container spacing={3}>
          <Grid item md={2} xs={3} >
            <Button variant >Cancel</Button>
          </Grid>
          <Grid item md={2} xs={3} >
            <Button variant="primary" onClick={editFun}>Save</Button>
          </Grid>

        </Grid>

      </>
    </Layout>
  );
};

export default CustomerDetailsPage;
