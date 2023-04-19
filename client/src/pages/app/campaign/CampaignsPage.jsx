import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TabsLayout from "../../../layout/TabsLayout";
import CampaignTable from "../campaign/CampaignTable";
import Slider from "@mui/material/Slider";
import Autocomplete from '@mui/material/Autocomplete';

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";
import axios from "axios";
import { URL } from "../../../api/constants";
import moment from "moment";

function valuetext(value) {
  return `${value}°C`;
}

const CampaignForm = () => {
  // Form components to be addedf orm components directory once api is integrated
  const hiddenFileInput = React.useRef(null);
  const [range, setRange] = React.useState([20, 37]);

  const [campaignFormData, setCampaignFormData] = useState({
    //TODO: names to be changed when api is known
    client_id: '',
    campaign_name: "",
    criteria: {
      price: '',
      milk_capacity: '',
      Cattle_Type: "",
      breed: "",
      QC_status: "",
      supplier: "",
    },
    state_date: '',
    end_date: '',
    file: "",
    status: 1
  });
  const [criteria, setCriteria] = useState({})
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState()
  const token = localStorage.getItem("token");
  const [fileInputed, setFileInputed] = useState('')
  const uploadDocumentHandler = (event) => {
    hiddenFileInput.current.click();
  };
  const [clientList, setClientList] = useState([])
  useEffect(() => {
    axios.get(`${URL}clientList`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
        setClientList(res.data.Data)
        // console.log(res)
      }).catch(err => {
        console.log(err)

      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();    //formdata object
    formData.append('client_id', campaignFormData.client_id)
    formData.append('campaign_name', campaignFormData.campaign_name)
    formData.append('criteria', JSON.stringify(criteria))
    formData.append('start_date', moment(startDate).format('YYYY-MM-DD'))
    formData.append('end_date', moment(endDate).format('YYYY-MM-DD'))
    formData.append('file', fileInputed)
    formData.append('status', 1)

    axios({
      url: `${URL}addCsv`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      data: formData

    }).then((res) => {
      alert(res.data.Message)
      console.log(res)
    }).catch((error) => {
      console.log("Error Message ", error)
    })

  };
  const handleFileChange = (e) => {
    setFileInputed(e.target.files[0])

  }

  const handleChange = (e) => {

    setCampaignFormData({
      ...campaignFormData,
      [e.target.name]: e.target.value,

    });
  };

  const changeCheckBoxState = (e) => {
    let { name } = e.target;
    let { checked } = e.target;
    setCriteria({
      ...criteria,
      [name]: checked,
    });
  };


  return (
    <>
      <h1 className="text-2xl font-bold">Create Campaign</h1>
      <input
        type={"file"}

        id={"csvFileInput"}
        accept={".csv"}
        hidden
        onChange={(e) => handleFileChange(e)}
        name="file"
        value={campaignFormData.file}
      />
      <label for="csvFileInput" className="CsvUpload" onClick={() => uploadDocumentHandler('file')}
      > Upload CSV</label>

      <form
        className="w-full flex flex-col gap-5 p-5 md:p-0 mt-5"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="md:w-1/3 flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            Client
            {/* <input
              label="Client"
              className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full "
              type="text"
              placeholder="Client"
              name="client_id"
              value={campaignFormData.client_id}
              onChange={(e) => handleChange(e)}
            /> */}
            <select id="cars" name="client_id" className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full ">
              {clientList && clientList.map((eachClient)=>
              <option key={eachClient.id} value={eachClient.client_name}>{eachClient.client_name}</option>)}
            </select>
            Campaign Title
            <input
              label="Campaign Title"
              className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full "
              type="text"
              placeholder="Campaign Title"
              name="campaign_name"
              value={campaignFormData.campaign_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <Grid container spacing={3} className='campaigns'>

          <div>
            <div style={{ width: "150px", maxHeight: "10px", paddingTop: '50px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: "100px" }}>
                <DatePicker
                  format="yyyy-MM-dd"
                  disablePast
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  name="start_date"
                  inputValue={campaignFormData.state_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div style={{ width: "150px", maxHeight: "10px", marginLeft: "200px", marginBottom: '170px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: "100px" }}>
                <DatePicker
                  disablePast
                  label="End Date"
                  // value={endDate}
                  minDate={startDate}
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  name="end_date"
                  inputValue={campaignFormData.end_date}

                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>


        </Grid>
        <Grid className="flex gap-5  md:w-1/3" >
          <button
            type="submit"
            className="px-3 w-full py-2 text-primaryWhite bg-primaryBlue mt-4"
          >Cancle</button>
          <button
            type="submit"
            className="px-3 w-full py-2 text-primaryWhite bg-primaryBlue mt-4"
          >Publish</button>
        </Grid>
      </form>
    </>
  );
};
const CampaignsPage = () => {
  return (
    <Layout>
      <div>
        <TabsLayout
          headings={["Create Campaign", "On-going Campaign"]}
          components={[<CampaignForm />, <CampaignTable />]}
        />
      </div>
    </Layout>
  );
};
export default CampaignsPage;
