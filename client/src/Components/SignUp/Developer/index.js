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

const SignUpPage = () => {
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
          <RegisterButtons>
            <h1>
              <span style={{ fontSize: "20px" }}>
                Ready to show your portfolio?
              </span>
              <br></br>
              Join our SourceDev community.
            </h1>
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
            <p>
              By clicking continue, you agree to our{" "}
              <Link to="#">Terms of Service</Link> and{" "}
              <Link to="#">Privacy Policy</Link>.
            </p>
            <div>
              Have an account? <Link to="/signin">Log in</Link>
            </div>
          </RegisterButtons>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 3em;
  display: flex;
  justify-content: center;
`;

const RegisterButtons = styled.ul`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #d2d2d26b;
  box-shadow: -1px -1px 6px rgb(112 144 176 / 12%);
  list-style: none;
  justify-content: center;
  align-items: center;
  width: 60%;

  li {
    margin-top: 1em;
  }
`;

const Button = styled.button`
  color: ${(props) => (props.bg === "white" ? "#000" : "#fff")};
  padding: 0.4em 1.8em;
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
const ButtonContent = styled.span``;
export default SignUpPage;
