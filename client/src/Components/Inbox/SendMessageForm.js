import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SendMessageForm = () => {
  const [inputValue, setInputValue] = useState(null);
  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMessageSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message: inputValue,
        senderId: user.id,
        // conversationId: conversationId,
      }),
    };
  };
  return (
    <Reply>
      <ReplyInput
        placeholder="Write a reply"
        value={inputValue}
        onChange={handleInputChange}
      ></ReplyInput>
      <Button onClick={handleMessageSubmit}>
        <MdSend size={25} />
      </Button>
    </Reply>
  );
};

const Reply = styled.div`
  display: flex;
  margin-top: 20px;
`;
const ReplyInput = styled.input`
  width: 100%;
  height: 4rem;
  border: none;
`;

const Button = styled.button`
  width: 6%;
  color: #20acbb;
  background-color: white;
`;

export default SendMessageForm;
