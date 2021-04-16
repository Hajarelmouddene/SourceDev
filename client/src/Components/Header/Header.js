import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import Burger from "./Burger/Burger";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = ({ open, setOpen }) => {
  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Navigation open={open} setOpen={setOpen} />
    </>
  );
};

const SideHeader = styled.div`
  background: #0760a5;
  height: 100vh;
  width: fit-content;
  margin-top: 0;
`;

export default Header;
