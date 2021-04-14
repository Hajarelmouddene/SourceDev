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
} from "./DeveloppersGrid";

const DeveloppersList = ({ profiles }) => {
  return (
    <Developpers>
      {profiles.map((developper, index) => {
        return (
          <li key={index}>
            <Developper role="StyledLink">
              <AvatarWrapper>
                <img src={developper.avaratSrc} alt="profile avatar" />
                <StyledLink>View Profile</StyledLink>
              </AvatarWrapper>
              <Description>
                <NameWrapper>
                  <Name>
                    {developper.name} <Title> | {developper.type}</Title>
                  </Name>
                </NameWrapper>
                <Location>
                  <FaMapMarkerAlt color={"#1facbb"} size={16} />
                  <City>
                    Vancouver, BC
                    <span> • Member since June 19 2020</span>
                  </City>
                </Location>
                <p>{developper.bio}</p>
                <Link to="/">Read more</Link>
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

const Developper = styled.div`
  border: #d3d3d361 1px solid;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 5rem;
  padding: 2rem;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.5rem;

  p {
    text-align: left;
  }
  a {
    margin-bottom: 2rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default DeveloppersList;
