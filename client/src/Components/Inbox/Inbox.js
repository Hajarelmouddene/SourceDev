import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "../../reducers/actions/actions";

import ConversationThread from "./ConversationThread";
import ConversationChannel from "./ConversationChannel";
import { PageWrapper } from "../Common/Styles";

//add user is sign in condition to render, otherwise prompt to sign in

const Inbox = () => {
  const user = useSelector((state) => state.user);
  const conversation = useSelector((state) => state.conversation.conversation);
  const conversations = useSelector(
    (state) => state.conversation.conversations
  );

  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();

  const getAllData = async () => {
    if (user.isSignedIn) {
      const data = await fetch(`/conversation/getAll/${user.id}`).then((res) =>
        res.json()
      );
      if (data.status === 200) {
        const userIds = data.conversations
          .map((conversation) => {
            return conversation.participants.filter(
              (participant) => participant !== user.id
            );
          })
          .flat();
        let queryString = "";
        userIds.forEach((userid, index) => {
          if (index < userIds.length - 1) {
            queryString += `id=${userid}&`;
          } else {
            queryString += `id=${userid}`;
          }
        });
        const users = await fetch(`/users/search?${queryString}`).then((res) =>
          res.json()
        );
        if (users.status === 200) {
          setProfiles(users.profiles);
        } else if (users.status === 404) {
          window.alert("requested profiles do not exist");
        }
      } else if (data.status === 404) {
        window.alert("No conversations were found in your inbox");
      }
      dispatch(setConversations(data.conversations));
    } else return;
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      {user.isSignedIn ? (
        <InboxWrapper>
          <div>
            {conversations &&
              conversations.map((item) => {
                const profile = profiles.find(
                  (profile) =>
                    profile._id === item.participants[1] ||
                    profile._id === item.participants[0]
                );
                const lastMessageIndex = item.messages.length - 1;
                return (
                  <ConversationChannel
                    conversation={item}
                    profile={profile}
                    lastMessageIndex={lastMessageIndex}
                  />
                );
              })}
          </div>
          <ConversationThread conversation={conversation} />
        </InboxWrapper>
      ) : (
        <PageWrapper>Please sign in to access your inbox</PageWrapper>
      )}
    </>
  );
};

const InboxWrapper = styled.div`
  display: flex;
  margin: 0 0 0 19rem;
  height: 100vh;
`;

export default Inbox;
