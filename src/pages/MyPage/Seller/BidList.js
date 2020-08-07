import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress, Container, Grid, CardHeader, Divider, Card, CardContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GET_MY_BIDS } from '../../../lib/queries';
import { useQuery } from '@apollo/client';
import RequestCard from '../../../components/RequestCard';
import Counter from '../../../components/Counter';



const BidList = () => {

    const user_id = useSelector(state => state.userAction.user_id);

    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }

    const history = useHistory();

    const { loading, data, error } = useQuery(GET_MY_BIDS, {
        variables: { author: user_id },
        fetchPolicy: 'cache-and-network',
    }
    )

    if (error) {
        alert(error);
        history.push('/');
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if (loading) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    } else {

        const BidHistory = data.getMyBids.map((obj) => {
            return (
                <TableRow key={obj.request._id}>
                    <TableCell component="th" scope="row">
                        {obj.request.category}
                    </TableCell>
                    <TableCell align="center">{obj.request.author.name}</TableCell>
                    <TableCell align="center">{obj.request.requestedAt}</TableCell>
                    <TableCell align="center">{obj.request.state}</TableCell>
                </TableRow>
            )
        })

        const ChosenList = data.getMyBids.filter((obj) => {
            return obj.state === '거래 진행중';
        })

        const WaittingList = data.getMyBids.filter((obj) => {
            return obj.state === '거래 대기중';
        })

        const MyChosenList = ChosenList.map((obj) => {
            return (
                <Grid style={{ margin: 'auto' }} item xs={4}>
                    <RequestCard obj={obj.request} />
                </Grid>
            )
        })

        const MyWaittingList = WaittingList.map((obj) => {
            return (
                <Grid style={{ margin: 'auto' }} item xs={4}>
                    <Card variant="outlined">
                        <CardContent style={{ margin: 'auto' }}>
                            {obj.request.author.name} 님의 {obj.request.category} 요청
                            <Counter data={obj.request} />
                        </CardContent>
                    </Card>
                </Grid>
            )
        })

        return (
            <div>
                <h2>진행중인 거래</h2>
                <Container>
                    {ChosenList.length === 0
                        ?
                        <h1 style={{ textAlign: 'center' }}>현재 진행중인 거래가 없습니다!</h1>
                        :
                        <Grid container spacing={4}>
                            {MyChosenList}
                        </Grid>
                    }
                </Container>
                <Divider style={{ marginTop: '30px' }} />
                <h2>대기중인 거래</h2>
                <Container>
                    {WaittingList.length === 0
                        ?
                        <h1 style={{ textAlign: 'center' }}>현재 대기중인 견적이 없습니다!</h1>
                        :
                        <Grid container spacing={4}>
                            {MyWaittingList}
                        </Grid>
                    }
                </Container>
                <Divider style={{ marginTop: '30px' }} />
                <h2>거래내역</h2>
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
                            {BidHistory}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        )
    }

}

export default BidList;