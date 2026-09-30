import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./features/posts/postsSlice";
import "./App.css";

function App() {
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const handleAddPost = () => {
    const text = postText.trim();

    if (!text) return;

    dispatch(addPost(text));
    setPostText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddPost();
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Post List</h1>

        <div className="count">
          Total Posts: <strong>{posts.length}</strong>
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a post..."
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddPost}>Add</button>
        </div>

        <div className="posts">
          {posts.length === 0 ? (
            <p className="empty">No posts added yet.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;