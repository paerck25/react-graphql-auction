import React, { useState } from 'react';
import Request from './Request';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_ALL_REQUESTS } from '../../../lib/queries';
import { useQuery } from '@apollo/client';
import SortButton from './SortButton';
import { Typography, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    loadingStyle: {
        display: 'block',
        margin: '10% auto',
    },
    tagStyle: {
        marginRight: '4px',
    }

}));


const RequestList = ({ category }) => {
    const classes = useStyles();

    const { loading, data, error } = useQuery(GET_ALL_REQUESTS, {
        fetchPolicy: 'cache-and-network',
    });

    const [tags, setTags] = useState([]);

    const tagSort = tags.map((obj, index) => {
        return <Chip className={classes.tagStyle} key={index} label={obj} variant="default" size="small" onDelete={() => { onClickRemove(index) }} />
    })

    const onClickRemove = (index) => {
        const list = tags.filter((obj, x) => {
            return x !== index;
        })
        setTags(list)
    }


    if (loading) {
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    if (!loading) {
        console.log(data);
    }


    if (error) {
        alert(error);
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }


    const requestList = data.getAllRequests
        .map((obj) => {
            return (
                <Grid key={obj._id} item xs={6}>
                    <Request tags={tags} setTags={setTags} data={obj} checked={loading}></Request>
                </Grid>
            )
        })


    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h5" style={{ display: 'inline-block', margin: '0px' }} gutterBottom>{category}</Typography>
            <br />
            <br/>
            {tagSort}
            <SortButton category={category} />
            <Grid container spacing={3}>
                {requestList}
            </Grid>
        </Container>
    )


}


export default RequestList;