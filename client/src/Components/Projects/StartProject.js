import React, { useState } from "react";
import InputField from "../Common/InputField";
import { useSelector } from "react-redux";
import SearchDeveloppers from "./SearchDeveloppers";
import styled from "styled-components";

const StartProject = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [inputValue, setInputValue] = useState({
    tasks: [],
    assignedDeveloppers: [],
  });
  const [profilePhoto, setProfilePhoto] = useState({});

  const developpersArray = ["Hajar", "Lola"];
  const handleInputChange = (event) => {
    console.log(event.target.type);
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
    if (event.target.name === "addTask") {
      setInputValue({ ...inputValue, tasks: [value] });
    }
    if (event.target.type === "checkbox") {
      if (developpersArray.includes(event.target.name)) {
        if (inputValue.assignedDeveloppers.includes(event.target.name)) {
          //slice it // findindex
          let foundIndex = inputValue.assignedDeveloppers.findIndex(
            (developper) => developper === event.target.name
          );
          return inputValue.assignedDeveloppers.splice(foundIndex);

          //use slice with findindex
        } else {
          setInputValue({
            ...inputValue,
            assignedDeveloppers: [...inputValue.assignedDeveloppers, name],
          });
        }
      }
    }
  };

  const handleProjectSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName: inputValue.projectName,
        projectStartDate: inputValue.projectStartDate,
        tasks: inputValue.tasks,
        assignedDeveloppers: inputValue.assignedDeveloppers,
        employerId: user.id,
      }),
    };

    fetch("/projects/addproject", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
        } else if (result.status === 400) {
          window.alert("project not submitted successfully");
        }
      });
  };
  return (
    <Wrapper>
      <form>
        <InputField
          label="Project name"
          id="project-name"
          name="projectName"
          type="text"
          placeholder="Project name"
          required
          // autoComplete="url"
          value={inputValue.name}
          onChange={handleInputChange}
        />
        <InputField
          label="Project start date"
          id="project-start-date"
          name="projectStartDate"
          type="date"
          placeholder="Project start date"
          required
          autoComplete="url"
          min="2021-04-08"
          value={inputValue.name}
          onChange={handleInputChange}
        />
        <InputField
          label="Add task"
          id="add-task"
          name="addTask"
          type="text"
          placeholder="add task"
          // required
          // autoComplete="url"
          value={inputValue.name}
          onChange={handleInputChange}
        />
        <SearchDeveloppers />
        <div>assign project</div>
        <input
          type="checkbox"
          id="hajar"
          name="Hajar"
          checked={inputValue.assignedDeveloppers.includes("Hajar")}
          onChange={handleInputChange}
        />
        <label for="hajar">Hajar</label>
        <input
          type="checkbox"
          id="lola"
          name="Lola"
          checked={inputValue.assignedDeveloppers.includes("Lola")}
          onChange={handleInputChange}
        />
        <label for="lola">Lola</label>
        <button type="submit" onClick={handleProjectSubmit}>
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem 0 22rem;
  height: 100vh;
`;
export default StartProject;
