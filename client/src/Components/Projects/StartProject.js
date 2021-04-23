import React, { useState } from "react";
import InputField from "../Common/InputField";
import { useSelector } from "react-redux";
import SearchDeveloppers from "./SearchDeveloppers";
import { Form, SidePageWrapper, Button } from "../Common/Styles";
import { useHistory } from "react-router-dom";
import { PageWrapper } from "../Common/Styles";

const StartProject = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [assignedDeveloppers, setAssignedDeveloppers] = useState([]);
  const [inputValue, setInputValue] = useState({});

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
    if (event.target.name === "addTask") {
      setInputValue({ ...inputValue, task: value });
    }
  };

  const getUTCDate = () => {
    const date = new Date(inputValue.projectStartDate);
    console.log(date);
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  };

  const formattedDate = getUTCDate();

  console.log(getUTCDate());
  const handleProjectSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName: inputValue.projectName,
        projectStartDate: formattedDate,
        todoTasks: inputValue.task,
        assignedDeveloppers: assignedDeveloppers,
        employerId: user.id,
      }),
    };

    fetch("/projects/addproject", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          history.push(`/projects/${result.project._id}`);
        } else if (result.status === 400) {
          window.alert("project not submitted successfully");
        }
      });
  };
  return (
    <>
      {user.isSignedIn ? (
        <SidePageWrapper>
          <h1>Start a project</h1>
          <Form>
            <InputField
              label="Project name"
              id="project-name"
              name="projectName"
              type="text"
              placeholder="Choose a name for your project"
              required
              autocomplete="off"
              value={inputValue.name}
              onChange={handleInputChange}
            />
            <SearchDeveloppers
              assignedDeveloppers={assignedDeveloppers}
              setAssignedDeveloppers={setAssignedDeveloppers}
            />
            <InputField
              label="Project start date"
              id="project-start-date"
              name="projectStartDate"
              type="date"
              placeholder="Project start date"
              required
              autocomplete="off"
              min="2021-04-08"
              value={inputValue.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Add task"
              id="add-task"
              name="addTask"
              type="text"
              placeholder="Add a user story"
              // required
              // autoComplete="url"
              value={inputValue.name}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              onClick={(event) => {
                handleProjectSubmit(event);
              }}
            >
              Submit
            </Button>
          </Form>
        </SidePageWrapper>
      ) : (
        <PageWrapper>Please sign in to start a project</PageWrapper>
      )}
    </>
  );
};

export default StartProject;
