import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  handleInputChange,
  inputValue,
  setShowTaskModal,
  project,
  task,
  index,
  type,
  setProject,
  refetch,
  setRefetch,
}) => {
  console.log(type);
  const id = project[0]._id;

  const handleEditTask = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,
        type,
        taskId: index,
        [type]: inputValue,
        previousTaskContent: task,
      }),
    };
    fetch(`/projects/project/${id}/updateTask`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProject(result.project);
        } else if (result.status === 404) {
          window.alert("requested project does not exist");
        }
      });
  };

  return (
    <Wrapper>
      <CloseButton
        onClick={() => {
          setShowTaskModal(false);
          setRefetch(!refetch);
        }}
      >
        <AiOutlineClose size={30} />
      </CloseButton>
      <textarea
        placeholder="Describe task to be added"
        onChange={handleInputChange}
        value={inputValue}
      ></textarea>
      <button onClick={handleEditTask}>Edit task</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  height: 78vh;
  width: 90vw;
  position: absolute;
  z-index: 3;
`;
const CloseButton = styled.button`
  align-self: flex-end;
  margin-right: 7rem;
  margin-top: 4rem;
`;
export default Modal;
