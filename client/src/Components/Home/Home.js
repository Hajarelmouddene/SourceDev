import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeveloppersGrid from "./DeveloppersGrid";
import DeveloppersList from "./DeveloppersList";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaList } from "react-icons/fa";

const Home = ({ location }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("/users/developpers")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProfiles(result.profiles);
        } else if (result.status === 404) {
          window.alert("There are no profiles in our database");
        }
      });
  }, []);

  const [showGrid, setShowGrid] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);

  const handleGridChange = () => {
    setShowGrid(true);
  };
  const handleListChange = () => {
    setShowGrid(false);
  };

  const handleSetItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    console.log(itemsPerPage);
  };

  const handleInputChange = () => {
    if (profiles && location) {
      profiles.filter((profile) => profile.city === location.city);
    }
    console.log(profiles);
  };

  return (
    <Wrapper>
      <Hero>
        <HeroLead>
          <h1>Stop the email madness. Join Source DEV today.</h1>
          <p>
            Source Dev provides you with access to a large community of
            developpers and project management resources.
          </p>
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
        <label htmlFor="profiles-by-proximity">
          Show me Devs that are in proximity
        </label>
        <input
          type="checkbox"
          id="profiles-by-proximity"
          name="Profiles by proximity"
          value="show by proximity"
          onChange={(event) => {
            handleInputChange(event);
          }}
        />
        <label htmlFor="number-of-profiles">Profiles per page</label>
        <select
          name="number of profiles"
          id="number-of-profiles"
          onChange={handleSetItemsPerPage}
        >
          <option value="20"> 20</option>
          <option value="50"> 50</option>
          <option value="100"> 100</option>
        </select>
        <PageButtons>
          <button
            onClick={() => {
              setPageNumber(2);
            }}
          >
            {" "}
            «{" "}
          </button>
          <button> 1 </button>
          <button>...</button>
          <button> 7 </button>
          <button>8</button>
          <button>9</button>
          <button>...</button>
          <button>16</button>
          <button>»</button>
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
  );
};

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  height: 34rem;
`;

const HeroLead = styled.div`
  text-align: center;
`;

const GridDisplayButtons = styled.div`
  display: flex;
`;

const Button = styled.button``;

const DisplayControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const PageButtons = styled.div`
  display: flex;
`;

export default Home;
