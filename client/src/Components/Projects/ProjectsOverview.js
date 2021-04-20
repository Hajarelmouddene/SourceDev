import React, { useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { AiTwotoneCalendar } from "react-icons/ai";
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
        <h1 style={{ marginLeft: "1.5rem" }}>Projects Overview</h1>
        <Projects>
          {projects.map((project) => {
            const date = project.projectStartDate;
            const formattedDate = format(new Date(date), "MMM d, yyyy");
            return (
              <ProjectListItemWrapper>
                <ListPrefix> </ListPrefix>
                <ProjectListItem>
                  <DateWrapper>
                    <AiTwotoneCalendar size={20} style={{ color: "#20acbb" }} />
                    <FormattedDate>{formattedDate}</FormattedDate>
                  </DateWrapper>
                  <div>
                    <StyledLink to={`/projects/${project._id}`}>
                      {project.projectName}
                    </StyledLink>
                  </div>
                  <AssignedDeveloppersList>
                    {project.assignedDeveloppers.map((assignedDevelopper) => {
                      return (
                        <li>
                          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
                        </li>
                      );
                    })}
                  </AssignedDeveloppersList>
                </ProjectListItem>
              </ProjectListItemWrapper>
            );
          })}
        </Projects>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 2rem 0 22rem;
  padding-top: 3rem;
`;

const Projects = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProjectListItemWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  width: 45%;
`;

const ProjectListItem = styled.li`
  background-color: #edf2f7;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ListPrefix = styled.div`
  background-color: #0760a5;
  width: 0.8rem;
  height: 7.5rem;
`;

const DateWrapper = styled.div`
  align-items: center;
  color: #20acbb;
  display: flex;
`;

const FormattedDate = styled.div`
  margin-left: 1rem;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0760a5;

  &:hover {
    color: #20acbb;
  }
`;

const AssignedDeveloppersList = styled.ul`
  list-style: none;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export default ProjectsOverview;
