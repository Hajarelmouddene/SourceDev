import React, { useState } from "react";
import EmailForm from "./EmailForm";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillApple,
  AiOutlineTwitter,
  AiOutlineMail,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUpPageEmployer = () => {
  const [displayEmailForm, setDisplayEmailForm] = useState(false);
  const handleClick = () => {
    setDisplayEmailForm(true);
  };
  return (
    <>
      {displayEmailForm ? (
        <EmailForm />
      ) : (
        <Wrapper>
          <h1>
            Ready to hire for your next project? Join our SourceDev community.
          </h1>
          <RegisterButtons>
            <li>
              <Button bg="black">
                <ButtonPrefix>
                  <AiFillGithub size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Github</ButtonContent>
              </Button>
            </li>
            <li>
              <Button bg="white">
                <ButtonPrefix>
                  <FcGoogle size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Google</ButtonContent>
              </Button>
            </li>
            <li>
              <Button bg="darkblue">
                <ButtonPrefix>
                  <AiFillFacebook size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Facebook</ButtonContent>
              </Button>
            </li>
            <li>
              <Button bg="white">
                <ButtonPrefix>
                  <AiFillApple size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Apple</ButtonContent>
              </Button>
            </li>
            <li>
              <Button bg="lightblue">
                <ButtonPrefix>
                  <AiOutlineTwitter size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Twitter</ButtonContent>
              </Button>
            </li>
            <li>
              <Button bg="white" onClick={handleClick}>
                <ButtonPrefix>
                  <AiOutlineMail size={30} />
                </ButtonPrefix>
                <ButtonContent>Continue with Email</ButtonContent>
              </Button>
            </li>
            <TermsOfServiceWrapper>
              <p>
                By clicking continue, you agree to our{" "}
                <Link to="#">Terms of Service</Link> and{" "}
                <Link to="#">Privacy Policy</Link>.
              </p>
              Have an account? <Link to="/signin">Log in</Link>
            </TermsOfServiceWrapper>
          </RegisterButtons>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 3.5em 0;
  text-align: center;
`;

const RegisterButtons = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  li {
    margin-top: 1em;
  }
`;

const TermsOfServiceWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const Button = styled.button`
  color: ${(props) => (props.bg === "white" ? "#000" : "#fff")};
  padding: 0.4em 1.8em;
  min-width: fit-content;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.bg === "black"
      ? "#242a2f"
      : props.bg === "white"
      ? "#ffffff"
      : props.bg === "lightblue"
      ? "#1ea2f1"
      : "#385094"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 0.2em;
  letter-spacing: 0.1em;
  box-shadow: 4px 4px 9px rgb(112 144 176 / 12%);
  border: 1px solid #d2d2d2;
`;

const ButtonPrefix = styled.span`
  margin-right: 1em;
`;
const ButtonContent = styled.span`
  width: 15rem;
`;
export default SignUpPageEmployer;
