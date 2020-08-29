import React, { useEffect ,useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Typography, Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useMutation } from '@apollo/client';
import { TRADE_CANCEL, TRADE_COMPLETE } from '../../../lib/queries';
import UserCommuButton from '../../../components/UserCommuButton';
import RequestCard from '../../../components/RequestCard';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PersonIcon from '@material-ui/icons/Person';
import Notice from '../../../components/Notice';
import { useSelector } from 'react-redux';
import Chat from '../../../components/chat';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'rgb(104,104,106)'
    },
    gridStyle: {
        margin: '4% auto',
        width: "80%",
    },
    loadingStyle: {
        display: 'block',
        margin: '4% auto',
    },
    large: {
        width: '100px',
        height: '100px',
    },
}));

const Progress = ({ data }) => {

    const user_id = useSelector(state => state.userAction.user_id)

    const classes = useStyles();

    const history = useHistory();

    const [chatOpen, setChatOpen] = useState(false);

    const handleChatOpen = () => {
        setChatOpen(true);
    }

    const handleChatClose = () => {
        setChatOpen(false);
    }


    const [tradeCancel, { data: cancel }] = useMutation(TRADE_CANCEL, {
        variables: {
            request: data.request._id,
        }
    })


    useEffect(() => {
        if (cancel) {
            alert(cancel.tradeCancel);
            history.replace('/seller/mypage');
        }
    }, [cancel, history])



    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={9}>
                <Grid item xs={6}>
                    <RequestCard obj={data.request} />
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem>
                            <ListItemText primary="거래 진행중" primaryTypographyProps={{ variant: "h4" }} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`₩${data.price}`} primaryTypographyProps={{ variant: "h5" }} />
                        </ListItem>
                        <ListItem>
                            <NavigateNextIcon fontSize="small" />&nbsp;&nbsp;
                            <ListItemText primary='가격은 상호 협의를 통해 변동이 있을 수 있습니다.' />
                        </ListItem>
                    </List>
                    <Button onClick={handleChatOpen} style={{ width: '100%' }} variant="outlined">
                        1:1 채팅
                    </Button>
                    <Button onClick={tradeCancel} style={{ width: '100%' }} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
            </Grid>
            <Notice />
            <Chat open={chatOpen} onClose={handleChatClose} request={data.request._id} seller={user_id} />
        </Container>
    )
}

// const Progress = ({ data, requestData }) => {

//     const classes = useStyles();

//     const history = useHistory();

//     const data = data.filter((obj) => {
//         return obj.state === '거래 진행중';
//     })

//     const tradeCancel = () => {
//         Axios.post('/cancel',{
//             request: requestData._id,
//         })
//         .then(res=>{
//             alert(res.data);
//             history.replace('/user/mypage');
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     const tradeComplete = () => {
//         Axios.post('/complete',{
//             bid: data[0]._id,
//             request: requestData._id,
//         })
//         .then(res=>{
//             alert(res.data);
//             history.replace('/user/mypage');
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     return (
//         <Container>
//             <Grid className={classes.gridStyle} container spacing={9}>
//                 <Grid item xs={6}>
//                     <RequestCard obj={requestData} />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <h2>판매자</h2>
//                     <BidCard data={data[0]} requestData={requestData}/>
//                     <UserCommuButton request_id={requestData._id} seller_id={data[0].author._id} phone={data[0].author.profile.phone} />
//                     <Button onClick={tradeComplete} style={{ width: '100%' }} variant="outlined">
//                         거래 완료
//                     </Button>
//                     <Button onClick={tradeCancel} style={{ width: '100%' }} variant="outlined">
//                         거래 취소
//                     </Button>
//                 </Grid>
//             </Grid>

//         </Container>
//     )
// }

export default Progress
