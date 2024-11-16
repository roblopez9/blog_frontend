/* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import useStore from '../store';
import TrashIcon from '../img/trashIcon';
import UploadIcon from '../img/uploadIcon';

function Postid(params) {
  const [titleisediting, setTitleisediting] = useState(false);
  const [tagisediting, setTagisediting] = useState(false);
  const [contentisediting, setContentisediting] = useState(false);
  const [isloading, setisloading] = useState(true);
  const fetchPost = useStore(({ postSlice }) => postSlice.fetchPost);
  const post = useStore(({ postSlice }) => postSlice.current);
  const deletePost = useStore(({ postSlice }) => postSlice.deletePost);
  const updatePost = useStore(({ postSlice }) => postSlice.updatePost);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setWord] = useState('');

  const deletingPost = async () => {
    await deletePost(id);
    navigate('/');
  };

  const updatingPost = async () => {
    await updatePost(id, {
      title,
      tags,
      content,
    });
    navigate('/');
  };

  useEffect(() => {
    setisloading(true); // Start loading
    fetchPost(id).finally(() => {
      setisloading(false); // Stop loading after data is fetched
    });

    return () => {
      // Reset or clear current post when leaving the page
      useStore.setState({ postSlice: { ...useStore.getState().postSlice, current: {} } });
    };
  }, [id]);

  useEffect(() => {
    setTitle(post.title || '');
    setTags(post.tags || '');
    setWord(post.content || '');
  }, [post]);

  if (isloading) {
    return (
      <ChakraProvider>

        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',
        }}
        >
          <Spinner size="xl" thickness="6px" color="#F0E1CC" />
        </div>
      </ChakraProvider>
    );
  }

  return (
    <div className="postIdContainer">
      <div className="postTitle">

        {
          titleisediting ? (
            <input onBlur={() => setTitleisediting(false)} value={title} onChange={(e) => setTitle(e.target.value)} />
          )
            : (
              <h1 onClick={() => setTitleisediting(true)}>{title}</h1>

            )
        }
      </div>
      <div>

        {
          tagisediting ? (
            <input className="editableInput" onBlur={() => setTagisediting(false)} value={tags} onChange={(e) => setTags(e.target.value)} />
          )
            : (
              <h3 className="editableInput" onClick={() => setTagisediting(true)}>{tags}</h3>

            )
        }
      </div>
      <div>

        {
          contentisediting ? (
            <textarea onBlur={() => setContentisediting(false)} value={content} onChange={(e) => setWord(e.target.value)} />
          )
            : (
              <h3 onClick={() => setContentisediting(true)}>
                <ReactMarkdown>{content}</ReactMarkdown>
              </h3>

            )
        }
      </div>
      <div className="bttn_style">
        <div className="updateBttn" onClick={updatingPost}>
          <UploadIcon />
          <p style={{ margin: '0px' }}> Update</p>
        </div>
        <div className="deleteBttn" onClick={deletingPost}>
          <TrashIcon />
          <p style={{ margin: '0px' }}>Delete</p>
        </div>

      </div>
    </div>
  );
}
export default Postid;
