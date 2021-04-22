import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { format } from "date-fns";
import Card from "./Card";

const KanBanBoard = ({ setOpen }) => {
  const [project, setProject] = useState(null);
  const [refetch, setRefetch] = useState(false);

  let { id } = useParams();

  console.log(refetch);
  
  useEffect(() => {
    setOpen(true);
    fetch(`/projects/project/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProject(result.project);
        } else if (result.status === 404) {
          window.alert("requested project does not exist");
        }
      });
  }, [id, refetch]);

  return (
    project && (
      <Wrapper>
        <Header>
          <h1> {project[0].projectName}</h1>
          <div>
            Start Date:{" "}
            {format(new Date(project[0].projectStartDate), "MMM d, yyyy")}
          </div>
          <AssignedDevelopper>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU"
              alt="profile avatar"
            />
            <div>
              {project[0].assignedDeveloppers[0].firstName}{" "}
              {project[0].assignedDeveloppers[0].lastName}
            </div>
          </AssignedDevelopper>
        </Header>
        <div style={{ display: "flex" }}>
          <Card
            project={project}
            setProject={setProject}
            id={id}
            title="To do"
            type={"todoTasks"}
            refetch={refetch}
            setRefetch={setRefetch}
          />
          <Card
            project={project}
            setProject={setProject}
            id={id}
            title="In Progress"
            type="inProgressTasks"
            refetch={refetch}
            setRefetch={setRefetch}
          />
          <Card
            project={project}
            setProject={setProject}
            id={id}
            title="Pending Review"
            type="pendingReviewTasks"
            refetch={refetch}
            setRefetch={setRefetch}
          />
          <Card
            project={project}
            setProject={setProject}
            id={id}
            title="Completed"
            type="completedTasks"
            refetch={refetch}
            setRefetch={setRefetch}
          />
        </div>
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ open }) => (open ? "0 0 0 22rem" : "0 0 0 6rem")};
  /* height: 100vh; */
  width: 90%;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  margin-right: 1rem;
`;

const AssignedDevelopper = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 1rem;
`;
export default KanBanBoard;
