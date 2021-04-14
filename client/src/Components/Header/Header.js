import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import Burger from "./Burger/Burger";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Navigation open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
