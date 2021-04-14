import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Profile = () => {
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

  const currentUserId = user.id;
  console.log(currentUserId);
  const profileId = id;
  console.log(profileId);

  const handleSendMessage = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId: currentUserId, receiverId: profileId }),
    };
    fetch("/conversation", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
