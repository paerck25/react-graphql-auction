import React, { useState } from 'react';
import Counter from '../../../components/Counter'
import { Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Bidding from '../Bidding';
import RequestCard from '../../../components/RequestCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridStyle: {
        margin: '4% auto',
        width: "80%",
    },
    loadingStyle: {
        display: 'block',
        margin: '4% auto',
    },
}));

function RequestDetail(props) {

    const classes = useStyles();
    const [data] = useState(props.location.state.data);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Container>
                <Grid className={classes.gridStyle} container spacing={9}>
                    <Grid item xs={6}>
                        <RequestCard obj={data} />
                    </Grid>
                    <Grid item xs={5}>
                        {(data.deadLine < new Date().getTime())
                            ?
                            <>
                                <h1>요청 마감</h1>
                                요청이 마감되었습니다.
                            </>
                            :
                            <>
                                <ul>
                                    <li>구매자는 여러개의 견적을 받아 한가지를 선택하게 됩니다.</li><br/>
                                    <li>견적을 전송한 후에 구매자와 채팅을 할 수 있습니다.</li><br/>
                                    <li>나의 견적이 선택이 되면 마이페이지/진행중인 거래 에서 확인하실 수 있습니다.</li><br/>
                                    <li>선택이 된 이후에도 합의 하에 세부 사항을 조정할 수 있습니다.</li><br />
                                </ul>
                                <h2 style={{textAlign:'center'}}><Counter data={data} /></h2>
                                <Button style={{ width: "100%" }} variant="outlined" onClick={() => { setOpen(true) }}>
                                    입찰하기
                                </Button>
                            </>
                        }
                    </Grid>
                </Grid>
                <Divider />
                <Bidding data={data} open={open} setOpen={setOpen} />
            </Container>
        </>
    )
}

export default RequestDetail;