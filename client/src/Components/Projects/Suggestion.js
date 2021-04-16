import React from "react";
import styled from "styled-components";

const Suggestion = ({
  suggestion,
  value,
  handleSelect,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
  index,
  categories,
  //   onClick,
}) => {
  let valueStartIndex = suggestion.toLowerCase().indexOf(value);
  let valueEndIndex = valueStartIndex + value.length;
  let firstHalf = suggestion.slice(0, valueEndIndex);
  let secondHalf = suggestion.slice(valueEndIndex);
  //   console.log(categories);
  let category = categories[suggestion.category].name;
  // categories.suggestion.categoryId.name; => will look for category called suggestion. variables should be in []

  const isSelected = selectedSuggestionIndex === index;

  return (
    <ListItem
      onClick={() => handleSelect(suggestion)}
      //   onClick={onClick}
      //onmouseenter knows the event index (we are map), knows what i am pointing to. setselectedsuggestionindex to what i am pointing to(suggestion index in the array)
      onMouseEnter={() => setSelectedSuggestionIndex(index)}
      style={{
        background: isSelected ? "hsla(50deg, 100%, 80%, 0.25)" : "transparent",
      }}
    >
      <span>
        {firstHalf}
        <Prediction>{secondHalf} </Prediction>
      </span>
      <Category>
        in <span style={{ color: "#c288b4" }}>{category}</span>
      </Category>
    </ListItem>
  );
};

const ListItem = styled.li`
  padding: 0.45em 0;
  line-height: 1.5;
  &:hover {
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Category = styled.span`
  font-style: italic;
`;
export default Suggestion;
