import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core"

const LoginDialog = ({ open, setOpen, ...props }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} {...props}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form>
          <Box mb={1.5}>
            <TextField label='Username' variant='outlined' />
          </Box>
          <Box>
            <TextField label='Password' type='password' variant='outlined' />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClose}>Cancel</Button>
        <Button color='primary'>Login</Button>
      </DialogActions>
    </Dialog>
  )
};

export default LoginDialog;