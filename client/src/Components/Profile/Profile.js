import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getConversation } from "../../reducers/actions/actions";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log(user);
  let { id } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetch(`/developpers/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          setProfile(result.profile);
        } else if (result.status === 404) {
          window.alert("requested profile does not exist");
        }
      });
  }, []);

  const [inputValue, setInputValue] = useState({});
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const currentUserId = user.id;
  console.log(currentUserId);
  const profileId = id;
  console.log(profileId);

  const handleSendMessage = () => {
    const currentDate = Date.now();
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
          dispatch(getConversation({ conversation: result.conversation }));
          history.push("/inbox");
        }
      });
  };
  return profile ? (
    <Wrapper>
      <img src={profile.profilePhoto}></img>
      <div>
        {profile.firstName}
        {profile.lastName}
      </div>
      <div>{profile.bio}</div>
      <textarea
        name="message"
        id="message"
        value={inputValue.message}
        onChange={handleInputChange}
      ></textarea>
      <Button onClick={handleSendMessage}> Message</Button>
    </Wrapper>
  ) : (
    <div>loading</div>
  );
};

const Button = styled.button`
  background-color: black;
  color: white;
  width: fit-content;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 21rem;
  height: 100vh;
  flex-direction: column;
`;
export default Profile;
