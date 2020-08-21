import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Chat from './chat';
import BidList from './BidList';
import { Grid, Container, Divider, Avatar, makeStyles, Typography } from '@material-ui/core';
import ChatBox from './chat/ChatBox';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import ProfileModal from '../../../components/Profile/ProfileModal';
import { GET_MY_PROFILE_IMAGE } from '../../../lib/queries';
import { useQuery } from '@apollo/client';
import PersonIcon from '@material-ui/icons/Person';

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

    const { data } = useQuery(GET_MY_PROFILE_IMAGE, {
        variables: {
            user: user_id,
        },
        fetchPolicy: 'cache-and-network',
    })

    return (
        <Container className={classes.heroContent}>
            <Grid container>
                <Grid className={classes.gridStyle} item xs={2}>
                    {data &&
                        data.getMyProfile.profileImage
                        ?
                        <Avatar className={classes.avatarStyle} src={data.getMyProfile.profileImage} />
                        :
                        <Avatar className={classes.avatarStyle}>
                            <PersonIcon style={{ fontSize: 100 }} />
                        </Avatar>
                    }
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
                    <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/seller/mypage/chat'>
                        채팅 상담
                        </Button>
                    <br />
                </Grid>
                <Grid item xs={9}>
                    <Route exact path='/seller/mypage' component={BidList} />
                    <Route path='/seller/mypage/chat' component={Chat} exact />
                    <Route path='/seller/mypage/chat/:id' component={ChatBox} exact />
                </Grid>
                <ProfileModal name={userName} open={open} onClose={handleClose} user_id={user_id} />
            </Grid>
        </Container>


    )

}

// const MyPage = () => {

//     const userName = localStorage.getItem('userName');
//     const user_id = localStorage.getItem('user_id')
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const { data } = useQuery(GET_MY_PROFILE_IMAGE, {
//         variables: {
//             user: user_id,
//         },
//         fetchPolicy: 'cache-and-network',
//     })

//     const [data, setData] = useState('');
//     const [loading, setLoading] = useState(true);

//     const getMyProfileImage = () => {
//         Axios.get('/my-profile-image',{
//             user : user_id
//         })
//         .then(res=>{
//             setData(res.data);
//             setLoading(false);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     const avatarStyle = { 
//         margin:'auto',
//         width: '180px',
//         height: '180px',
//     }

//     useEffect(()=>{
//         getMyProfileImage();
//     },[])

//     return (
//         <Grid style={{ marginTop: '2px' }} container spacing={1}>
//             <Grid style={{ textAlign: 'center', marginRight: '10px' }} item xs={2}>
//                 {!loading
//                     &&
//                     <Avatar style={avatarStyle}>
//                         {data.profileImage
//                             ?
//                             <img src={data.profileImage} alt="avatar" />
//                             :
//                             <PersonIcon style={{ fontSize: 100 }} />
//                         }
//                     </Avatar>
//                 }
//                 <h3>{userName}</h3>
//                 <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/seller/mypage'>
//                     판매 정보
//                     </Button>
//                 <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/user/mypage'>
//                     구매 정보
//                     </Button>
//                 <Button className={classes.buttonStyle} variant="outlined" onClick={handleClickOpen}>
//                     나의 프로필
//                     </Button>
//                 <Button className={classes.buttonStyle} variant="outlined" component={Link} to='/seller/mypage/chat'>
//                     채팅 상담
//                     </Button>
//                 <br />
//             </Grid>
//             <Divider orientation="vertical" flexItem />
//             <Grid style={{ marginLeft: '15px' }} item xs={9}>
//                 <Route exact path='/seller/mypage' component={BidList} />
//                 <Route path='/seller/mypage/chat' component={Chat} exact />
//                 <Route path='/seller/mypage/chat/:id' component={ChatBox} exact />
//             </Grid>
//             <ProfileModal name={userName} open={open} onClose={handleClose} user_id={user_id} />
//         </Grid>
//     )

// }

export default MyPage;