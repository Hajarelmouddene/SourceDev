import styled from "styled-components";
import { Link } from "react-router-dom";

export const Label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const SidePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem 0 22rem;
  padding-top: 3rem;
  height: 92vh;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.4;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  height: calc(100vh - 88px - 64px);
`;

export const Developper = styled.div`
  border: #d3d3d361 1px solid;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 5rem;
  padding: 2rem;
`;

export const Description = styled.div`
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

export const NameWrapper = styled.div`
  display: flex;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Skill = styled.div`
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
  padding: 0.7rem 2rem;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  text-decoration: none;
  text-align: center;
`;

export const Divider = styled.hr`
  border: 1px solid #e6e6e6;
  width: 80%;
  margin-bottom: 28px;
`;
