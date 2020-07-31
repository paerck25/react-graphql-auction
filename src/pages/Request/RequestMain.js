import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import RequestList from './RequestList';
import CategoryMenu from './CategoryMenu';


function RequestMain() {

    const [category,setCategory] = useState('모든 요청');

    return (
        <Grid style={{ marginTop: '2px' }} container spacing={1}>
            <Grid style={{ textAlign: 'center', marginRight: '10px' }} item xs={2}>
                <CategoryMenu setCategory={setCategory}/>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={9}>
                <RequestList category={category}/>
            </Grid>
        </Grid>
    )
}


export default RequestMain;