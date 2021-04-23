import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DeveloppersGrid from "./DeveloppersGrid";
import DeveloppersList from "./DeveloppersList";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { Label } from "../Common/Styles";
import range from "../../Utils/CalculateRangeFunction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ location }) => {
  const user = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(3);

  //current page number
  const [pageNumber, setPageNumber] = useState(1);

  //number of pages determined by number of profiles returned from fetch and items to show per page
  const [numberOfProfiles, setNumberOfProfiles] = useState(null);

  const [locationFlag, setLocationFlag] = useState(false);

  //set radius of 50km from longitude and latitude.
  //check if the person falls inside the radius.
  //find eucledian distance between 2 points.
  //workshop with international space station if distance is greater than 50 km, if the person is inside,
  //the eucledian distance is less than 50 they are in range

  useEffect(() => {
    let queryString;
    if (locationFlag && location) {
      queryString = `/users/developpers/${pageNumber}/${itemsPerPage}?location=${location.city}`;
    } else {
      queryString = `/users/developpers/${pageNumber}/${itemsPerPage}`;
    }
    fetch(queryString)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProfiles(result.profiles);
          setNumberOfProfiles(result.profilesCount);
        } else if (result.status === 404) {
          window.alert("There are no profiles in our database");
        }
      });
  }, [itemsPerPage, pageNumber, locationFlag, location]);

  const handleGridChange = () => {
    setShowGrid(true);
  };
  const handleListChange = () => {
    setShowGrid(false);
  };

  const handleSetItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageSelection = (event) => {
    //event.target.value not working why?
    setPageNumber(event.target.innerText);
  };

  const handleInputChange = (event) => {
    console.log(event.target.checked);

    if (!location) {
      setLocationFlag(false);
    } else {
      setLocationFlag(!locationFlag);
    }
  };

  return (
    <>
      {user.isSignedIn ? (
        <SignedInWrapper>
          <DisplayControls>
            <Label htmlFor="number-of-profiles">Profiles per page</Label>

            <LocationOptin>
              <input
                type="checkbox"
                id="profiles-by-proximity"
                name="Profiles by proximity"
                value="show by proximity"
                checked={locationFlag}
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
              <label htmlFor="profiles-by-proximity">
                Display profiles in my location
              </label>
            </LocationOptin>
            <PageButtons>
              {numberOfProfiles &&
                range(Math.ceil(numberOfProfiles / itemsPerPage)).map(
                  (page) => {
                    return (
                      <li key={page}>
                        <button
                          onClick={(event) => {
                            handlePageSelection(event);
                          }}
                        >
                          {page + 1}
                        </button>
                      </li>
                    );
                  }
                )}
            </PageButtons>
          </DisplayControls>

          <DeveloppersGrid
            profiles={profiles}
            pageNumber={pageNumber}
            limit={itemsPerPage}
          />
        </SignedInWrapper>
      ) : (
        <Wrapper>
          <Hero>
            <HeroLead>
              <Title>
                <Span>STOP</Span> the email madness.{" "}
              </Title>
              <SubTitle>
                <Link to="/hire">
                  <b>JOIN</b> SourceDev
                </Link>
              </SubTitle>
              <Lead>
                Source Dev provides you with access to a large community of
                developpers and project management resources.
              </Lead>
            </HeroLead>
          </Hero>

          <DisplayControls>
            <GridDisplayButtons>
              <Button>
                <BsGrid3X3Gap size={17} onClick={handleGridChange} />
              </Button>
              <Button>
                <FaList size={17} onClick={handleListChange} />
              </Button>
            </GridDisplayButtons>
            <Label htmlFor="number-of-profiles">Profiles per page</Label>
            <Select
              name="number of profiles"
              id="number-of-profiles"
              onChange={handleSetItemsPerPage}
              defaultValue=" Select profiles per page"
            >
              <option value="Select profiles per page" disabled>
                Select profiles per page
              </option>
              <option value="3"> 3</option>
              <option value="6"> 6</option>
              <option value="12"> 12</option>
            </Select>
            <LocationOptin>
              <input
                type="checkbox"
                id="profiles-by-proximity"
                name="Profiles by proximity"
                value="show by proximity"
                checked={locationFlag}
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
              <label htmlFor="profiles-by-proximity">
                Display profiles in my location
              </label>
            </LocationOptin>
            <PageButtons>
              {numberOfProfiles &&
                range(Math.ceil(numberOfProfiles / itemsPerPage)).map(
                  (page) => {
                    return (
                      <li key={page}>
                        <button
                          onClick={(event) => {
                            handlePageSelection(event);
                          }}
                        >
                          {page + 1}
                        </button>
                      </li>
                    );
                  }
                )}
            </PageButtons>
          </DisplayControls>
          {showGrid ? (
            <DeveloppersGrid
              profiles={profiles}
              pageNumber={pageNumber}
              limit={itemsPerPage}
            />
          ) : (
            <DeveloppersList
              profiles={profiles}
              pageNumber={pageNumber}
              limit={itemsPerPage}
            />
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const SignedInWrapper = styled.div`
  /* display: flex; */
  margin: 0 0 0 19rem;
  height: 100vh;
`;

const Span = styled.span`
  color: yellow;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 5rem;
  height: 34rem;
  background: black;
  color: white;

  position: relative;
  background-image: linear-gradient(
    to right,
    hsl(211, 100%, 50%),
    hsl(179, 100%, 30%)
  );
  z-index: 1;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to bottom,
      hsl(344, 100%, 50%),
      hsl(31, 100%, 40%)
    );
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const HeroLead = styled.div`
  text-align: center;
`;

const GridDisplayButtons = styled.ul`
  display: flex;
`;

const Button = styled.button``;

const DisplayControls = styled.div`
  display: flex;
  align-items: flex-end;
  align-items: center;
  margin: 4rem;
`;
const PageButtons = styled.ul`
  display: flex;
  margin-left: auto;
`;

const Select = styled.select`
  width: 100px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 4rem;
`;

const pulse = keyframes`
  0% {
    transform: scale(.9);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px #7ad5ec66;
  }
  100% {
    transform: scale(.9);
    box-shadow: 0 0 0 0 #7ad5ec1c;
  }
`;

const SubTitle = styled.button`
  font-size: 18px;
  border: solid 1px white;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  box-shadow: 0 0 0 0 #7ad5ec66;
  animation: ${pulse} 2s infinite;
  z-index: 5;
  background: black;

  a {
    text-decoration: none;
    color: white;
  }

  &:hover {
    animation: none;
  }
`;

const Lead = styled.p`
  margin-top: 4rem;
`;

const LocationOptin = styled.div`
  margin-left: 17rem;
  background: black;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 15px;
`;

export default Home;
