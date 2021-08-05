import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  formField: {
    width: '100%'
  }
}));

const EditRegexDialog = ({ open, setOpen, ...props }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth={true} {...props}>
      <DialogTitle>Edit Regex Entry</DialogTitle>
      <DialogContent>
        <form>
          <Box mb={1.5}>
            <TextField label='ID' inputProps={{readOnly: true}} variant='outlined' defaultValue='0123456789' className={classes.formField} />
          </Box>
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
        <Button color='primary'>Save</Button>
      </DialogActions>
    </Dialog>
  )
};

export default EditRegexDialog;