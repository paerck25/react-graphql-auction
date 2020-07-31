import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RLink, useHistory } from 'react-router-dom';
import { SIGNUP } from '../../lib/queries';
import { useMutation } from '@apollo/client';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function JoinForm(props) {

  const classes = useStyles();
  const history = useHistory();

  const [signUp, { data }] = useMutation(SIGNUP);

  const [userInfo, setInfo] = useState({
    name: '',
    email: '',
    pwd: '',
  })

  const [is_seller] = useState(props.location.state.is_seller);

  useEffect(() => {
    if (data) {
      if (data.signUp) {
        history.push('/login')
      } else {
        alert('이미 가입된 이메일입니다.')
      }
    }
  }, [data, history])


  const onChangeInfo = (e) => {
    setInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (userInfo.name === '' || userInfo.email === '' || userInfo.pwd === '') {
      alert('빈 항목이 존재합니다.')
    } else {
      signUp({
        variables: {
          input: {
            name: userInfo.name,
            email: userInfo.email,
            pwd: userInfo.pwd,
            is_seller: is_seller,
          }
        }
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
                onChange={onChangeInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                type="email"
                onChange={onChangeInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pwd"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangeInfo}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RLink} to="/login" variant="body2">
                이미 아이디가 있으신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}