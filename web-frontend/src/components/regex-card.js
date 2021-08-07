import { Button, Card, CardContent, Typography, makeStyles, Box, Icon, IconButton, Link, Collapse, Paper, TextField } from "@material-ui/core";
import { Comment, CommentSharp, Edit, FileCopy, ThumbUp } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import EditRegexDialog from "../dialogs/edit-regex-dialog";
import getRegexEntryComments from '../use-cases/get-regex-entry-comments';
import formatDate from "../utilities/format-date";
import addComment from '../use-cases/add-comment';

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
  },
  commentsContainer: {
    maxHeight: '36rem',
    overflowY: 'scroll'
  },
  commentPaper: {
    padding: '0.8rem'
  },
  commenter: {
    fontSize: '0.8rem',
    color: 'gray'
  },
  noCommentText: {
    textAlign: 'center'
  }
}));

const useCommentBoxStyles = makeStyles(theme => ({
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.8rem'
  },
  nameField: {
    marginLeft: '0.5rem'
  },
  commentContent: {
    width: '100%'
  }
}))

const RegexCard = ({ itemId, title, description, regex, commentCount, lastEdited, created, notifyChange, ...props }) => {
  const classes = useStyles();
  const commentBoxClasses = useCommentBoxStyles();

  const commentFormRef = useRef(null);
  const regexTextRef = useRef(null);

  const [editRegexDialogOpen, setEditRegexDialogOpen] = useState(false);
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    let commentResults = await getRegexEntryComments(itemId);

    let sorted = commentResults.sort((a, b) => {
      if (a.created < b.created) {
        return 1;
      } else if (a.created > b.created) {
        return -1;
      } else {
        return 0;
      }
    });

    setComments(sorted);
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments])

  const toggleShowComments = () => setShowComments(!showComments);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    console.log('Creating comment.');

    let data = new FormData(event.target);

    let createdComment = await addComment(
      itemId,
      data.get('comment-as'),
      data.get('comment-content')
    );

    console.log('Comment added', createdComment);

    await loadComments();

    commentFormRef.current.reset();
  }

  const handleCopyRegex = () => {
    navigator.clipboard.writeText(regex);
  }

  return (
    <Card>
      <EditRegexDialog 
        open={editRegexDialogOpen} 
        setOpen={setEditRegexDialogOpen} 
        itemId={itemId}
        title={title}
        description={description}
        regex={regex}
        onDialogSubmit={() => notifyChange()}
      />
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <Box display='flex' mt={1} mb={1} p={1} className={classes.codeContainer}>
          <Typography innerRef={regexTextRef} className={classes.code}>{regex}</Typography>
          <IconButton onClick={handleCopyRegex}>
            <Icon>content_copy</Icon>
          </IconButton>
        </Box>
        <Typography paragraph>{description}</Typography>
        <Box display='flex' alignItems='center'>
          <Box flexGrow={1}>
            <Link component='button' className={classes.voteCount} onClick={toggleShowComments}>{commentCount} Comment(s)</Link>
          </Box>
          <Typography>Last edited on {formatDate(lastEdited)}</Typography>
          <Box ml={1.5}>
            <Button color='secondary' variant='contained' className={classes.button} onClick={() => setEditRegexDialogOpen(true)}>
              <Edit className={classes.buttonIcon} />
              Edit
            </Button>
          </Box>
        </Box>
        <Collapse in={showComments}>
          <Box mt={1.5} className={classes.commentsContainer}>
            <Box mb={2}>
              <Paper className={classes.commentPaper} variant='outlined'>
                <form ref={commentFormRef} method='POST' onSubmit={handleSubmitComment}>
                  <TextField name='comment-content' 
                    className={commentBoxClasses.commentContent}
                    required 
                    placeholder='Your comment' 
                    variant='outlined' 
                    multiline 
                    minRows={3} />
                  <Box className={commentBoxClasses.nameContainer}>
                    <Typography>Comment as:</Typography>
                    <TextField name='comment-as' 
                      className={commentBoxClasses.nameField}
                      required 
                      placeholder='Your name' 
                      variant='outlined' 
                      size='small' 
                    />
                    <Box flexGrow={1}></Box>
                    <Button type='submit'
                      color='secondary' 
                      variant='contained' 
                      className={classes.button}
                    >
                      <Comment className={classes.buttonIcon} />
                      Comment
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Box>
            {comments.length > 0 ?
            comments.map(comment => {
              return (
                <Box mb={1}>
                  <Paper className={classes.commentPaper} variant='outlined'>
                    <Typography className={classes.commenter}>{comment.commenter} ({formatDate(comment.created)})</Typography>
                    <Typography>{comment.comment}</Typography>
                  </Paper>
                </Box>
              );
            })
            : <Typography className={classes.noCommentText}>No comments to show. Be the first one to do so!</Typography>}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default RegexCard;