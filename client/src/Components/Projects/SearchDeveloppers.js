import React, { useState } from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Typeahead = () => {
  const suggestions = ["hajar"];
  const handleSelect = (suggestion) => {
    window.alert(suggestion);
  };
  const categories = ["react", "javascript"];
  const [value, setValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );
  const [dropDown, setDropDown] = React.useState(false);

  let results = suggestions.filter((book) => {
    return (
      book.toLowerCase().includes(value.toLowerCase()) && value.length >= 2
    );
  });

  //     We want to make it so that mousing over a list item causes it to be selected, replicating the hover state. Use an onMouseEnter event to set the React state.

  // Items should now be selectable both with a mouse as well as with a keyboard.

  //   let emptyArr = true;
  //   if (results.length !== 0) {
  //     emptyArr = false;
  //     return emptyArr;
  //   }
  //   console.log(categories.comedy);

  return (
    <Wrapper>
      {/* form for backend  */}
      <Form>
        <Input
          type="text"
          placeholder="Enter developper name"
          value={value}
          //keydown = press enter for final word
          //onchange, suggestions update every letter I type a letter / press a key

          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Enter": {
                if (
                  selectedSuggestionIndex !== 0 &&
                  (value !== "" || results.length !== 0)
                ) {
                  handleSelect(results[selectedSuggestionIndex].title);
                }
                return;
              }
              case "ArrowUp": {
                if (
                  selectedSuggestionIndex !== 0 &&
                  (value !== "" || results.length !== 0)
                ) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                }
                return;
              }
              case "ArrowDown": {
                if (
                  selectedSuggestionIndex !== results.length - 1 &&
                  (value !== "" || results.length !== 0)
                ) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                }
                return;
              }

              case "Escape": {
                setDropDown(true);
                return;
              }
            }
          }}
        ></Input>
        <Button
          id="clear-btn"
          value="clear"
          onClick={() => {
            setValue("");
          }}
        >
          Clear
        </Button>
      </Form>
      <div>
        {!dropDown && results.length > 0 && (
          <Results>
            {results.map((suggestion, index) => {
              // const isSelected = () => {
              //   //   selectedSuggestionIndex = suggestion.id;
              //   //   setSelectedSuggestionIndex(selectedSuggestionIndex);
              //   console.log("hola");
              // };

              return (
                <>
                  <Suggestion
                    key={suggestion.id}
                    value={value}
                    suggestion={suggestion}
                    handleSelect={handleSelect}
                    selectedSuggestionIndex={selectedSuggestionIndex}
                    setSelectedSuggestionIndex={setSelectedSuggestionIndex}
                    index={index}
                    categories={categories}
                    //   onClick={() => handleSelect(suggestion.title)}
                  />
                </>
              );
            })}
          </Results>
        )}
      </div>
    </Wrapper>
  );
};

const Results = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  width: 50%;
  box-shadow: 0px 0px 6px 6px #dedddd;
  padding: 1em;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  height: 40px;
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  border-radius: 3px;
  height: 100%;
  padding: 0 2em;
  margin-left: 0.8em;
`;

const Input = styled.input`
  border: 1px solid lightgray;
  height: 100%;
  width: 300px;
  border-radius: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;
`;
export default Typeahead;
