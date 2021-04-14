import React, { useState } from "react";
import styled from "styled-components";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
//add user is sign in condition to render, otherwise prompot to sign in

const Inbox = () => {
  const user = useSelector((state) => state.user);
  const Messages = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident",
    "sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  console.log(user.id);

  const [inputValue, setInputValue] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConversationSelection = () => {
    setReceiverId("123");
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
    fetch("/sendmessage", requestOptions)
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <InboxWrapper>
      <Conversations>
        <div style={{ padding: "2.33rem 4rem" }}>Messages</div>
        <ConversationChannel>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <MessagesPreview>
            <Name> Hajar El Mouddene</Name>
            <LastMessage>Daily inspiration collected from daily...</LastMessage>
          </MessagesPreview>
          <Date>Jan 7</Date>
        </ConversationChannel>
        <ConversationChannel
          style={{ background: "#f2f7fb" }}
          onClick={handleConversationSelection}
        >
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <MessagesPreview>
            <Name> Hajar El Mouddene</Name>
            <LastMessage>Daily inspiration collected from daily...</LastMessage>
          </MessagesPreview>
          <Date>Jan 7</Date>
        </ConversationChannel>
        <ConversationChannel>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <MessagesPreview>
            <Name> Hajar El Mouddene</Name>
            <LastMessage>Daily inspiration collected from daily...</LastMessage>
          </MessagesPreview>
          <Date>Jan 7</Date>
        </ConversationChannel>
        <ConversationChannel>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <MessagesPreview>
            <Name> Hajar El Mouddene</Name>
            <LastMessage>Daily inspiration collected from daily...</LastMessage>
          </MessagesPreview>
          <Date>Jan 7</Date>
        </ConversationChannel>
        <ConversationChannel>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <MessagesPreview>
            <Name> Hajar El Mouddene</Name>
            <LastMessage>Daily inspiration collected from daily...</LastMessage>
          </MessagesPreview>
          <Date>Jan 7</Date>
        </ConversationChannel>
      </Conversations>
      <ConversationThread>
        <Header>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <div style={{ "margin-left": "1.3rem", "flex-grow": "2" }}>
            Hajar El Mouddene
          </div>
          <div style={{ "font-size": "14px", color: "gray" }}>
            Last Seen 17:46
          </div>
        </Header>
        <Body>
          <Sender>{Messages[0]}</Sender>
          <span
            style={{
              background: "none",
              display: "flex",
              "align-self": "flex-start",
              "margin-left": "1rem",
              "font-size": "13px",
            }}
          >
            11:56
          </span>
          <Receiver>{Messages[1]}</Receiver>
          <span
            style={{
              background: "none",
              display: "flex",
              "align-self": "flex-end",
              "margin-right": "1rem",
              "font-size": "13px",
            }}
          >
            14:56
          </span>

          <Sender>{Messages[2]}</Sender>
          <Sender>{Messages[3]}</Sender>
          <span
            style={{
              background: "none",
              display: "flex",
              "align-self": "flex-start",
              "margin-left": "1rem",
              "font-size": "13px",
            }}
          >
            15:00
          </span>
          <Receiver>{Messages[4]}</Receiver>
          <span
            style={{
              background: "none",
              display: "flex",
              "align-self": "flex-end",
              "margin-right": "1rem",
              "font-size": "13px",
            }}
          >
            15:00
          </span>
        </Body>
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
      </ConversationThread>
    </InboxWrapper>
  );
};

const InboxWrapper = styled.div`
  display: flex;
  margin: 0 0 0 19rem;
  height: 100vh;
`;

const Conversations = styled.div``;

const ConversationChannel = styled.button`
  border-top: 1px solid #f0f3f7;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  text-align: left;
  font-size: inherit;
`;

const ConversationThread = styled.div`
  background: #edf2f7;
  flex-grow: 1;
  border-right: 1px solid #f0f3f7;
  border-left: 1px solid #f0f3f7;
  min-height: 100%;
`;

const Header = styled.div`
  border-top: 1px solid #f0f3f7;
  background-color: #ffffff;
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
`;

const Name = styled.div`
  margin-bottom: 0.5rem;
`;

const MessagesPreview = styled.div`
  margin: 0 1.4rem;
`;

const LastMessage = styled.div`
  color: #abb0b4;
  font-size: 15px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const Date = styled.div`
  color: #a8b6bb;
  font-size: 14px;
  align-self: flex-start;
  margin-top: 0.4rem;
`;

const Sender = styled.div`
  display: flex;
  align-self: flex-start;
  background: #ffffff;
  width: 40%;
  border-radius: 15px;
  padding: 0.7rem 2rem;
  font-size: 14px;
  margin: 0.7rem 1rem;
`;

const Receiver = styled.div`
  display: flex;
  align-self: flex-end;
  background: #0760a5;
  color: white;
  width: 40%;
  border-radius: 15px;
  padding: 0.7rem 2rem;
  font-size: 14px;
  margin: 1rem;
`;
export default Inbox;
