import { Box, Button, Container, TextField, makeStyles, styled } from '@material-ui/core';
import RegexCard from '../components/regex-card';
import './home-page.css';

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
  const searchClasses = useSearchStyles();

  return (
    <Container maxWidth='md'>
      <form>
        <Box display='flex' className={searchClasses.container}>
          <TextField label='Search' size='small' variant='outlined' 
            className={searchClasses.text} 
            placeholder='Keywords'
          />
          <Button color='secondary' variant='contained'>Search</Button>
        </Box>
      </form>
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