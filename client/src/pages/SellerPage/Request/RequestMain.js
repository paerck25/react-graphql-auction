import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles,Typography,Chip } from '@material-ui/core';
import RequestList from './RequestList';
import CategoryMenu from './CategoryMenu';
import SortButton from './SortButton';

const useStyle = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        color: 'rgb(104,104,106)',
    },
    cardGrid: {
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    tagStyle: {
        marginRight: '4px',
    },
    sortMenu : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : '10px'
    }
}))


function RequestMain() {

    const classes = useStyle();
    const [category, setCategory] = useState('모든 요청');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        deadLine : 1
    });
    const [tags, setTags] = useState([]);

    const onClickRemove = (index) => {
        const list = tags.filter((obj, x) => {
            return x !== index;
        })
        setTags(list)
    }

    const tagSort = tags.map((obj, index) => {
        return <Chip className={classes.tagStyle} key={index} label={obj} variant="default" size="small" onDelete={() => { onClickRemove(index) }} />
    })

    return (
        <Container className={classes.heroContent}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <CategoryMenu setCategory={setCategory} setPage={setPage} />
                </Grid>
                <Grid item xs={12} sm={9}>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Typography variant="h5" gutterBottom>{category}</Typography>
                    <div className={classes.sortMenu}>
                        <div>
                            &nbsp;{tagSort}
                        </div>
                        <SortButton sort={sort} setSort={setSort} />
                    </div>
                    <RequestList category={category} page={page} setPage={setPage} sort={sort} tags={tags} setTags={setTags} />
                </Container>
                </Grid>
            </Grid>
        </Container>
    )
}


export default RequestMain;