import React, { useState } from 'react';
import Counter from '../../components/Counter'
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip'
import Bidding from '../bidding/Bidding';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    backgroundStyle: {
        backgroundColor: "skyblue",
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


    const showTagList = data.tags.map((obj) => {
        return <span key={obj}><Chip variant="outlined" size="small" label={obj} />&nbsp;</span>
    })
    return (
        <div>
            <Container className={classes.backgroundStyle} maxWidth="sm">
                <Grid container>
                    <Grid item xs={6}>
                        <h3>{data.category}</h3>
                        <h3>요청사항 : {data.detail}<br />{showTagList}</h3>
                        <h3>희망 작업 완료일 : {data.hopeDate}</h3>
                    </Grid>
                    <Grid item xs={6}>
                        {(data.deadLine < new Date().getTime())
                            ? <h1>경매 마감</h1>
                            :
                            <>
                                <h3><Counter data={data} /></h3>
                                <Button variant="outlined" onClick={() => { setOpen(true) }}>
                                    입찰하기
                                </Button>
                            </>
                        }

                    </Grid>
                </Grid>
                <Bidding data={data} open={open} setOpen={setOpen} />
            </Container>
        </div>
    )
}

export default RequestDetail;