import { ADD_PROJECT } from "./constants";

export const addNewProject = (projectData) => ({
  action: ADD_PROJECT,
  payload: projectData,
});
