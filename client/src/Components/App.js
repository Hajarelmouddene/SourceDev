import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home";
import SignUpDeveloper from "./SignUp/Developer";
import SignUpEmployer from "./SignUp/Employer";
import SignIn from "./SignIn/index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../theme";
import GlobalStyles from "./GlobalStyles";
import { getLocationFunction } from "../Utils/geolocationFunction";
import Inbox from "./Inbox";
import Profile from "./Profile";
import ProjectsOverview from "./Projects";
import StartProject from "./Projects/StartProject";
import KanBanBoard from "./Projects/KanBanBoard";
import MyProfile from "./Profile/MyProfile";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/actions/actions";

const App = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocationFunction(setLocation);
  }, []);

  useEffect(() => {
    let userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      fetch(`/users/getUser`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          dispatch(
            signIn({
              firstName: result.user.firstName,
              lastName: result.user.lastName,
              id: result.user._id,
            })
          );
        });
    }
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        <PageWrapper>
          <Header open={open} setOpen={setOpen} />
          <Switch>
            <Route exact path="/">
              <Home location={location} />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route exact path="/apply">
              <SignUpDeveloper />
            </Route>
            <Route exact path="/hire">
              <SignUpEmployer />
            </Route>
            <Route exact path="/inbox">
              <Inbox />
            </Route>
            <Route exact path="/projects/:id">
              <KanBanBoard setOpen={setOpen} />
            </Route>
            <Route exact path="/projects">
              <ProjectsOverview />
            </Route>
            <Route exact path="/startproject">
              <StartProject />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signout">
              <Redirect to="/signin" />
            </Route>
            <Route exact path="/myprofile">
              <MyProfile />
            </Route>
          </Switch>
          <Footer location={location} />
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
};

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export default App;
