import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),

    },
    containerStyle: {
        backgroundColor: 'white',
        padding: theme.spacing(3, 3, 3),
    },
    buttonStyle: {
        float: 'right',
        marginTop: '8px',
        marginRight: '50px',
    }
}));


const Home = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Container>
            <Grid container className={classes.heroContent}>
                <Grid item xs={8}>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        Try it!
                    </Typography>
                    <Typography variant="h3" color="textSecondary" paragraph>
                        when you want to have own website,<br />
                        here is best solution.
                    </Typography>
                </Grid>
            </Grid>
            <Container className={classes.containerStyle}>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                    Hello World!
                </Typography>
                <Divider />
                <Typography variant="h5" color="textSecondary" paragraph>
                    when you want to have own website,<br />
                        here is best solution.
                        asdfkajsdklfajsdlkfjas;dlkfajsd;lkfjasdflkajsd;fkajsd;lakjsd;f
                        lkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfja
                        sdflkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfja
                        sdflkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjas
                        dflkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjas
                        dflkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjasdf
                        lkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjasdf
                        lkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjas
                        dflkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadfsdfkajsdklfajsdlkfjas;dlkfajsd;lkfjasd
                        flkajsd;fkajsd;lakjsd;flkajsdkjfahsdhjfgasdkjhfgadskjhfgakdjhsfgakshjdfg
                        askdfhalskjdfhalksjdfhalfkjsh
                        askfdjhslakdfjhalsdkjfhalskdjfh
                        asdfasdfasdfasdfasdfasdfadf
                </Typography>
            </Container>
            <h1>shit</h1>
        </Container>
    );
}

export default Home;