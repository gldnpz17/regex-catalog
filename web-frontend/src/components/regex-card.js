import { Button, Card, CardContent, Typography, makeStyles, Box, Icon, IconButton } from "@material-ui/core";
import { Edit, FileCopy, ThumbUp } from "@material-ui/icons";
import { useState } from "react";
import EditRegexDialog from "../dialogs/edit-regex-dialog";

const useStyles = makeStyles(theme => ({
  button: {
    paddingRight: '12px',
    paddingLeft: '12px',
  },
  buttonIcon: {
    marginRight: '0.5rem'
  },
  codeContainer: {
    backgroundColor: theme.palette.primary.light,
    alignItems: 'center'
  },
  code: {
    fontFamily: 'inconsolata',
    fontSize: '1.2rem',
    marginRight: '1rem',
    flexGrow: 1
  },
  title: {
    fontSize: '1.3rem'
  },
  voteCount: {
    color: 'gray'
  }
}));

const RegexCard = ({ itemId, title, description, regex, contributors, helpful, helpfulCount, ...props }) => {
  const classes = useStyles();

  const [editRegexDialogOpen, setEditRegexDialogOpen] = useState(false);

  return (
    <Card>
      <EditRegexDialog open={editRegexDialogOpen} setOpen={setEditRegexDialogOpen} />
      <CardContent>
        <Typography className={classes.title}>Email Validation</Typography>
        <Box display='flex' mt={1} mb={1} p={1} className={classes.codeContainer}>
          <Typography className={classes.code}>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</Typography>
          <IconButton>
            <Icon>content_copy</Icon>
          </IconButton>
        </Box>
        <Typography paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis fringilla posuere. Morbi egestas ipsum dui, in auctor lorem auctor et. Nulla quis orci venenatis, scelerisque sapien ut, dignissim orci. Proin ut mi nisi. Morbi enim dui, porttitor fringilla fermentum id, varius ac dolor.</Typography>
        <Box display='flex' alignItems='center'>
          <Box flexGrow={1}>
            <Typography className={classes.voteCount}>42 Voted</Typography>
          </Box>
          <Box mr={2}>
            <Button color='secondary' variant='contained' className={classes.button} onClick={() => setEditRegexDialogOpen(true)}>
              <Edit className={classes.buttonIcon} />
              Edit
            </Button>
          </Box>
          <Button color='secondary' variant='contained' className={classes.button}>
            <ThumbUp className={classes.buttonIcon} />
            Vote
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegexCard;