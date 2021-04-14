import React, { useState } from "react";
import InputField from "../../Common/InputField";
import UserInputFields from "../../Common/UserInputFields";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../reducers/actions/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const EmailForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    programmingLanguages: [],
    frameworks: [],
  });
  const [profilePhoto, setProfilePhoto] = useState({});

  const languageArray = ["Javascript", "PHP", "Python", "Typescript"];
  const frameworksArray = ["React", "Angular", "Vue", "Laravel"];
  console.log(inputValue);
  const handleInputChange = (event) => {
    console.log(event.target.type);
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
    if (event.target.type === "checkbox") {
      if (languageArray.includes(event.target.name)) {
        if (inputValue.programmingLanguages.includes(event.target.name)) {
          //slice it // findindex
          let foundIndex = inputValue.programmingLanguages.findIndex(
            (language) => language === event.target.name
          );
          return inputValue.programmingLanguages.splice(foundIndex);

          //use slice with findindex
        } else {
          setInputValue({
            ...inputValue,
            programmingLanguages: [...inputValue.programmingLanguages, name],
          });
        }
      } else if (frameworksArray.includes(event.target.name)) {
        if (inputValue.frameworks.includes(event.target.name)) {
          //slice
          let foundIndex = inputValue.frameworks.findIndex(
            (framework) => framework === event.target.name
          );
          return inputValue.frameworks.splice(foundIndex);
        } else {
          setInputValue({
            ...inputValue,
            frameworks: [...inputValue.frameworks, name],
          });
        }
      }
    }
  };

  //use reducer handleInputChange dispatch(add_language, add_framework)

  const handlePhotoUpload = (event) => {
    console.log(event.target.files[0]);
    setProfilePhoto(event.target.files[0]);
    console.log(profilePhoto);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.password === inputValue.confirmPassword) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          email: inputValue.email,
          password: inputValue.password,
          city: inputValue.city,
          province: inputValue.province,
          country: inputValue.country,
          githubURL: inputValue.gitHubURL,
          title: inputValue.title,
          programmingLanguages: inputValue.programmingLanguages,
          frameworks: inputValue.frameworks,
          bio: inputValue.bio,
          profilePhoto: profilePhoto,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch("/signup/dev", requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            dispatch(
              signUp({
                id: result.user._id,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.email,
                gitHubURL: result.user.gitHubURL,
              })
            );
            return history.push("/");
          } else {
            return window.alert(
              "An account with this email address already exists. Please sign in.  "
            );
          }
        });
    } else {
      window.alert("passwords do not match");
    }
  };
  return (
    <Form>
      {/* Get a user's firstName, lastName, email, new password, and new password confirmation  */}
      <UserInputFields inputValue={inputValue} setInputValue={setInputValue} />
      <InputField
        label="Github URL"
        id="github-url"
        name="gitHubURL"
        type="url"
        placeholder="Github URL"
        autoComplete="url"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <label htmlFor="title">Please choose an appropriate title</label>
      <select
        id="title"
        name="title"
        value={inputValue.title}
        onChange={handleInputChange}
      >
        <option value="Frontend Web Developper">Frontend Web Developper</option>
        <option value="Backend Developper">Backend Web Developper</option>
        <option value="Fullstack Developper">Fullstack Web Developper</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Cloud architect">Cloud architect</option>
      </select>
      <div>
        <div>please choose languages</div>
        <input
          type="checkbox"
          id="javascript"
          name="Javascript"
          checked={inputValue.programmingLanguages.includes("Javascript")}
          onChange={handleInputChange}
        />
        <label for="javascript">Javascript</label>
        <input
          type="checkbox"
          id="php"
          name="PHP"
          checked={inputValue.programmingLanguages.includes("PHP")}
          onChange={handleInputChange}
        />
        <label for="php">PHP</label>
        <input
          type="checkbox"
          id="python"
          name="Python"
          checked={inputValue.programmingLanguages.includes("Python")}
          onChange={handleInputChange}
        />
        <label for="python">Python</label>
        <input
          type="checkbox"
          id="typescript"
          name="Typescript"
          checked={inputValue.programmingLanguages.includes("Typescript")}
          onChange={handleInputChange}
        />
        <label for="typescript">Typescript</label>
      </div>

      <div>
        <div>please choose frameworks</div>
        <input
          type="checkbox"
          id="React"
          name="React"
          checked={inputValue.frameworks.includes("React")}
          onChange={handleInputChange}
        />
        <label for="react">React</label>
        <input
          type="checkbox"
          id="angular"
          name="Angular"
          checked={inputValue.frameworks.includes("Angular")}
          onChange={handleInputChange}
        />
        <label for="angular">Angular</label>
        <input
          type="checkbox"
          id="vue"
          name="Vue"
          checked={inputValue.frameworks.includes("Vue")}
          onChange={handleInputChange}
        />
        <label for="vue">Vue</label>
        <input
          type="checkbox"
          id="laravel"
          name="Laravel"
          checked={inputValue.frameworks.includes("Laravel")}
          onChange={handleInputChange}
        />
        <label for="laravel">Laravel</label>
      </div>
      <label htmlFor="bio" name="bio"></label>
      <textarea
        name="bio"
        id="bio"
        value={inputValue.bio}
        onChange={handleInputChange}
      ></textarea>
      <label htmlFor="profile-photo">Upload a profile photo</label>
      <input
        type="file"
        name="profilePhoto"
        id="profile-photo"
        onChange={handlePhotoUpload}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export default EmailForm;
