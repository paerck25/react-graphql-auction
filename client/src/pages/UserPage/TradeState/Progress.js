import React, { useEffect } from 'react'
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

const Progress = ({ data, requestData }) => {

    const classes = useStyles();

    const history = useHistory();


    const [tradeCancel, { data: cancel }] = useMutation(TRADE_CANCEL, {
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
        if (complete) {
            if (complete.tradeComplete) {
                alert('완료되었습니다.');
                history.replace('/user/mypage');
            } else {
                alert('error : 완료 실패')
            }
        }
        if (cancel) {
            if (cancel.tradeCancel) {
                alert('취소되었습니다.');
                history.replace('/user/mypage');
            } else {
                alert('error : 취소 실패')
            }
        }
    }, [complete, cancel, history])

    const onClickComplete = () => {
        const AreYouSure = window.confirm('거래가 완료되었습니까?');
            if (AreYouSure) {
                tradeComplete();
            }
    }

    const onClickCancel = () => {
        const AreYouSure = window.confirm('취소하시겠습니까?');
            if (AreYouSure) {
                tradeCancel();
            }
    }



    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={9}>
                <Grid item xs={12} md={6}>
                    <RequestCard obj={requestData} />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    <Button onClick={onClickComplete} style={{ width: '100%' }} variant="outlined">
                        거래 완료
                    </Button>
                    <Button onClick={onClickCancel} style={{ width: '100%' }} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
            </Grid>
            <Notice />
        </Container>
    )
}


export default Progress
