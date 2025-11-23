/** @jsxImportSource @emotion/react */
import React, {useState, useRef, useEffect} from "react";
import { CardContent, Typography, TextField, Button, Alert, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentById, postCommentsById } from "../../../../actions/comments";
import { allComments, commentSection, eachComment, highlightedComment } from "./styles";

const Comments = ({user, recipe, highlightMyComment}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(null);
  const [showCommentError, setShowCommentError] = useState(null);
  const commentSectionRef = useRef(null);
  const highlightCommentRef = useRef({});
  const sortedComments = React.useMemo(() => {
    const copy = [...comments];
  
    copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    if (highlightMyComment) {
      copy.sort((a, b) => {
        if (a.id === highlightMyComment) return -1;
        if (b.id === highlightMyComment) return 1;
        return 0;
      });
    }
  
    return copy;
  }, [comments, highlightMyComment]);
  

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditCommentClick = (e, comment) => {
    setAnchorEl(e.currentTarget)
    setSelectedComment(comment)
  }

  const handleCancelComment = () => {
    setAddingComment(false);
    setNewComment("");
    setShowCommentError(false);
  };

  const handleSubmitComment = () => {
    if (!user.username) {
      setShowCommentError(true);
      return;
    }
    dispatch(postCommentsById(recipe.id, { body: newComment }));
    setNewComment("");
  };

  useEffect(()=>{
    if(addingComment && commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({behavior: "smooth", block: "center"})
    }
  },[addingComment])

  useEffect(()=>{
    if(showCommentError && commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({behavior: "smooth", block: "center"})
    }
  },[showCommentError])


  useEffect(() => {
    if (highlightMyComment && highlightCommentRef.current[highlightMyComment]) {
  
      requestAnimationFrame(() => {
        const el = highlightCommentRef.current[highlightMyComment];
        if (!el) return;
  
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [highlightMyComment, sortedComments]);
  

  const handleCommentFieldClick = () => {
    setAddingComment(true);
  };

  const handleDeleteComment = () => {
    handleClose()
    dispatch(deleteCommentById(selectedComment.id, recipe.id))
  }

    return (
        <CardContent>
        <div>
          <Typography variant="h6">Comments ({comments.length})</Typography>
          <div>
            <TextField
              name="comment"
              variant="outlined"
              label="Leave a comment"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onClick={handleCommentFieldClick}
            ></TextField>
            {addingComment && (
              <div ref={commentSectionRef} css={commentSection}>
                <Button onClick={handleCancelComment}>Cancel</Button>
                <Button onClick={handleSubmitComment}>Comment</Button>
                {showCommentError && (
                  <Alert severity="error">
                    You must login to leave a comment
                  </Alert>
                )}
              </div>
            )}
          </div>
          {sortedComments.map((comment) => (
            <div key={comment.id} css={[allComments, highlightMyComment === comment.id && highlightedComment]} ref={(el) => {
              if (el) highlightCommentRef.current[comment.id] = el;
            }}>
              <div>
                <div css={eachComment}>
                  <Typography variant="subtitle1" fontWeight="bold">
                  {comment.username}
                  </Typography>
                  <Typography variant="subtitle2">{moment(comment.created_at).fromNow()}</Typography>
               </div>
                <Typography variant="body2">{comment.body}</Typography>
              </div>
              {comment.user_id === user.id && (
                <div>
                  <IconButton
                  onClick={(e) => handleEditCommentClick(e, comment)}
                  aria-controls={Boolean(anchorEl) ? "edit-comment-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? true : undefined}
                  >
                  <MoreVert></MoreVert> {/* Add delete and edit comment */}
                </IconButton>
                <Menu
                  id="edit-comment-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                </Menu>
                </div>
              )}
            </div>
          ))}
        </div>
    </CardContent> 
    )

  }

export default Comments;