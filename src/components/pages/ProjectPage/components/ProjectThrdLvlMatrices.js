import React, { useState } from "react";
import uniqid from "uniqid";

import ProjectNavigation from "./ProjectNavigation";
import MatrixInput from "./MatrixInput";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

const ProjectThrdLvlMatrices = ({
  projectData,
  pageStep,
  moveToNextStep,
  moveToPrevStep,
  onUpdateThrdLvlMatrix,
}) => {
  const [thirdLevelMatrices, setThirdLevelMatrices] = useState(
    projectData.thirdLevelMatrices
  );

  const criterias = projectData.criterias;
  const alternatives = projectData.alternatives;

  const alternativesNames = alternatives.map((alternative) => alternative.name);

  const onThirdLvlMatrixChange = (criteriaId) => (rowNum, colNum) => (event) =>
    setThirdLevelMatrices((prevMatrices) => {
      const newMatrices = [...prevMatrices];

      newMatrices.map((matrix, index) => {
        if (index === criteriaId) {
          let newMatrix = [...matrix];

          newMatrix[rowNum][colNum] = event.target.value;
          newMatrix[colNum][rowNum] = 1 / event.target.value;

          return newMatrix;
        } else {
          return matrix;
        }
      });

      return newMatrices;
    });

  const moveToNextStepWrapper = () => {
    onUpdateThrdLvlMatrix(thirdLevelMatrices);
    moveToNextStep();
  };
  const moveToPrevStepWrapper = () => {
    onUpdateThrdLvlMatrix(thirdLevelMatrices);
    moveToPrevStep();
  };
  const goToMainMenu = () => {
    onUpdateThrdLvlMatrix(thirdLevelMatrices);
  };

  return (
    <Box>
      <Stack flexWrap="wrap" direction="row" justifyContent="center">
        {criterias.map((criteria) => (
          <Box marginTop="20px" marginRight="40px" key={uniqid()}>
            <Typography textAlign="center" marginBottom="5px">
              Criteria: {criteria.name}
            </Typography>
            <MatrixInput
              matrix={thirdLevelMatrices[criteria.id]}
              labels={alternativesNames}
              onChange={onThirdLvlMatrixChange(criteria.id)}
            />
          </Box>
        ))}
      </Stack>
      <ProjectNavigation
        marginTop="30px"
        pageStep={pageStep}
        moveToNextStep={moveToNextStepWrapper}
        moveToPrevStep={moveToPrevStepWrapper}
        goToMainMenu={goToMainMenu}
      />
    </Box>
  );
};

export default ProjectThrdLvlMatrices;
