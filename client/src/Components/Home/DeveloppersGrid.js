import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  Skill,
  SkillsTags,
  Name,
  Title,
  Location,
  City,
  StyledLink,
  Divider,
} from "../Common/Styles";

const DeveloppersGrid = ({ profiles, pageNumber, limit }) => {
  // useEffect(() => {
  //   fetch(`users/${pageNumber}/${limit}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.status === 200) {
  //         profiles = result.profiles;
  //       } else {
  //         window.alert("there are no users in db");
  //       }
  //     });
  // }, []);
  return (
    <Developpers>
      {profiles.map((developper) => {
        return (
          <li key={developper._id}>
            <Developper role="button">
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
              <Name>
                {developper.firstName} {developper.lastName}
              </Name>
              <Title>{developper.title}</Title>
              <Location>
                <FaMapMarkerAlt color={"#1facbb"} size={16} />
                <City>
                  {developper.city}, {developper.province}
                </City>
              </Location>
              <Divider />
              <SkillsTags>
                {developper.programmingLanguages.map((language, index) => {
                  return <Skill key={index}>{language}</Skill>;
                })}
                {developper.frameworks.map((framework, index) => {
                  return <Skill key={index}>{framework}</Skill>;
                })}
              </SkillsTags>
              <StyledLink to={`/profile/${developper._id}`}>
                View Profile
              </StyledLink>
            </Developper>
          </li>
        );
      })}
    </Developpers>
  );
};
const Developpers = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  @media only screen and (min-width: 515px) {
    flex-flow: row wrap;
    justify-content: center;
    flex-basis: 300px;
  }
`;
const Developper = styled.div`
  border: #d3d3d361 1px solid;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding-bottom: 2rem;
  width: 280px;
  margin-bottom: 100px;
`;

const Avatar = styled.img`
  margin-bottom: 1rem;
  margin-top: -100px;
`;

export default DeveloppersGrid;
