/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import EditBar from './textbar';
import useStore from '../store';
import UploadIcon from '../img/uploadIcon';

function NewPosts(props) {
//   const post = useStore(({ postSlice }) => postSlice.fetchPost);
//   console.log(post('665fa6a58cefb7d99bc4cf8f'));
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setImage] = useState('');
  const newPost = useStore(({ postSlice }) => postSlice.createPost);
  const navigate = useNavigate();

  const onCreatePost = async () => {
    if (!title.trim() || !tags.trim() || !content.trim()) {
      alert('Please fill out the title, tags, and content fields.');
      return; // Stop the function if fields are empty
    }
    await newPost({
      title,
      tags,
      content,
      coverUrl,
    });
    navigate('/');
  };
  return (
    <div className="newPostcontainer">
      <div className="postheader">
        <h1>
          Create New Post
        </h1>
      </div>
      <div>
        <h2>Title:</h2>
        <div>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        {/* this would be where the title update goes? */}
      </div>
      <div>
        <h2>Tags:</h2>
        <div>

          <input type="text" required value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
      </div>
      <div>
        <h2>Content:</h2>
        <div className="newPostContent">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        </div>
      </div>
      <div>
        <h2>Cover Image Url:</h2>
        <div className="imageUpload">
          <textarea value={coverUrl} onChange={(e) => setImage(e.target.value)} />
        </div>
      </div>
      <div className="uploadBttn">
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={onCreatePost}>
          <UploadIcon />
          <p style={{ margin: '0px' }}>Upload</p>
        </div>
      </div>
    </div>
  );
}

export default NewPosts;
