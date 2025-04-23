import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  videoPath, 
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://goglobalback.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const [newComment, setNewComment] = useState("");
  const addComment = async () => {
    if (!newComment.trim()) return;
  
    const response = await fetch(`https://goglobalback.onrender.com/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: newComment }),
    });
  
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment("");
  };
  


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>


      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://goglobalback.onrender.com/assets/${picturePath}`}
        />
      )}

      {videoPath && (
      <div style={{ width: "100%", marginTop: "0.75rem" }}>
          <video
            width="100%"
            controls
            style={{ borderRadius: "0.75rem" }}
          >
          <source 
            src={`https://goglobalback.onrender.com/assets/${videoPath}`} 
            type={`video/${videoPath.split('.').pop()}`} 
          />
          Your browser does not support the video tag.
          </video>
      </div>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
  <Box mt="0.5rem">
    {comments.map((comment, i) => (
      <Box key={`${name}-${i}`}>
        <Divider />
        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
          {comment}
        </Typography>
      </Box>
    ))}
    <Divider />
    
    
    <Box display="flex" mt="0.5rem" pl="1rem" pr="1rem" gap="0.5rem">
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          backgroundColor: "#f0f0f0",
          borderRadius: "0.5rem",
          padding: "0.5rem",
        }}
      />
      <button
        onClick={addComment}
        style={{
          border: "none",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Post
      </button>
    </Box>
  </Box>
)}

    </WidgetWrapper>
  );
};

export default PostWidget;
