import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Divider, Container, makeStyles } from '@material-ui/core';
import RequestList from './RequestList';
import CategoryMenu from './CategoryMenu';

const useStyle = makeStyles((theme)=>({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        color : 'rgb(104,104,106)',
    },
}))


function RequestMain() {

    const classes = useStyle();
    const [category,setCategory] = useState('모든 요청');

    return (
        <Container className={classes.heroContent}>
            <Grid container spacing={9}>
                <Grid item xs={2}>
                    <CategoryMenu setCategory={setCategory}/>
                </Grid>
                <Grid item xs={9}>
                    <RequestList category={category}/>
                </Grid>
            </Grid>
        </Container>
    )
}


export default RequestMain;