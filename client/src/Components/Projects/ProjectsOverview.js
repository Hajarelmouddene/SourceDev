import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { AiTwotoneCalendar } from "react-icons/ai";
import { SidePageWrapper, Label } from "../Common/Styles";
import range from "../../Utils/CalculateRangeFunction";

const ProjectsOverview = () => {
  const [projects, setProjects] = useState([]);
  const [numberOfProjects, setNumberOfProjects] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    fetch(`/projects/${user.id}/${pageNumber}/${itemsPerPage}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProjects(result.projects);
          setNumberOfProjects(result.projectsCount);
        } else if (result.status === 404) {
          window.alert("no projects found");
        }
      });
  }, [itemsPerPage, pageNumber]);

  const handleSetItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageSelection = (event) => {
    //event.target.value not working why?
    setPageNumber(event.target.innerText);
  };

  return (
    <SidePageWrapper>
      <div>
        <h1 style={{ marginLeft: "1.5rem" }}>Projects Overview</h1>
        <PageControls>
          <Label htmlFor="number-of-projects">Projects per page</Label>
          <select
            name="number of projects"
            id="number-of-projects"
            onChange={handleSetItemsPerPage}
            defaultValue=" Select projects per page"
          >
            <option value="Select projects per page" disabled>
              Select projects per page
            </option>
            <option value="4"> 4</option>
            <option value="6">6</option>
          </select>
          <PageButtons>
            {numberOfProjects &&
              range(Math.ceil(numberOfProjects / itemsPerPage)).map(
                (page, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={(event) => {
                          handlePageSelection(event);
                        }}
                      >
                        {page + 1}
                      </button>
                    </li>
                  );
                }
              )}
          </PageButtons>
        </PageControls>
        <Projects>
          {projects.map((project) => {
            const date = project.projectStartDate;
            const formattedDate = format(new Date(date), "MMM d, yyyy");
            return (
              <>
                <ProjectListItemWrapper>
                  <ListPrefix> </ListPrefix>
                  <ProjectListItem key={project._id}>
                    <DateWrapper>
                      <AiTwotoneCalendar
                        size={20}
                        style={{ color: "#20acbb" }}
                      />
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
                          <li key={assignedDevelopper._id}>
                            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1vyNmUSNwoN--40FthmgQevZcl6z2bLpg&usqp=CAU" />
                          </li>
                        );
                      })}
                    </AssignedDeveloppersList>
                  </ProjectListItem>
                </ProjectListItemWrapper>
              </>
            );
          })}
        </Projects>
      </div>
    </SidePageWrapper>
  );
};

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
  width: 0.3rem;
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

const PageButtons = styled.ul`
  display: flex;
`;

const PageControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ProjectsOverview;
