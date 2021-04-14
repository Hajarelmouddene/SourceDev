import styled from "styled-components";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger>
      <HiOutlineMenuAlt4 size={30} onClick={() => setOpen(!open)} />
    </StyledBurger>
  );
};
const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  left: 2rem;
  z-index: 2;

  // keep this?
  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 514px) {
    visibility: hidden;
  }
`;

export default Burger;
