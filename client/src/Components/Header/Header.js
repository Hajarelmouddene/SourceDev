import React from "react";
import Navigation from "./Navigation/Navigation";
import Burger from "./Burger/Burger";
import styled from "styled-components";
import LogoImage from "../../assets/SOURCEDEV.png";

const Header = ({ open, setOpen }) => {
  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <HeaderWrapper>
        <Logo src={LogoImage} />
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

const Logo = styled.img`
  margin-left: 4rem;
  width: 200px;
`;

export default Header;
