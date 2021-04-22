import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  setConversation,
  setConversationProfile,
} from "../../reducers/actions/actions";

const ConversationChannel = ({ conversation, profile, lastMessageIndex }) => {
  const dispatch = useDispatch();
  return (
    <ConversationChannelWrapper
      onClick={() => {
        dispatch(setConversation(conversation));
        dispatch(setConversationProfile(profile));
      }}
    >
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
      <MessagesPreview>
        {profile && (
          <Name>
            {profile.firstName} {profile.lastName}
          </Name>
        )}
        <LastMessage>
          {conversation.messages[lastMessageIndex].messageContent}
        </LastMessage>
      </MessagesPreview>
      <Date>{conversation.lastMessageTimestamp}</Date>
    </ConversationChannelWrapper>
  );
};

// ConversationChannel.propTypes = {
//   conversation: PropTypes.Object,
// };

const Name = styled.div`
  margin-bottom: 0.5rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const MessagesPreview = styled.div`
  margin: 0 1.4rem;
`;

const LastMessage = styled.div`
  color: #abb0b4;
  font-size: 15px;
`;

const Date = styled.div`
  color: #a8b6bb;
  font-size: 14px;
  align-self: flex-start;
  margin-top: 0.4rem;
`;

const ConversationChannelWrapper = styled.button`
  border-top: 1px solid #f0f3f7;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  text-align: left;
  font-size: inherit;
  min-width: 35vw;
  font-weight: 400;
  letter-spacing: 0;
`;

export default ConversationChannel;
