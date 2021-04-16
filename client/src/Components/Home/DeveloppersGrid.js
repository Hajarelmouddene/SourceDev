import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      {profiles.map((developper, index) => {
        return (
          <li key={index}>
            <Developper role="button">
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
              <Name>
                {developper.firstName} {developper.lastName}
              </Name>
              <Title>{developper.title}</Title>
              <Location>
                <FaMapMarkerAlt color={"#1facbb"} size={16} />
                <City>Vancouver, BC</City>
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

export const Skill = styled.div`
  /* border: 1px solid lightgray; */
  background-color: #edf2f7;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  margin: 0.3rem;
  font-size: 14px;
`;

export const SkillsTags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Avatar = styled.img`
  margin-bottom: 1rem;
  margin-top: -100px;
`;

export const Name = styled.div`
  margin-bottom: 0.6rem;
  font-size: 17px;
  color: #5188b7;
  font-weight: 500;
`;

export const Title = styled.span`
  margin-bottom: 1rem;
  font-weight: 300;
`;

export const Location = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  color: gray;
  font-weight: 300;
  font-size: 14px;
`;

export const City = styled.div`
  margin-left: 0.5rem;
`;

export const StyledLink = styled(Link)`
  background-color: #5188b7;
  color: white;
  padding: 0.7rem 2rem;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 2rem;
`;

const Divider = styled.hr`
  border: 1px solid #e6e6e6;
  width: 80%;
  margin-bottom: 28px;
`;
export default DeveloppersGrid;
