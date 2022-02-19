import uniqid from "uniqid";

export const addNewProjectReducer = (state, newData) => {
  const { name, target, criteriaNum, alternativesNum } = newData.payload;

  const criterias = Array.from({ length: criteriaNum }).map((_, index) => ({
    id: index,
    name: `Criteria ${index + 1}`,
    desription: "",
  }));
  const alternatives = Array.from({ length: alternativesNum }).map(
    (_, index) => ({
      id: index,
      name: `Alternative ${index + 1}`,
      desription: "",
    })
  );

  const secondLevelMatrix = Array.from({ length: criteriaNum }).map((_, row) =>
    Array.from({ length: criteriaNum }).map((_, column) =>
      row === column ? 1 : 0
    )
  );
  const thirdLevelMatrices = Array.from({ length: criteriaNum }).map(() =>
    Array.from({ length: alternativesNum }).map((_, row) =>
      Array.from({ length: alternativesNum }).map((_, column) =>
        row === column ? 1 : 0
      )
    )
  );

  return {
    ...state,
    projects: [
      ...state.projects,
      {
        id: uniqid(),
        name,
        target,
        criterias,
        alternatives,
        secondLevelMatrix,
        thirdLevelMatrices,
      },
    ],
  };
};

export const updateSndLvlMatrixReducer = (state, newData) => {
  const { newMatrix, projectId } = newData.payload;

  const newProjects = state.projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          secondLevelMatrix: [...newMatrix],
        }
      : project
  );

  return {
    ...state,
    projects: newProjects,
  };
};

export const updateThrdLvlMatrixReducer = (state, newData) => {
  const { newMatrices, projectId } = newData;

  const newProjects = state.projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          thirdLevelMatrices: [...newMatrices],
        }
      : project
  );

  return {
    ...state,
    projects: newProjects,
  };
};
