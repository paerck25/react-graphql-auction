import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grid, Divider, Chip, Typography, Paper, CardHeader, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Counter from '../../../../components/Counter'

const useStyles = makeStyles((theme)=>({
    cardStyle : {
        textAlign: 'center',
        transition: 'all 0.2s',
        '&:hover' : {
            backgroundColor : '#EAECEE'
        }
    },
    gridStyle : {
        margin: 'auto',
    },
    linkStyle : {
        textDecoration: 'none'
    }
}));

const MyRequests = ({ data }) => {



    const classes = useStyles();

    const requestList = data.filter((obj) => {
        return (obj.state === '요청 진행중') || (obj.state === '거래 진행중') || (obj.state === '요청 시간 마감');
    })

    const MyRequestList = requestList.map((obj) => {

        const showTagList = obj.tags.map((obj, index) => {
            return <Chip key={index} style={{ margin: '2px' }} label={obj} variant="outlined" size="small" />
        })

        return (
            <Grid className={classes.gridStyle} key={obj._id} item xs={4}>
                <Link className={classes.linkStyle} to={{ pathname: `/user/detail`, state: obj }}>
                    <Card className={classes.cardStyle} size="large" color="primary">
                        <CardHeader title={obj.category} subheader={obj.requestedAt} />
                        <CardContent>
                            {showTagList}
                            <br /><br />
                            {obj.state === '요청 진행중' ? <Counter data={obj} /> : <>{obj.state}</>}
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        )
    })
    return (
        <Container>
            {requestList.length === 0
                ?
                <Typography variant="h5" gutterBottom align="center">현재 진행중인 요청이 없습니다.</Typography>
                :
                <Grid container spacing={4}>
                    {MyRequestList}
                </Grid>
            }
        </Container>
    )
}

export default MyRequests
