import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      비트교육센터 5조{' '}
      {new Date().getFullYear()}
      {'.'}
      <br /><br />
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(4),
    color : 'rgb(104,104,106)',
  },
}));

export default function Footer() {

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h5" align="center">
        SelectPert
      </Typography>
      <Typography variant="subtitle2" align="center" paragraph>
        고객의 시점에서 제공하는 맞춤 전문가 서비스
      </Typography>
      <Copyright />
    </footer>
  )
}