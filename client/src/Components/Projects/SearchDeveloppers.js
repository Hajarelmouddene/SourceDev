import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputField from "../Common/InputField";

const TypeAhead = ({ assignedDeveloppers, setAssignedDeveloppers }) => {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [dropDown, setDropDown] = React.useState(false);

  useEffect(() => {
    fetch(`/users/developpers`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProfiles(result.profiles);
        } else if (result.status === 404) {
          window.alert("There are no profiles in our database");
        }
      });
  }, []);

  let results = profiles.filter((profile) => {
    return (
      profile.firstName.toLowerCase().includes(value.toLowerCase()) &&
      value.length >= 2
    );
  });

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setDropDown(true);
  };

  const handleSelect = (suggestion) => {
    if (assignedDeveloppers.includes(suggestion)) {
      window.alert(
        "This developpers has already been assigned to this project"
      );
      setDropDown(false);
    } else {
      setAssignedDeveloppers([...assignedDeveloppers, suggestion]);
      setDropDown(false);
    }
  };

  return (
    <>
      <Wrapper>
        <InputField
          label="Developper firstName"
          id="developper-firstName"
          name="developperFirstName"
          type="text"
          placeholder="Enter a developper's firstName"
          required
          autoComplete="off"
          value={value}
          onChange={(event) => handleInputChange(event)}
        />
      </Wrapper>
      {dropDown && results.length > 0 && (
        <Results>
          {results.map((suggestion) => {
            return (
              <li key={suggestion.id}>
                <SuggestionItem
                  onClick={() => {
                    handleSelect(suggestion);
                  }}
                >
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU"
                    alt="profile avatar"
                  />
                  {suggestion.firstName} {suggestion.lastName}
                </SuggestionItem>
              </li>
            );
          })}
        </Results>
      )}
    </>
  );
};

const Results = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  width: 50%;
  background: white;
  box-shadow: 0px 0px 6px 6px #dedddd;
  padding: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;

const Avatar = styled.img`
  width: 40px;
  margin-right: 1rem;
`;

const SuggestionItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TypeAhead;
