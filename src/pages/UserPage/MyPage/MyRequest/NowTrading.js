import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Grid, Typography, Avatar, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useMutation } from '@apollo/client';
import { TRADE_CANCLE, TRADE_COMPLETE } from '../../../../lib/queries';
import UserCommuButton from '../../../../components/UserCommuButton';
import RequestCard from '../../../../components/RequestCard';
import { makeStyles } from '@material-ui/core/styles';
import BidCard from '../../../../components/BidCard';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PersonIcon from '@material-ui/icons/Person';

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

const NowTrading = ({ data, requestData }) => {

    const classes = useStyles();

    const history = useHistory();
    

    const [tradeCancle, { data: cancle }] = useMutation(TRADE_CANCLE, {
        variables: {
            request: requestData._id,
        }
    })

    const [tradeComplete, { data: complete }] = useMutation(TRADE_COMPLETE, {
        variables: {
            bid: data._id,
            request: requestData._id,
        }
    })

    useEffect(() => {
        console.log('data', data);
        console.log('requestData', requestData);
        if (complete) {
            alert(complete.tradeComplete);
            history.replace('/user/mypage');
        }
        if (cancle) {
            alert(cancle.tradeCancle);
            history.replace('/user/mypage');
        }
    }, [complete, cancle])



    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={9}>
                <Grid item xs={6}>
                    <RequestCard obj={requestData} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={6}>
                        <Grid item xs={3}>
                        {data.author.profile.profileImage 
                            ?
                            <Avatar src={data.author.profile.profileImage} className={classes.large} />
                            :
                            <Avatar className={classes.large}>
                                <PersonIcon style={{ fontSize: 100 }} />
                            </Avatar>
                        }
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: '8px' }}>
                            <Typography variant="h6">
                                {data.author.name}
                            </Typography>
                            <Rating name="half-rating-read" value={1} precision={0.5} readOnly />
                            <Typography>3.5/5.0</Typography>
                        </Grid>
                    </Grid>
                    <List>
                        <ListItem>
                            <ListItemText primary={`₩${data.price}`} primaryTypographyProps={{ variant: "h5" }} />
                        </ListItem>
                        <ListItem>
                            <NavigateNextIcon fontSize="small" />&nbsp;&nbsp;
                            <ListItemText primary='가격은 상호 협의를 통해 변동이 있을 수 있습니다.' />
                        </ListItem>
                    </List>
                    <UserCommuButton avatarSrc={data.author.profile.profileImage} request_id={requestData._id} seller_id={data.author._id} phone={data.author.profile.phone} />
                    <Button onClick={tradeComplete} style={{ width: '100%' }} variant="outlined">
                        거래 완료
                    </Button>
                    <Button onClick={tradeCancle} style={{ width: '100%' }} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container className={classes.gridStyle} spacing={9}>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>안내</Typography>
                    <ul>
                        <li>
                            본 웹사이트는 고객과 전문가를 연결시켜드리는 중개 플랫폼 입니다.
                        </li>
                        <br/>
                        <li>
                            사이트 운영자는 거래에 관여하지 않습니다.
                        </li>
                        <br/>
                        <li>

                        </li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>교환/환불</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>평점과 리뷰</Typography>
                    <ul>
                        <li>
                            평점과 리뷰는 거래 완료 고객에 한해서만 작성이 가능합니다.
                        </li>
                        <br/>
                        <li>
                            사이트 운영자는 리뷰에 관여하지 않습니다.
                        </li>
                        <br/>
                        <li>

                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    )
}

// const NowTrading = ({ data, requestData }) => {

//     const classes = useStyles();

//     const history = useHistory();

//     const data = data.filter((obj) => {
//         return obj.state === '거래 진행중';
//     })

//     const tradeCancle = () => {
//         Axios.post('/cancle',{
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
//                     <Button onClick={tradeCancle} style={{ width: '100%' }} variant="outlined">
//                         거래 취소
//                     </Button>
//                 </Grid>
//             </Grid>

//         </Container>
//     )
// }

export default NowTrading
