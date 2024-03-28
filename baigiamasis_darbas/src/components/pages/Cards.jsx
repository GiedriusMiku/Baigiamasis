import React, { useState } from 'react';
import styled from 'styled-components'; // Import Styled Components

// Styled components for form elements
const FormWrapper = styled.div`
  background-color: #c2c3f5c9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Cards = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState([]);

  const handlePost = () => {
    const postData = { title, message, tags };
    console.log('Posting data:', postData);
  };

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
      <Input
        type="text"
        placeholder="Tags "
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(', '))}
      />
      <Button onClick={handlePost}>Post</Button>
    </FormWrapper>
  );
};

export default Cards;