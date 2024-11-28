/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import EditBar from './textbar';
import useStore from '../store';
import UploadIcon from '../img/uploadIcon';
import uploadImage from './s3';

function NewPosts(props) {
//   const post = useStore(({ postSlice }) => postSlice.fetchPost);
//   console.log(post('665fa6a58cefb7d99bc4cf8f'));
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setImage] = useState('');
  const newPost = useStore(({ postSlice }) => postSlice.createPost);
  const navigate = useNavigate();
  const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);
  const [img, setImg] = useState('');
  const validFileType = ['image/jpeg', 'image/png', 'image/jpg'];
  const [wrong, setWrong] = useState('');

  function onImageUpload(event) {
    // console.log(event);
    const file = event.target.files[0];
    console.log(file);
    if (!validFileType.find((type) => type === file.type)) {
      setImg({ preview: '' });
      setWrong('Wrong file type, enter a Png/jpg/jpeg ');
      return;
    } else {
      // sets the img state to have a preview and a file
      setImg({ preview: window.URL.createObjectURL(file), file });
    }
  }
  const onCreatePost = async () => {
    if (!title.trim() || !tags.trim() || !content.trim()) {
      alert('Please fill out the title, tags, and content fields.');
      return; // Stop the function if fields are empty
    }
    try {
      console.log(img.file);
      const url = await uploadImage(img.file);
      console.log(url);
      await newPost({
        Title: title,
        Content: content,
        Tags: tags,
        coverUrl: url,
      }, navigate);
      await fetchAllPosts(); // Re-fetch all posts after creating the new one
      navigate('/');
    } catch (error) {
      console.log(error);
    }
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
        {/* <h2>Cover Image Url:</h2>
        <div className="imageUpload">
          <textarea value={coverUrl} onChange={(e) => setImage(e.target.value)} />
        </div> */}
        {/* <img id="preview" alt="preview" src={img.preview} /> */}

        <div className="previewContainer">
          <img id="preview" alt="preview" src={img.preview} style={{ marginTop: '1.5em', height: 200, maxWidth: '80%' }} />
        </div>
        <input type="file" name="coverImage" onChange={onImageUpload} />
        {wrong && (
          <div>
            <span>
              {wrong}
            </span>
          </div>
        )}
      </div>
      {
        wrong ? (
          <div className="uploadBttn">
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={onCreatePost}>
              <UploadIcon />
              <p style={{ margin: '0px' }}>Upload</p>
            </div>
          </div>
        )
          : (
            <div className="uploadBttn">
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={onCreatePost}>
                <UploadIcon />
                <p style={{ margin: '0px' }}>Upload</p>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default NewPosts;
