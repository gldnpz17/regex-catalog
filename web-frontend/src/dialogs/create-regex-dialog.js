import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core"
import { useRef } from "react";
import addRegexEntry from '../use-cases/add-regex-entry';

const useStyles = makeStyles(theme => ({
  formField: {
    width: '100%'
  }
}));

const CreateRegexDialog = ({ open, setOpen, ...props }) => {
  const classes = useStyles();
  const formRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    formRef.current.reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Creating regex entry.');

    let data = new FormData(event.target);

    let createdEntry = await addRegexEntry(
      data.get('title'),
      data.get('regex'),
      data.get('description')
    );

    console.log('Entry added.', createdEntry);
    formRef.current.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth={true} {...props}>
      <form ref={formRef} method='POST' onSubmit={handleSubmit}>
        <DialogTitle>Add Regex Entry</DialogTitle>
        <DialogContent>
            <Box mb={1.5}>
              <TextField name='title' label='Title' variant='outlined' required className={classes.formField} />
            </Box>
            <Box mb={1.5}>
              <TextField name='regex' label='Regex' variant='outlined' required className={classes.formField} />
            </Box>
            <Box>
              <TextField name='description' multiline label='Description' required helperText='512 characters max' minRows={3} variant='outlined' className={classes.formField} />
            </Box>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>Cancel</Button>
          <Button color='primary' type='submit'>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default CreateRegexDialog;