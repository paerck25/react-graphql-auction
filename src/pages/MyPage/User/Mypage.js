import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Profile from './Profile';
import Chat from './chat';
import MyRequest from './MyRequest';
import { Grid, Container, Divider } from '@material-ui/core';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import RequestDetail from './MyRequest/RequestDetail';

const MyPage = () => {
    const userName = localStorage.getItem('userName');

    const imageStyle = { borderRadius: '10px' }
    return (
        <Grid style={{ marginTop: '2px' }} container spacing={1}>
            <Grid style={{ textAlign: 'center', marginRight: '10px' }} item xs={2}>
                <Image imageStyle={imageStyle} src="https://placeimg.com/280/250/animals" alt="avatar" />
                <h3>{userName}</h3>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/mypage'>
                    마이 페이지
                </Button>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/mypage/profile'>
                    프로필
                </Button>
                <Button style={{ width: '100%', margin: '1px' }} variant="outlined" component={Link} to='/mypage/chat'>
                    채팅 상담
                </Button>
                <br />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid style={{ marginLeft: '15px' }} item xs={9}>
                <Route exact path='/mypage' component={MyRequest} />
                <Route path='/mypage/detail' component={RequestDetail} />
                <Route path='/mypage/chat' component={Chat} />
                <Route path='/mypage/profile' component={Profile} />
            </Grid>
        </Grid>
    )
}

export default MyPage;