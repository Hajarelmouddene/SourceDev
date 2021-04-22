import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import styled from "styled-components";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../reducers/actions/actions";

const SendMessageForm = () => {
  const [inputValue, setInputValue] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const conversationProfile = useSelector(
    (state) => state.conversationProfile.profile
  );

  console.log(conversationProfile);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    const currentDate = format(new Date(Date.now()), "iii MMM do, yyyy");
    const senderId = user.id;
    const receiverId = conversationProfile._id;
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participants: [senderId, receiverId],
        message: inputValue,
        messageTimeStamp: currentDate,
      }),
    };
    fetch("/conversation/sendMessage", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 201) {
          //do this?
          dispatch(setConversation({ conversation: result.conversation }));
        }
      });
  };

  return (
    <Reply>
      <ReplyInput
        placeholder="Write a reply"
        value={inputValue}
        onChange={handleInputChange}
      ></ReplyInput>
      <Button onClick={handleSendMessage}>
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
