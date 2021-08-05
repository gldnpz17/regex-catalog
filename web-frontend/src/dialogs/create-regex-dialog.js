import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  formField: {
    width: '100%'
  }
}));

const CreateRegexDialog = ({ open, setOpen, ...props }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth={true} {...props}>
      <DialogTitle>Add Regex Entry</DialogTitle>
      <DialogContent>
        <form>
          <Box mb={1.5}>
            <TextField label='Title' variant='outlined' required className={classes.formField} />
          </Box>
          <Box mb={1.5}>
            <TextField label='Regex' variant='outlined' required className={classes.formField} />
          </Box>
          <Box>
            <TextField multiline label='Description' required helperText='512 characters max' minRows={3} variant='outlined' className={classes.formField} />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClose}>Cancel</Button>
        <Button color='primary'>Add</Button>
      </DialogActions>
    </Dialog>
  )
};

export default CreateRegexDialog;