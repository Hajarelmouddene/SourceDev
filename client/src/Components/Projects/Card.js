import React, { useState } from "react";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Card = ({ project, setProject, id, title, type }) => {
  const [addTask, setAddTask] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [taskType, setTaskType] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTask = (type) => {
    setAddTask(true);
    setTaskType(type);
  };

  //PLUS SIGN, SET STATE TO THE KEY
  const handleAppendTask = () => {
    //check which key,
    setAddTask(false);
    setInputValue("");

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: project[0]._id,
        taskType,
        [taskType]: inputValue,
      }),
    };
    fetch(`/projects/project/${id}/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProject(result.project);
        } else if (result.status === 404) {
          window.alert("requested project does not exist");
        }
      });
  };

  const handleTaskMenu = () => {
    setShowTaskMenu(true);
  };

  return (
    <CardWrapper>
      <CardTitle>
        <div>{title}</div>
        <button
          onClick={() => {
            handleAddTask(type);
          }}
        >
          <BsPlusCircle />
        </button>
      </CardTitle>

      {addTask ? (
        <AddTask>
          <textarea
            placeholder="Describe task to be added"
            onChange={handleInputChange}
            value={inputValue}
          ></textarea>
          <button onClick={handleAppendTask}>add task</button>
        </AddTask>
      ) : (
        <> </>
      )}
      <>
        {type === "todoTasks" &&
          project[0].todoTasks.map((task, index) => {
            return (
              <Task>
                {project[0].todoTasks[index]}
                <button onClick={handleTaskMenu}>
                  <BiDotsVerticalRounded />
                </button>
              </Task>
            );
          })}
        {type === "inProgressTasks" &&
          project[0].inProgressTasks.map((task, index) => {
            return (
              <Task>
                {project[0].inProgressTasks[index]}
                <button onClick={handleTaskMenu}>
                  <BiDotsVerticalRounded />
                </button>
              </Task>
            );
          })}
        {type === "pendingReviewTasks" &&
          project[0].pendingReviewTasks.map((task, index) => {
            return (
              <Task>
                {project[0].pendingReviewTasks[index]}
                <button onClick={handleTaskMenu}>
                  <BiDotsVerticalRounded />
                </button>
              </Task>
            );
          })}
        {type === "completedTasks" &&
          project[0].completedTasks.map((task, index) => {
            return (
              <Task>
                {project[0].completedTasks[index]}
                <button onClick={handleTaskMenu}>
                  <BiDotsVerticalRounded />
                </button>
              </Task>
            );
          })}
      </>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 2.5rem 1rem;
  border: 1px solid lightgray;
  background: #edf2f7;
  height: 500px;
`;

const CardTitle = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

const Task = styled.div`
  background: white;
  border: 1px solid #edf2f7;
  z-index: 2;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  align-self: center;
`;

const AddTask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem 1rem;
  textarea {
    border: none;
    height: 6rem;
  }
  button {
    background-color: #0760a5;
    color: white;
    width: fit-content;
    align-self: center;
    margin: 1rem 0 2rem;
    padding: 0.2rem 0.6rem;
    border-radius: 5px;
  }
`;

const TaskMenu = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

export default Card;
