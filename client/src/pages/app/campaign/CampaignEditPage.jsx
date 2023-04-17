import React,{useState} from "react";
import Layout from "../../../layout/Layout";
import { Button, Grid, TextField, Typography } from "@mui/material";

const CampaignEditPage = () => {
    
    const[data, setData]=useState()



  return (
    <Layout>
      <div>Campaign Details </div>
      <>
        <Grid container spacing={3}>
          <Grid item md={4} xs={6}>
            <Typography>Campaign Name</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="CampaignName"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Date</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  Mobile"
              name="date"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography> Client
            </Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="Client"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Customer</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="Customer"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Typography>Status</Typography>
            <TextField
              fullWidth
              // helperText="Please specify the  name"
              name="status"
              required
              variant="outlined"
            />
          </Grid>
         
        </Grid>

        <Grid container spacing={3}>
        <Grid item md={3} xs={4} className="flex gap-5 w-1/2 p-5" >
            <Button className="w-1/2 text-primaryColor px-4" variant="outlined" >Cancel</Button>
          </Grid>
          <Grid item md={3} xs={4} >
            <Button variant="outlined" >Save</Button>
          </Grid>

        </Grid>
       
            </>

    </Layout>
  );
};

export default CampaignEditPage;
