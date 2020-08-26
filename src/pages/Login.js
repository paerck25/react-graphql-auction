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
import { Link as RLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../lib/queries';
import Axios from 'axios';
import { Toolbar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : '#F2F3F4',
    borderRadius : '10px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({handleJoin}) => {

  const classes = useStyles();
  const history = useHistory();
  const is_login = useSelector(state => state.userAction.is_login);
  const is_seller = useSelector(state => state.userAction.is_seller);
  const dispatch = useDispatch();
  const [login, { data }] = useMutation(LOGIN);
  const [user, setUser] = useState({
    email: '',
    pwd: '',
  })

  useEffect(() => {
    if (is_login) {
      if (is_seller) {
        history.push('/seller');
      } else {
        history.push('/user');
      }
    }
    if (data) {
      if (data.login._id) {
        dispatch({ type: 'LOGIN', payload: { user_id: data.login._id, is_seller: data.login.is_seller, userName: data.login.name } });
        localStorage.setItem('is_login', true);
        localStorage.setItem('is_seller', data.login.is_seller);
        localStorage.setItem('user_id', data.login._id);
        localStorage.setItem('userName', data.login.name);
        console.log(data.login.result);
        if (data.login.is_seller) {
          history.push('/seller');
        } else {
          history.push('/user');
        }
      } else {
        alert(data.login.result);
      }
    }
  }, [history, is_login, is_seller, data, dispatch])

  const onChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    login({
      variables: {
        ...user
      }
    })
  }

  return (
      <Container className={classes.paper} component="main" maxWidth="xs">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="pwd"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Button href="#">
                비밀번호 찾기
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleJoin}>
                회원가입
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
  );
}



// const Login = () => {

//   const classes = useStyles();
//   const history = useHistory();
//   const is_login = useSelector(state => state.userAction.is_login);
//   const is_seller = useSelector(state => state.userAction.is_seller);
//   const dispatch = useDispatch();
//   const [user, setUser] = useState({
//     email: '',
//     pwd: '',
//   })

//   useEffect(() => {
//     if (is_login) {
//       if(is_seller){
//         history.push('/seller');
//       } else {
//         history.push('/user');
//       }
//     }
//   }, [history, is_login,is_seller])

//   const onChangeInput = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value
//     })
//   }

//   const login = () => {
//     Axios.post('/login',{
//       ...user
//     })
//     .then(res=>{
//       if (res.data._id) {
//         dispatch({ type: 'LOGIN', payload: { user_id: res.data._id, is_seller: res.data.is_seller, userName: res.data.name } });
//         localStorage.setItem('is_login', true);
//         localStorage.setItem('is_seller', res.data.is_seller);
//         localStorage.setItem('user_id', res.data._id);
//         localStorage.setItem('userName', res.data.name);
//         console.log(res.data.result);
//         if(res.data.is_seller){
//           history.push('/seller');
//         } else {
//           history.push('/user');
//         }
//       } else {
//         alert(res.data.result);
//       }
//     })
//   }

//   const onSubmitForm = (e) => {
//     e.preventDefault();
//     login();
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           로그인
//         </Typography>
//         <form
//           className={classes.form}
//           noValidate
//           onSubmit={onSubmitForm}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             id="email"
//             label="이메일"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={onChangeInput}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             name="pwd"
//             label="비밀번호"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={onChangeInput}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             로그인
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 비밀번호 찾기
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link component={RLink} to="/join" variant="body2">
//                 회원가입
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//         <br />
//       </div>
//     </Container>
//   );
// }

export default Login;