import {
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_SND_LVL_MATRIX,
  UPDATE_THRD_LVL_MATRIX,
  UPDATE_BLOCK_NAME,
} from "./constants";

export const addNewProject = (projectData) => ({
  action: ADD_PROJECT,
  payload: projectData,
});

export const deleteProject = (projectId) => ({
  action: DELETE_PROJECT,
  payload: projectId,
});

export const updateSndLvlMatrix = (newMatrix, projectId) => ({
  action: UPDATE_SND_LVL_MATRIX,
  payload: { newMatrix, projectId },
});

export const updateThrdLvlMatrix = (newMatrices, projectId) => ({
  action: UPDATE_THRD_LVL_MATRIX,
  payload: { newMatrices, projectId },
});

export const updateBlockName = (newName, projectId, blockType, blockId) => ({
  action: UPDATE_BLOCK_NAME,
  payload: { newName, projectId, blockType, blockId },
});
