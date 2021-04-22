import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Skill,
  SkillsTags,
  Name,
  Title,
  Location,
  City,
  StyledLink,
} from "../Common/Styles";

import {
  Developper,
  AvatarWrapper,
  Description,
  NameWrapper,
} from "../../Components/Common/Styles";

const DeveloppersList = ({ profiles }) => {
  return (
    <Developpers>
      {profiles.map((developper) => {
        return (
          <li key={developper._id}>
            <Developper role="StyledLink">
              <AvatarWrapper>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU"
                  alt="profile avatar"
                />
                <StyledLink to={`/profile/${developper._id}`}>
                  View Profile
                </StyledLink>
              </AvatarWrapper>
              <Description>
                <NameWrapper>
                  <Name>
                    {developper.firstName} {developper.lastName}{" "}
                    <Title> | {developper.title}</Title>
                  </Name>
                </NameWrapper>
                <Location>
                  <FaMapMarkerAlt color={"#1facbb"} size={16} />
                  <City>
                    {developper.city}, {developper.province}
                    <span> • Member since {developper.dateAccountCreated}</span>
                  </City>
                </Location>
                <p>{developper.bio}</p>
                <Link to={`/profile/${developper._id}`}>Read more</Link>
                <SkillsTags>
                  {developper.programmingLanguages.map((language, index) => {
                    return <Skill key={index}>{language}</Skill>;
                  })}
                  {developper.frameworks.map((framework, index) => {
                    return <Skill key={index}>{framework}</Skill>;
                  })}
                </SkillsTags>
              </Description>
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
  width: 100%;
`;

export default DeveloppersList;
