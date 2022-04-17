import React, { useReducer, useEffect } from "react";

import {
  addNewProjectReducer,
  updateSndLvlMatrixReducer,
  updateThrdLvlMatrixReducer,
  updateBlockNameReducer,
  deleteProjectReducer,
} from "./reducers";
import {
  ADD_PROJECT,
  SET_PROJECTS,
  DELETE_PROJECT,
  UPDATE_SND_LVL_MATRIX,
  UPDATE_THRD_LVL_MATRIX,
  UPDATE_BLOCK_NAME,
} from "./constants";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [appContext, changeAppContext] = useReducer(
    (state, newData) => {
      switch (newData.action) {
        case SET_PROJECTS:
          return { ...state, projects: newData.payload };
        case ADD_PROJECT:
          return addNewProjectReducer(state, newData);
        case DELETE_PROJECT:
          const newState = deleteProjectReducer(state, newData);
          localStorage.setItem("projects", JSON.stringify(newState.projects));
          return newState;
        case UPDATE_SND_LVL_MATRIX:
          return updateSndLvlMatrixReducer(state, newData);
        case UPDATE_THRD_LVL_MATRIX:
          return updateThrdLvlMatrixReducer(state, newData);
        case UPDATE_BLOCK_NAME:
          return updateBlockNameReducer(state, newData);
        default:
          throw new Error("Unexpected action!");
      }
    },
    {
      projects: [],
    }
  );

  useEffect(() => {
    if (appContext.projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(appContext.projects));
    }
  }, [appContext.projects]);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (projects.length > 0) {
      changeAppContext({ action: SET_PROJECTS, payload: projects });
    }
  }, []);

  const selectFromAppContext = (selector) => {
    return selector(appContext);
  };

  return (
    <AppContext.Provider value={{ changeAppContext, selectFromAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
