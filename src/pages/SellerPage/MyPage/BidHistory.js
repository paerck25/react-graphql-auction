import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BidHistory = ({ data }) => {

    const showBidHistory = data.map((obj) => {
        return (
            <TableRow key={obj.request._id}>
                <TableCell component="th" scope="row">
                    {obj.request.category}
                </TableCell>
                <TableCell align="center">{obj.request.author.name}</TableCell>
                <TableCell align="center">{obj.request.requestedAt}</TableCell>
                <TableCell align="center">{obj.state}</TableCell>
            </TableRow>
        )
    })


    return (
        <TableContainer variant="outlined" component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>카테고리</TableCell>
                        <TableCell align="center">이름</TableCell>
                        <TableCell align="center">요청일</TableCell>
                        <TableCell align="center">상태</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showBidHistory}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BidHistory
