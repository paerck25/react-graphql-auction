import React from 'react';
import { Link } from 'react-router-dom';
import BidList from './MyBid/BidList';
import { Grid, Container, Avatar, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProfileModal from '../../../components/Profile/ProfileModal';
import { GET_MY_PROFILE_IMAGE } from '../../../lib/queries';
import { useQuery } from '@apollo/client';


const useStyle = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        color: 'rgb(104,104,106)',
    },
    avatarStyle: {
        margin: 'auto',
        width: '180px',
        height: '180px',
        backgroundColor: 'rgb(104,104,106)',
        border: 'none',
    },
    gridStyle: {
        textAlign: 'center',
        marginRight: '30px',
    },
    buttonStyle: {
        width: '100%',
        margin: '1px'
    }
}))



const MyPage = () => {
    const classes = useStyle();
    const userName = localStorage.getItem('userName');
    const user_id = localStorage.getItem('user_id')
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { loding,data } = useQuery(GET_MY_PROFILE_IMAGE, {
        variables: {
            user: user_id,
        },
        fetchPolicy: 'cache-and-network',
    })

    return (

        <Container className={classes.heroContent}>
            <Grid container>
                <Grid className={classes.gridStyle} item xs={2}>
                    <Avatar className={classes.avatarStyle} src={(!loding && data) && data.getMyProfile.profileImage} />
                    <br />
                    <Typography variant="h5" gutterBottom>{userName}</Typography>
                    <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/seller/mypage'>
                        판매 정보
                    </Button>
                    <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/user/mypage'>
                        구매 정보
                    </Button>
                    <Button className={classes.buttonStyle} variant="outlined" onClick={handleClickOpen}>
                        나의 프로필
                    </Button>
                    <br />
                </Grid>
                <Grid item xs={9}>
                    <BidList/>
                </Grid>
                <ProfileModal name={userName} open={open} onClose={handleClose} user_id={user_id} />
            </Grid>
        </Container>


    )

}

export default MyPage;