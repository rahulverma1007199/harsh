import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'
import { URL, CAMPAINDELETE } from "../../../api/constants";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PATHS } from '../../../routes/paths';
import { useNavigate } from "react-router-dom";


export default function CampaignTable() {
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
        const response = axios.get(`${URL}campaginList`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => {
                setData(res.data.Data)
            }).catch(err => {
                console.log(err)

            })
    }, [])

    const deleteFun = (id) => {
        axios({
            url: CAMPAINDELETE + `${id}`,
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

    return (
        <>
            <h1>Campaign List</h1>
            <div>
                {/* <SearchBar
        //   value={searched}
        //   onChange={(searchVal) => requestSearch(searchVal)}
        //   onCancelSearch={() => cancelSearch()}
        /> */}
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 310 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                <TableCell>S.No</TableCell>
                                <TableCell>Campaign Name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>User List</TableCell>
                                <TableCell>Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.campaign_name}</TableCell>
                                    <TableCell>{item.campaign_expaire}</TableCell>

                                    <TableCell>{item.campaign_customersref.slice(0, 2).map((value) => (value.clientref.client_name))}</TableCell>

                                    <TableCell> <a href="" target="_parent">View{item.id}</a> </TableCell>
                                    <TableCell>
                                        <span><EditIcon onClick={() => navigate(PATHS.campaignEdit)}  /><button onClick={() => deleteFun(item.id)}><DeleteIcon /></button></span>
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
