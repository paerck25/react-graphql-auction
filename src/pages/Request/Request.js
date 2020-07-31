import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../../components/Counter'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        textDecoration: 'none',
    },
    cardHead: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    tagStyle: {
        display: 'inline-block',
        backgroundColor: '#F0F0F0',
        borderRadius: '3px',
        padding: '2px 5px',
        margin: '5px',
        fontWeight: 'bold',
    }
}));

function Request({ data }) {

    const classes = useStyles();


    const showTagList = data.tags.map((obj) => {
        // return <span key={obj}><Chip size="small" label={obj} />&nbsp;</span>
        return <small className={classes.tagStyle} key={obj}>{obj}</small>
    })

    return (
        <Card component={Link} to={{ pathname: `list/${data._id}`, state: { data: data } }} size="large" color="primary" variant="outlined" className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography gutterBottom className={classes.cardHead}>
                            {data.category}
                        </Typography>
                        <Typography>
                            {showTagList}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            <Counter data={data}></Counter>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Request;

