import { Box, Button, Container, TextField, makeStyles, styled, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import RegexCard from '../components/regex-card';
import CreateRegexDialog from '../dialogs/create-regex-dialog';
import EditRegexDialog from '../dialogs/edit-regex-dialog';
import LoginDialog from '../dialogs/login-dialog';
import './home-page.css';

const useStyles = makeStyles(theme => ({
  addFab: {
    position: 'fixed',
    zIndex: 10,
    right: '2rem',
    bottom: '2rem'
  }
}));

const useSearchStyles = makeStyles(theme => ({
  container: {
    marginTop: '3rem',
    marginBottom: '3rem',
    width: '100%'
  },
  text: {
    marginRight: '1rem',
    flexGrow: 1
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const searchClasses = useSearchStyles();

  const [createRegexDialogOpen, setCreateRegexDialogOpen] = useState(false);

  return (
    <Container maxWidth='md'>
      <CreateRegexDialog open={createRegexDialogOpen} setOpen={setCreateRegexDialogOpen} />
      <form>
        <Box display='flex' className={searchClasses.container}>
          <TextField label='Search' size='small' variant='outlined' 
            className={searchClasses.text} 
            placeholder='Keywords'
          />
          <Button color='secondary' variant='contained'>Search</Button>
        </Box>
      </form>
      <Fab className={classes.addFab} color='primary' onClick={() => setCreateRegexDialogOpen(true)}>
        <Add />
      </Fab>
      <Box mb={2}>
        <RegexCard />
      </Box>
      <Box mb={2}>
        <RegexCard />
      </Box>
      <Box mb={2}>
        <RegexCard />
      </Box>
      <Box mb={2}>
        <RegexCard />
      </Box>
      <Box mb={2}>
        <RegexCard />
      </Box>
    </Container>
  );
};

export default HomePage;