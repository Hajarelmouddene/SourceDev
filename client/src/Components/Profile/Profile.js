import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setConversation } from "../../reducers/actions/actions";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";

import {
  Button,
  PageWrapper,
  Developper,
  AvatarWrapper,
  Description,
  NameWrapper,
  Skill,
  SkillsTags,
  Name,
  Title,
  Location,
  City,
} from "../../Components/Common/Styles";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const [disabled, setDisabled] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetch(`/users/developpers/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProfile(result.profile);
        } else if (result.status === 404) {
          window.alert("requested profile does not exist");
        }
      });
  }, [id]);

  const [inputValue, setInputValue] = useState({});
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const currentUserId = user.id;
  const profileId = id;

  console.log(profileId);
  const handleSendMessage = () => {
    console.log(user);
    if (user.isSignedIn) {
      setDisabled(false);

      const currentDate = format(new Date(Date.now()), "iii MMM do, yyyy");

      const senderId = currentUserId;
      const receiverId = profileId;

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: [senderId, receiverId],
          message: inputValue.message,
          messageTimeStamp: currentDate,
        }),
      };
      fetch("/conversation/sendMessage", requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 201) {
            dispatch(setConversation({ conversation: result.conversation }));
            history.push("/inbox");
          }
        });
    } else {
      setDisabled(true);
      window.alert("Please sign in to send a message.");
      history.push("/signin");
    }
  };

  return profile ? (
    user.isSignedIn ? (
      <SignedInWrapper>
        <Developper role="StyledLink">
          <AvatarWrapper>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU"
              alt="profile avatar"
            />
          </AvatarWrapper>
          <Description>
            <NameWrapper>
              <Name>
                {profile.firstName} {profile.lastName}{" "}
                <Title> | {profile.title}</Title>
              </Name>
            </NameWrapper>
            <Location>
              <FaMapMarkerAlt color={"#1facbb"} size={16} />
              <City>
                {profile.city}, {profile.province}
                <span> • Member since {profile.dateAccountCreated}</span>
              </City>
            </Location>
            <p>{profile.bio}</p>
            <SkillsTags style={{ marginTop: "2rem" }}>
              {profile.programmingLanguages.map((language, index) => {
                return <Skill key={index}>{language}</Skill>;
              })}
              {profile.frameworks.map((framework, index) => {
                return <Skill key={index}>{framework}</Skill>;
              })}
            </SkillsTags>
          </Description>
        </Developper>

        <MessageWrapper>
          <textarea
            style={{ width: "85%" }}
            name="message"
            id="message"
            placeholder="write your message"
            value={inputValue.message}
            onChange={handleInputChange}
          ></textarea>
          <Button onClick={handleSendMessage} disabled={disabled}>
            Message
          </Button>
        </MessageWrapper>
      </SignedInWrapper>
    ) : (
      <PageWrapper>
        <Developper role="StyledLink">
          <AvatarWrapper>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU"
              alt="profile avatar"
            />
          </AvatarWrapper>
          <Description>
            <NameWrapper>
              <Name>
                {profile.firstName} {profile.lastName}{" "}
                <Title> | {profile.title}</Title>
              </Name>
            </NameWrapper>
            <Location>
              <FaMapMarkerAlt color={"#1facbb"} size={16} />
              <City>
                {profile.city}, {profile.province}
                <span> • Member since {profile.dateAccountCreated}</span>
              </City>
            </Location>
            <p>{profile.bio}</p>
            <SkillsTags style={{ marginTop: "2rem" }}>
              {profile.programmingLanguages.map((language, index) => {
                return <Skill key={index}>{language}</Skill>;
              })}
              {profile.frameworks.map((framework, index) => {
                return <Skill key={index}>{framework}</Skill>;
              })}
            </SkillsTags>
          </Description>
        </Developper>

        <MessageWrapper>
          <textarea
            style={{ width: "85%" }}
            name="message"
            id="message"
            placeholder="write your message"
            value={inputValue.message}
            onChange={handleInputChange}
          ></textarea>
          <Button onClick={handleSendMessage} disabled={disabled}>
            Message
          </Button>
        </MessageWrapper>
      </PageWrapper>
    )
  ) : (
    <PageWrapper>loading</PageWrapper>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  width: 100%;
`;

const SignedInWrapper = styled.div`
  /* display: flex; */
  margin: 0 0 0 19rem;
  height: 100vh;
`;
export default Profile;
