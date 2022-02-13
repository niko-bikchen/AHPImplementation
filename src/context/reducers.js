import uniqid from "uniqid";

export const addNewProjectReducer = (state, newData) => {
  const { name, criteriaNum, alternativesNum } = newData.payload;

  return {
    ...state,
    projects: [
      ...state.projects,
      { name, criteriaNum, alternativesNum, id: uniqid() },
    ],
  };
};
