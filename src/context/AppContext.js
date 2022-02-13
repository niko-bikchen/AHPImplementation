import React, { useReducer } from "react";

import { addNewProjectReducer } from "./reducers";
import { ADD_PROJECT } from "./constants";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [appContext, changeAppContext] = useReducer(
    (state, newData) => {
      switch (newData.action) {
        case ADD_PROJECT:
          return addNewProjectReducer(state, newData);
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
