import React, { useReducer, useState } from "react";
import InputField from "../../Common/InputField";
import UserInputFields from "../../Common/UserInputFields";
import { useHistory } from "react-router-dom";
import { Form } from "../../Common/Styles";
import currentDate from "../../../Utils/getCurrentDate";
import Checkbox from "../../Common/Checkbox";
import {
  programmingLanguagesData,
  developpersTitleData,
  frameworksData,
} from "./emailFormData";
import { Label, Button } from "../../Common/Styles";
import styled from "styled-components";

const languageArray = ["Javascript", "PHP", "Python", "Typescript"];
const frameworksArray = ["React", "Angular", "Vue", "Laravel"];

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  city: "",
  province: "",
  country: "",
  gitHubURL: "",
  title: "",
  programmingLanguages: [],
  frameworks: [],
  bio: "",
  profilePhoto: "",
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM_TEXT_URL_SELECTONE": {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }

    case "UPDATE_FORM_IMAGE": {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }

    case "UPDATE_FORM_CHECKBOX": {
      if (languageArray.includes(payload.key)) {
        if (state.programmingLanguages.includes(payload.key)) {
          let foundIndex = state.programmingLanguages.findIndex(
            (language) => language === payload.key
          );

          /*Because a reducer is a pure function it's arugment, in this case "state" can't be mutated directly, it must be copied.
          And because programming languages is a nested object, a deep copy is needed rather than a shallow copy. Otherwise the state
          does not update properly when the checkbox is unchecked.*/

          const newState = {
            ...state,
            programmingLanguages: [...state.programmingLanguages],
          };
          newState.programmingLanguages.splice(foundIndex, 1);
          return {
            ...newState,
            programmingLanguages: [...newState.programmingLanguages],
          };
        } else {
          return {
            ...state,
            programmingLanguages: [...state.programmingLanguages, payload.key],
          };
        }
      } else if (frameworksArray.includes(payload.key)) {
        if (state.frameworks.includes(payload.key)) {
          let foundIndex = state.frameworks.findIndex(
            (framework) => framework === payload.key
          );
          const newState = {
            ...state,
            frameworks: [...state.frameworks],
          };
          newState.frameworks.splice(foundIndex, 1);

          return {
            ...newState,
            frameworks: [...newState.frameworks],
          };
        } else {
          return {
            ...state,
            frameworks: [...state.frameworks, payload.key],
          };
        }
      }
      break;
    }

    default:
      return state;
  }
};

const EmailForm = () => {
  const history = useHistory();

  const [photoUpload, setPhotoUpload] = useState("");
  const [state, dispatchLocal] = useReducer(reducer, initialFormState);

  const handleInputChange = (event) => {
    if (
      event.target.type === "text" ||
      event.target.type === "url" ||
      event.target.type === "select-one" ||
      event.target.type === "textarea"
    ) {
      dispatchLocal({
        type: "UPDATE_FORM_TEXT_URL_SELECTONE",
        payload: { key: event.target.name, value: event.target.value },
      });
    } else if (event.target.type === "file") {
      dispatchLocal({
        type: "UPDATE_FORM_IMAGE",
        payload: { key: event.target.name, value: event.target.files[0] },
      });
    } else if (event.target.type === "checkbox") {
      dispatchLocal({
        type: "UPDATE_FORM_CHECKBOX",
        payload: { key: event.target.name, value: event.target.value },
      });
    }
  };

  //use reducer handleInputChange dispatch(add_language, add_framework)
  console.log(state.profilePhoto);

  const postDetails = () => {
    const data = new FormData();
    const requestOptions = {
      method: "POST",
      body: data,
    };
    data.append("file", photoUpload);
    data.append("upload_preset", "sourcedev");
    data.append("cloud_name", "cnq");
    fetch(
      "https://api.cloudinary.com/v1_1/sourcedev-hajar/image/upload",
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        dispatchLocal({
          type: "UPDATE_FORM_IMAGE",
          payload: { key: "profilePhoto", value: result.url },
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDetails();
    console.log(state.profilePhoto);
    if (state.password === state.confirmPassword) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          ...state,
          dateAccountCreated: currentDate,
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
            return history.push("/signin");
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
      <UserInputFields state={state} dispatchLocal={dispatchLocal} />

      <InputField
        label="Github URL"
        id="github-url"
        name="gitHubURL"
        type="url"
        placeholder="Github URL"
        autoComplete="url"
        value={state.gitHubURL}
        onChange={(event) => {
          handleInputChange(event);
        }}
      />

      <Label htmlFor="title">Please choose an appropriate title</Label>
      <select
        id="title"
        name="title"
        value={state.title}
        defaultValue="Select an option"
        onChange={(event) => {
          handleInputChange(event);
        }}
      >
        <option value="Select an option" disabled>
          Select an option
        </option>
        {developpersTitleData.map((title) => (
          <option value={title}>{title}</option>
        ))}
      </select>

      <SkillsWrappers>
        <div>Languages</div>
        {programmingLanguagesData.map((language) => (
          <label id={language.id}>
            <Checkbox
              name={language.name}
              checked={state.programmingLanguages.includes(language.name)}
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
            {language.label}
          </label>
        ))}
      </SkillsWrappers>

      <SkillsWrappers>
        <div>Frameworks</div>
        {frameworksData.map((framework) => (
          <label id={framework.id}>
            <Checkbox
              name={framework.name}
              checked={state.frameworks.includes(framework.name)}
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
            {framework.label}
          </label>
        ))}
      </SkillsWrappers>

      <label htmlFor="bio" name="bio"></label>
      <textarea
        name="bio"
        id="bio"
        placeholder="Add your biography"
        onChange={(event) => {
          handleInputChange(event);
        }}
      ></textarea>

      <Label htmlFor="profile-photo">Upload a profile photo</Label>
      <ProfilePhoto
        type="file"
        name="profilePhoto"
        id="profile-photo"
        onChange={(event) => {
          setPhotoUpload(event.target.files[0]);
        }}
      ></ProfilePhoto>

      <Button type="submit" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Form>
  );
};

const SkillsWrappers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const ProfilePhoto = styled.input`
  margin: 2rem 0;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: "Select a profile photo";
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.inputBackground};
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding: 0.4rem 0.1rem;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }
  &:hover::before {
    opacity: 0.7;
  }
`;
export default EmailForm;
