import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Container, Divider, Grid } from '@material-ui/core';
import Github from '../img/github-icon.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/paerck25">
        KDJ-Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br/><br/>
      <Link color="inherit" href="https://github.com/paerck25">
        <img src={Github} alt="github_icon" width="30px" height="30px" />
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(4),
  },
}));

export default function Footer() {

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h5" align="center">
      SELECPERT
      </Typography>
      <br/>
      <Copyright />
    </footer>
  )
}