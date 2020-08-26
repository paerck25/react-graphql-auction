import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import { GET_MY_BIDS, GET_MY_PROFILE_IMAGE } from '../../../lib/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import Chat from '../../../components/chat';
import BidHistory from './BidHistory';
import ChosenList from './ChoesnList';



const BidList = () => {

    const user_id = useSelector(state => state.userAction.user_id);

    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }


    const [chatOpen, setChatOpen] = useState(false);

    const [request_id, setRequest_id] = useState('');

    const handleChatClose = () => {
        setChatOpen(false);
    }

    const handleChatOpen = (request_id) => {
        setRequest_id(request_id)
        setChatOpen(true);
    }



    const { loading, data, error, called } = useQuery(GET_MY_BIDS, {
        variables: { author: user_id },
        fetchPolicy: 'cache-and-network',
    }
    )

    if (error) {
        console.log(error);
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if (loading && !data) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    }


    return (
        <div>
            <Typography variant="h5" gutterBottom>진행중인 거래</Typography>
            <ChosenList handleChatOpen={handleChatOpen} data={data.getMyBids} />
            <br /><br /><br />
            <Typography variant="h5" gutterBottom>거래내역</Typography>
            <BidHistory data={data.getMyBids} />
            <Chat open={chatOpen} onClose={handleChatClose} request={request_id} seller={user_id} />
        </div>

    )


}

// const BidList = () => {

//     const user_id = useSelector(state => state.userAction.user_id);

//     const loadingStyle = {
//         display: 'block',
//         margin: '18% auto',
//     }

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getMyBids = () => {
//         axios.get('/my-bid',{
//             author : user_id
//         })
//         .then(res=>{
//             setData(res.data);
//             setLoading(false);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     useEffect(() => {
//         getMyBids();
//     }, [])

//     if (loading) {
//         return (
//             <CircularProgress style={loadingStyle} />
//         )
//     } else {

//         const BidHistory = data.map((obj) => {
//             return (
//                 <TableRow key={obj.request._id}>
//                     <TableCell component="th" scope="row">
//                         {obj.request.category}
//                     </TableCell>
//                     <TableCell align="center">{obj.request.author.name}</TableCell>
//                     <TableCell align="center">{obj.request.requestedAt}</TableCell>
//                     <TableCell align="center">{obj.state}</TableCell>
//                 </TableRow>
//             )
//         })

//         const ChosenList = data.filter((obj) => {
//             return obj.state === '거래 진행중';
//         })

//         const WaittingList = data.filter((obj) => {
//             return obj.state === '거래 대기중';
//         })

//         const MyChosenList = ChosenList.map((obj) => {
//             return (
//                 <Grid key={obj._id} style={{ margin: 'auto' }} item xs={4}>
//                     <RequestCard obj={obj.request} />
//                 </Grid>
//             )
//         })

//         const MyWaittingList = WaittingList.map((obj) => {
//             return (
//                 <Grid key={obj.request._id} style={{ margin: 'auto' }} item xs={4}>
//                     <Card style={{ textAlign: 'center' }} variant="outlined">
//                         <CardContent>
//                             {obj.request.author.name} 님의 {obj.request.category}<br/>
//                             <Counter data={obj.request} />
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             )
//         })

//         return (
//             <div>
//                 <h2>진행중인 거래</h2>
//                 <Container>
//                     {ChosenList.length === 0
//                         ?
//                         <h1 style={{ textAlign: 'center' }}>현재 진행중인 거래가 없습니다!</h1>
//                         :
//                         <Grid container spacing={4}>
//                             {MyChosenList}
//                         </Grid>
//                     }
//                 </Container>
//                 <Divider style={{ marginTop: '30px' }} />
//                 <h2>대기중인 거래</h2>
//                 <Container>
//                     {WaittingList.length === 0
//                         ?
//                         <h1 style={{ textAlign: 'center' }}>현재 대기중인 견적이 없습니다!</h1>
//                         :
//                         <Grid container spacing={4}>
//                             {MyWaittingList}
//                         </Grid>
//                     }
//                 </Container>
//                 <Divider style={{ marginTop: '30px' }} />
//                 <h2>거래내역</h2>
//                 <TableContainer variant="outlined" component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>카테고리</TableCell>
//                                 <TableCell align="center">이름</TableCell>
//                                 <TableCell align="center">요청일</TableCell>
//                                 <TableCell align="center">상태</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {BidHistory}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>

//         )
//     }

// }

export default BidList;