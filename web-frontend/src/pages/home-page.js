import { Box, Button, Container, TextField, makeStyles, styled, Fab, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import RegexCard from '../components/regex-card';
import CreateRegexDialog from '../dialogs/create-regex-dialog';
import './home-page.css';
import getRegexEntryCount from '../use-cases/get-regex-entry-count';
import getRegexEntries from '../use-cases/get-regex-entries';

const useStyles = makeStyles(theme => ({
  pageContainer: {
    marginBottom: '4rem'
  },
  addFab: {
    position: 'fixed',
    zIndex: 10,
    right: '2rem',
    bottom: '2rem'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  itemsPerPageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem'
  }
}));

const useSearchStyles = makeStyles(theme => ({
  container: {
    marginTop: '3rem',
    marginBottom: '2rem',
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

  const [page, setPage] = useState(1);
  const [pageItemCount, setPageItemCount] = useState(10);
  const [keywords, setKeywords] = useState("");
  const [regexEntries, setRegexEntries] = useState([]);

  const [totalItemCount, setTotalItemCount] = useState(0);

  const initialize = async () => {
    loadPage();
  };

  useEffect(() => {
    initialize();
  }, []);

  const loadPage = async () => {
    let start = (page - 1) * pageItemCount;

    setTotalItemCount(await getRegexEntryCount(keywords));

    setRegexEntries(await getRegexEntries(start, pageItemCount, keywords));
  };

  useEffect(() => {
    loadPage();
  }, [page])

  const resetSearch = () => {
    if (page === 1) {
      loadPage();
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    resetSearch();
  }, [pageItemCount, keywords]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setPageItemCount(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    console.log('Setting keywords.');

    let data = new FormData(event.target);

    let newKeywords = data.get('keywords');
    if (keywords === newKeywords) {
      loadPage();
    } else {
      setKeywords(newKeywords);
    }
  };

  return (
    <Container maxWidth='md' className={classes.pageContainer}>
      <CreateRegexDialog open={createRegexDialogOpen} setOpen={setCreateRegexDialogOpen} />
      <form method='POST' onSubmit={handleSubmitSearch}>
        <Box display='flex' className={searchClasses.container}>
          <TextField label='Search' name='keywords' size='small' variant='outlined' 
            className={searchClasses.text} 
            placeholder='Keywords'
          />
          <Button color='secondary' variant='contained' type='submit'>Search</Button>
        </Box>
      </form>
      <Box className={classes.itemsPerPageContainer}>
        <Typography>Showing {regexEntries.length} item(s) out of {totalItemCount}</Typography>
        <Box flexGrow={1}></Box>
        <Box mr={1}>
          <Typography>Items per page :</Typography>
        </Box>
        <FormControl>
          <Select
            value={pageItemCount}
            onChange={handleChangeItemsPerPage}
            inputProps={{
              name: 'itemsPerPage'
            }}
            variant='outlined'
            size='small'
          >
            <MenuItem value={10} selected>10 Items</MenuItem>
            <MenuItem value={25}>25 Items</MenuItem>
            <MenuItem value={50}>50 Items</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Fab className={classes.addFab} color='primary' onClick={() => setCreateRegexDialogOpen(true)}>
        <Add />
      </Fab>
      {regexEntries?.map(entry => {
        return (
          <Box mb={2}>
            <RegexCard key={entry.id}
              itemId={entry.id}
              title={entry.title}
              regex={entry.regex}
              description={entry.description}
              commentCount={entry.commentCount}
              lastEdited={entry.lastEdited}
              created={entry.created}
              notifyChange={() => loadPage()}
            />
          </Box>
        );
      })}
      <Box className={classes.paginationContainer} mt={4}>
        <Pagination count={Math.ceil(totalItemCount / pageItemCount)} page={page} onChange={handleChangePage} color='secondary' />
      </Box>
    </Container>
  );
};

export default HomePage;