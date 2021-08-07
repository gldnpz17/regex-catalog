import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core"
import { useRef } from "react";
import editRegexEntry from '../use-cases/edit-regex-entry';

const useStyles = makeStyles(theme => ({
  formField: {
    width: '100%'
  }
}));

const EditRegexDialog = ({ open, setOpen, itemId, title, regex, description, onDialogSubmit, ...props }) => {
  const classes = useStyles();

  const formRef = useRef(null)

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Editing regex entry.');

    let data = new FormData(event.target);

    let editedEntry = await editRegexEntry(
      data.get('entry-id'),
      data.get('title'),
      data.get('regex'),
      data.get('description')
    );

    console.log('Entry edited.', editedEntry);
    formRef.current.reset();
    setOpen(false);
    onDialogSubmit();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth={true} {...props}>
      <form ref={formRef} method='POST' onSubmit={handleSubmit}>
        <DialogTitle>Edit Regex Entry</DialogTitle>
        <DialogContent>
            <Box mb={1.5}>
              <TextField label='ID' 
                name='entry-id'
                inputProps={{readOnly: true}} 
                variant='outlined' 
                defaultValue={itemId} 
                className={classes.formField} 
              />
            </Box>
            <Box mb={1.5}>
              <TextField label='Title' 
                name='title'
                variant='outlined' 
                required 
                className={classes.formField} 
                defaultValue={title} 
              />
            </Box>
            <Box mb={1.5}>
              <TextField label='Regex' 
                name='regex'
                variant='outlined' 
                required 
                className={classes.formField} 
                defaultValue={regex} 
              />
            </Box>
            <Box>
              <TextField multiline label='Description' 
                name='description'
                required 
                helperText='512 characters max' 
                minRows={3} 
                variant='outlined' 
                className={classes.formField} 
                defaultValue={description}
              />
            </Box>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>Cancel</Button>
          <Button color='primary' type='submit'>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default EditRegexDialog;