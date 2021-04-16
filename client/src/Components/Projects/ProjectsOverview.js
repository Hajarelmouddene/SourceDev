import React, { useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectsOverview = () => {
  const [projects, setProjects] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    fetch(`/projects/${user.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProjects(result.projects);
        } else if (result.status === 404) {
          window.alert("no projects found");
        }
      });
  }, []);
  console.log(projects);

  return (
    <Wrapper>
      <div>
        <div>Projects List</div>
        <ul>
          {projects.map((project) => {
            return (
              <li>
                <div>
                  <Link to={`/projects/${project._id}`}>
                    {project.projectName}
                  </Link>
                </div>
                <div>{project.projectStartDate}</div>
                <ul>
                  {project.assignedDeveloppers.map((assignedDevelopper) => {
                    return <li>{assignedDevelopper}</li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
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
export default ProjectsOverview;
