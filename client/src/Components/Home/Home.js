import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeveloppersGrid from "./DeveloppersGrid";
import DeveloppersList from "./DeveloppersList";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaList } from "react-icons/fa";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  console.log(profiles);

  useEffect(() => {
    fetch("/developpers")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setProfiles(result.profiles);
        } else if (result.status === 404) {
          window.alert("there are no profiles in our database");
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
  return (
    <Wrapper>
      <DisplayControls>
        <GridDisplayButtons>
          <Button>
            <BsGrid3X3Gap size={17} onClick={handleGridChange} />
          </Button>
          <Button>
            <FaList size={17} onClick={handleListChange} />
          </Button>
        </GridDisplayButtons>
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
