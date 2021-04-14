import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import SignOut from "./SignOut";
import Inbox from "./Inbox";
import Profile from "./Profile";

const App = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    getLocationFunction(setLocation);
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/apply">
            <SignUpDeveloper />
          </Route>
          <Route path="/hire">
            <SignUpEmployer />
          </Route>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signout">
            <SignOut />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
