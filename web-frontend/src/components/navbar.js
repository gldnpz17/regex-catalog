import { AppBar, Button, Toolbar, Typography, makeStyles, Box } from "@material-ui/core";
import { Code } from "@material-ui/icons";
import { useState } from "react";

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
  const classes = useStyles();

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Code />
        <Typography variant='h6' className={classes.brand}>
          regex-catalog
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;