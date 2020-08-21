import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grid, Divider, Chip, Typography, Paper, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Counter from '../../../../components/Counter'


const MyRequests = ({ data }) => {



    const requestList = data.filter((obj) => {
        return (obj.state === '요청 진행중') || (obj.state === '거래 진행중') || (obj.state === '요청 마감');
    })

    const MyRequestList = requestList.map((obj) => {

        const showTagList = obj.tags.map((obj, index) => {
            return <Chip key={index} style={{ margin: '2px' }} label={obj} variant="outlined" size="small" />
        })

        return (
            <Grid key={obj._id} style={{ margin: 'auto' }} item xs={4}>
                <Link style={{ textDecoration: 'none' }} to={{ pathname: `/user/mypage/detail`, state: obj }}>
                    <Card style={{ textAlign: 'center' }} size="large" color="primary">
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
                <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>현재 진행중인 요청이 없습니다.</Typography>
                :
                <Grid container spacing={4}>
                    {MyRequestList}
                </Grid>
            }
        </Container>
    )
}

export default MyRequests
