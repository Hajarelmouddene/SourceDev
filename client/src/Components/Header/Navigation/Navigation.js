import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { format } from "date-fns";

const Navigation = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user);

  // useinterval hook  () {
  //   setdate ()
  //   60000
  // }
  const currentDate = format(new Date(Date.now()), "p · iii MMM do, yyyy");

  return (
    <>
      {user.isSignedIn ? (
        <StyledUserMenu open={open}>
          <ProfileInfo>
            {open === false && (
              <NavLink to="/myprofile">
                <FiSettings
                  size={26}
                  style={{
                    color: "#edf2f7bf",
                    "align-self": "flex-end",
                    margin: "1rem 2rem",
                  }}
                />{" "}
              </NavLink>
            )}
            {open && (
              <AiOutlineArrowLeft
                onClick={() => setOpen(false)}
                size={26}
                style={{
                  color: "#edf2f7bf",
                  "align-self": "flex-end",
                  margin: "1rem 2rem",
                }}
              />
            )}
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
            <div
              style={{
                "margin-top": "1rem",
                "font-weight": "600",
                "letter-spacing": "0.04rem",
              }}
            >
              {user.firstName} {user.lastName}
            </div>
            <div
              style={{
                "font-size": "13px",
                color: "lightgray",
                "margin-top": "0.6rem",
              }}
            >
              {currentDate}
            </div>
            <div style={{ "margin-top": "1.7rem" }}>
              <GoPrimitiveDot color="#36fc5b" />
              <Status>
                <option value="available">Available</option>
                <option value="not available">Not available</option>
              </Status>
            </div>
          </ProfileInfo>
          <StyledNavLink
            to="/startproject"
            style={{ color: "white" }}
            // activeStyle={{
            //   background: "black",
            //   "background-size": "2px 2px",
            // }}
          >
            <MdDashboard size={20} style={{ "margin-right": "1rem" }} />
            Start a project
          </StyledNavLink>
          <StyledNavLink
            to="/projects"
            style={{ color: "white" }}
            // activeStyle={{
            //   background: "black",
            //   "background-size": "2px 2px",
            // }}
          >
            <MdDashboard size={20} style={{ "margin-right": "1rem" }} />
            Projects
          </StyledNavLink>
          <StyledNavLink
            to="/inbox"
            style={{ display: "flex", "align-items": "center" }}
          >
            <FaEnvelope size={20} style={{ "margin-right": "1rem" }} />
            Inbox
            <div
              style={{
                background: "#20acbb",
                padding: "0.2rem 0.4rem",
                "border-radius": "15px",
                "align-self": "flex-end",
                "margin-left": "3rem",
                "font-size": "13px",
              }}
            >
              32
            </div>
          </StyledNavLink>
          <StyledNavLink to="/signout">
            <FaSignOutAlt size={20} style={{ "margin-right": "1rem" }} /> Sign
            out
          </StyledNavLink>
        </StyledUserMenu>
      ) : (
        <StyledMenu open={open}>
          <ul>
            <li>
              <StyledNavLink
                exact
                to="/"
                activeStyle={{
                  color: "#0760a5",
                }}
              >
                Home
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="/hire"
                activeStyle={{
                  color: "#0760a5",
                }}
              >
                Hire talent for a project
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="/apply"
                activeStyle={{
                  color: "#0760a5",
                }}
              >
                Apply as a developer
              </StyledNavLink>
            </li>

            <li>
              <StyledNavLink
                to="/signin"
                activeStyle={{
                  color: "#0760a5",
                }}
              >
                Sign in
              </StyledNavLink>
            </li>
          </ul>
        </StyledMenu>
      )}
    </>
  );
};

const StyledMenu = styled.nav`
  background: #fff;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  ul {
    margin-top: calc(5% + 5rem);
    list-style: none;
    margin-left: 5rem;

    li {
      margin: 2rem 0;
    }
  }

  @media only screen and (min-width: 515px) {
    background: none;
    height: inherit;
    position: static;
    width: 60%;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 0;
    }
    transform: none;
    transition: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #000000;
  font-weight: 700;

  &:hover {
    color: #0760a5;
  }
`;

const StyledUserMenu = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #0760a5;
  width: fit-content;
  margin-top: 0;
  height: 100vh;
  position: absolute;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(-75%)" : "translateX(0)")};
  a {
    color: white;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    padding: 0 5rem;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #045997;
  padding: 1.5rem 0 4rem;
`;

const Status = styled.select`
  background: none;
  border: none;
  color: #36fc5b;
  font-size: 15px;
  margin-left: 0.4rem;
`;

export default Navigation;
