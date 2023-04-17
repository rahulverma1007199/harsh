import React, { useEffect, useState } from "react";
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { URL, CUSTOMERDELETEURL } from "../../../api/constants";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

export default function CustomersTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const token = localStorage.getItem("token");
  console.log(token)

  useEffect(() => {
    axios.get(`${URL}customerList`,
      {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
        console.log(res)
        setData(res.data.Message)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const deleteFun = (id) => {
    axios({
      url: CUSTOMERDELETEURL + `${id}`,
      method: 'PUT',
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        console.log(res)
        setData(data.filter(e => e.id !== id))
        alert(res.data.Message)
      }).catch(err => {
        console.log(err)
      })
  }

  const editFun = (id) => {
    navigate("/admin/customer-details/" + id)
  }
  return (
    <>

      <h1>Customer List</h1>

      <div>

      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 310 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>No. of Cattles</TableCell>
                <TableCell>Campaign</TableCell>
                <TableCell>State</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Tehsil</TableCell>
                <TableCell>Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.mobile_number}</TableCell>
                  <TableCell>{item.number_of_cattle_to_buy}</TableCell>
                  <TableCell>{item.campaign_customersref[0]?.campaignsref?.campaign_name}</TableCell>
                  <TableCell>{item.stateref?.name}</TableCell>
                  <TableCell>{item.districtref?.district}</TableCell>
                  <TableCell>{item.tehsilref?.tahshil}</TableCell>
                  <TableCell>
                    <div><button><EditIcon onClick={() => editFun(item.id)} /> </button><button><DeleteIcon onClick={() => deleteFun(item.id)} /></button></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}