import React, { useReducer } from "react";

import {
  addNewProjectReducer,
  updateSndLvlMatrixReducer,
  updateThrdLvlMatrixReducer,
} from "./reducers";
import {
  ADD_PROJECT,
  UPDATE_SND_LVL_MATRIX,
  UPDATE_THRD_LVL_MATRIX,
} from "./constants";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [appContext, changeAppContext] = useReducer(
    (state, newData) => {
      switch (newData.action) {
        case ADD_PROJECT:
          return addNewProjectReducer(state, newData);
        case UPDATE_SND_LVL_MATRIX:
          return updateSndLvlMatrixReducer(state, newData);
        case UPDATE_THRD_LVL_MATRIX:
          return updateThrdLvlMatrixReducer(state, newData);
        default:
          throw new Error("Unexpected action!");
      }
    },
    {
      projects: [],
    }
  );

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
