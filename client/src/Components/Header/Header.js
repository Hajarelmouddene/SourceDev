import React from "react";
import Navigation from "./Navigation/Navigation";
import Burger from "./Burger/Burger";
import styled from "styled-components";
import LogoImage from "../../assets/SOURCEDEV.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <HeaderWrapper>
        {user.isSignedIn ? (
          <> </>
        ) : (
          <Link to="/">
            {" "}
            <CenteredLogo src={LogoImage} />{" "}
          </Link>
        )}
        <Navigation open={open} setOpen={setOpen} />
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 100%;
`;

const CenteredLogo = styled.img`
  margin-left: 4rem;
  width: 200px;
`;

export default Header;
