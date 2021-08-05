import { AppBar, Button, Toolbar, Typography, makeStyles, Box } from "@material-ui/core";
import { Code } from "@material-ui/icons";
import { useState } from "react";
import LoginDialog from "../dialogs/login-dialog";
import SignUpDialog from "../dialogs/signup-dialog";

const useStyles = makeStyles(theme => ({
  brand: {
    marginLeft: '0.5rem',
    flexGrow: 1
  },
  loginButton: {
    marginRight: '1rem',
    color: theme.palette.primary.contrastText
  }
}));

const Navbar = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const classes = useStyles();

  return (
    <AppBar position='sticky'>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
      <SignUpDialog open={signUpDialogOpen} setOpen={setSignUpDialogOpen} />
      <Toolbar>
        <Code />
        <Typography variant='h6' className={classes.brand}>
          regex-catalog
        </Typography>
        <Button className={classes.loginButton} onClick={() => setLoginDialogOpen(true)}>login</Button>
        <Button variant='contained' color='secondary' onClick={() => setSignUpDialogOpen(true)}>sign up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;