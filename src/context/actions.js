import {
  ADD_PROJECT,
  UPDATE_SND_LVL_MATRIX,
  UPDATE_THRD_LVL_MATRIX,
} from "./constants";

export const addNewProject = (projectData) => ({
  action: ADD_PROJECT,
  payload: projectData,
});

export const updateSndLvlMatrix = (newMatrix, projectId) => ({
  action: UPDATE_SND_LVL_MATRIX,
  payload: { newMatrix, projectId },
});

export const updateThrdLvlMatrix = (newMatrices, projectId) => ({
  action: UPDATE_THRD_LVL_MATRIX,
  payload: { newMatrices, projectId },
});
