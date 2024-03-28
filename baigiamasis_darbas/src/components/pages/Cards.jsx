import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #464972; /* Darker background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Darker shadow */
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444; /* Darker border color */
  border-radius: 4px;
  background-color: #c2bfbf;
  
`;

const TextArea = styled.textarea`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444; /* Darker border color */
  border-radius: 4px;
  background-color: #c2bfbf;
`;

const Button = styled.button`
  background-color: #617183; /* Keep the original button color */
  color: #fff;
  width: 15%;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
`;

const PostWrapper = styled.div`
  width: 50%;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #474d94;
`;

const PostTitle = styled.h2`
  margin: 0 0 10px;
  color: #333;
`;

const PostMessage = styled.p`
  margin: 0 0 10px; /* Add margin to the bottom */
  color: #aca7a7;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px; /* Add margin to the top */
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const EditButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const LikeButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const DislikeButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const Counter = styled.span`
  margin-right: 10px;
`;

const EditForm = ({ onSubmit, onCancel, initialData }) => {
  const [editedData, setEditedData] = useState(initialData);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <FormWrapper>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={editedData.title}
        onChange={handleChange}
      />
      <TextArea
        name="message"
        placeholder="Enter your message..."
        value={editedData.message}
        onChange={handleChange}
      />
      <Button onClick={() => onSubmit(editedData)}>Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </FormWrapper>
  );
};

const Cards = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null); // Track edited data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8090/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async () => {
    const data = { 
      title, 
      message,  
      date: new Date().toISOString(), 
      likes: 0, // Initialize likes to zero
      dislikes: 0 // Initialize dislikes to zero
    };
  
    const response = await fetch('http://localhost:8090/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      console.log('Post successfully added to data.json');
      const responseData = await response.json();
      const updatedData = [...postData, responseData];
      setPostData(updatedData);
      // Clear input fields after successful post
      setTitle('');
      setMessage('');
    } else {
      console.error('Error adding post to data.json:', response.statusText);
    }
  };

  const handleDelete = async (postId) => {
    const response = await fetch(`http://localhost:8090/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Post successfully deleted');
      const updatedData = postData.filter(post => post.id !== postId);
      setPostData(updatedData);
    } else {
      console.error('Error deleting post:', response.statusText);
    }
  };

  const handleEdit = (postData) => {
    setIsEditing(true);
    setEditData(postData);
  };

  const handleEditSubmit = async (editedData) => {
    const response = await fetch(`http://localhost:8090/posts/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });
  
    if (response.ok) {
      console.log('Post successfully edited');
      const updatedPostData = postData.map(post => {
        if (post.id === editedData.id) {
          return editedData;
        }
        return post;
      });
      setPostData(updatedPostData);
      setIsEditing(false);
      setEditData(null);
      // Clear input fields after successful edit
      setTitle('');
      setMessage('');
    } else {
      console.error('Error editing post:', response.statusText);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleLike = async (postId) => {
    const updatedData = postData.map(post => {
      if (post.id === postId) {
        const likes = post.likes || 0;
        return { ...post, likes: Number(likes) + 1 };
      }
      return post;
    });
    setPostData(updatedData);
  };
  
  const handleDislike = async (postId) => {
    const updatedData = postData.map(post => {
      if (post.id === postId) {
        const dislikes = post.dislikes || 0;
        return { ...post, dislikes: Number(dislikes) + 1 };
      }
      return post;
    });
    setPostData(updatedData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormWrapper>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handlePost}>Post</Button>
      {postData.map((post) => (
        <PostWrapper key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostMessage>{post.message}</PostMessage>
          <ButtonGroup>
            <LikeButton onClick={() => handleLike(post.id)}>Like</LikeButton>
            <Counter>{post.likes || 0}</Counter>
            <DislikeButton onClick={() => handleDislike(post.id)}>Dislike</DislikeButton>
            <Counter>{post.dislikes || 0}</Counter>
            <EditButton onClick={() => handleEdit(post)}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(post.id)}>Delete</DeleteButton>
          </ButtonGroup>
        </PostWrapper>
      ))}
      {isEditing && (
        <EditForm
          onSubmit={handleEditSubmit}
          onCancel={handleCancelEdit}
          initialData={editData}
        />
      )}
    </FormWrapper>
  );
};

export default Cards;