import React from "react";
import SendMessageForm from "./SendMessageForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ConversationThread = ({ conversation }) => {
  const user = useSelector((state) => state.user);
  const conversationProfile = useSelector(
    (state) => state.conversationProfile.profile
  );
  console.log(conversationProfile);
  return (
    <ConversationThreadWrapper>
      {conversationProfile && (
        <Header>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
          <div style={{ marginLeft: "1.3rem", flexGrow: "2" }}>
            {conversationProfile.firstName} {conversationProfile.lastName}
          </div>
          <div style={{ fontSize: "14px", color: "gray" }}>Last Seen 17:46</div>
        </Header>
      )}
      {conversation && conversation.messages && (
        <Body>
          {conversation.messages.map((message) => {
            return message.senderId === user.id ? (
              <Receiver>{message.messageContent}</Receiver>
            ) : (
              <Sender>{message.messageContent}</Sender>
            );
          })}
        </Body>
      )}
      <ReplyInput>
        <SendMessageForm />{" "}
      </ReplyInput>
    </ConversationThreadWrapper>
  );
};

const ConversationThreadWrapper = styled.div`
  background: #edf2f7;
  flex-grow: 1;
  border-right: 1px solid #f0f3f7;
  border-left: 1px solid #f0f3f7;
  min-height: 100%;
`;

const ReplyInput = styled.div`
  position: absolute;
  bottom: 0;
  min-width: 43.5%;
`;

const Header = styled.div`
  border-top: 1px solid #f0f3f7;
  background-color: #ffffff;
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
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

export default ConversationThread;
