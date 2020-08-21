import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Chat from './chat';
import BidList from './BidList';
import { Grid, Container, Divider, Avatar } from '@material-ui/core';
import ChatBox from './chat/ChatBox';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import ProfileModal from '../../../components/Profile/ProfileModal';
import { GET_MY_PROFILE_IMAGE } from '../../../lib/queries';
import { useQuery } from '@apollo/client';
import PersonIcon from '@material-ui/icons/Person';


const MyPage = () => {
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

    const avatarStyle = { 
        margin:'auto',
        width: '180px',
        height: '180px',
    }

    useEffect(()=>{
        if(data){
            console.log(data);
        }
    },[data])

    return (
        <Grid style={{ marginTop: '2px' }} container spacing={1}>
            <Grid style={{ textAlign: 'center', marginRight: '10px' }} item xs={2}>
                {data
                    &&
                    <Avatar style={avatarStyle}>
                        {data.getMyProfile.profileImage
                            ?
                            <img src={data.getMyProfile.profileImage} alt="avatar" />
                            :
                            <PersonIcon style={{ fontSize: 100 }} />
                        }
                    </Avatar>
                }
                <h3>{userName}</h3>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/seller/mypage'>
                    판매 정보
                    </Button>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/user/mypage'>
                    구매 정보
                    </Button>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" onClick={handleClickOpen}>
                    나의 프로필
                    </Button>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/seller/mypage/chat'>
                    채팅 상담
                    </Button>
                <br />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid style={{ marginLeft: '15px' }} item xs={9}>
                <Route exact path='/seller/mypage' component={BidList} />
                <Route path='/seller/mypage/chat' component={Chat} exact />
                <Route path='/seller/mypage/chat/:id' component={ChatBox} exact />
            </Grid>
            <ProfileModal name={userName} open={open} onClose={handleClose} user_id={user_id} />
        </Grid>
    )

}

export default MyPage;