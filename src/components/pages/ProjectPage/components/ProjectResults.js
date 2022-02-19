import React from "react";

import { calculateConsistency, arraySum } from "../../../utils";

import ProjectNavigation from "./ProjectNavigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const ProjectResults = ({
  projectData,
  pageStep,
  moveToNextStep,
  moveToPrevStep,
}) => {
  const alternatives = projectData.alternatives;
  const criterias = projectData.criterias;

  const secondLevelMatrix = projectData.secondLevelMatrix;
  const thirdLevelMatrices = projectData.thirdLevelMatrices;

  const sndLvlMatrixPrior =
    calculateConsistency(secondLevelMatrix).prioritiesVector;
  const thdLvlMatricesPriors = thirdLevelMatrices.map(
    (matrix) => calculateConsistency(matrix).prioritiesVector
  );
  const sndByThrdPriorsMatrix = sndLvlMatrixPrior.map((value1, index) =>
    thdLvlMatricesPriors[index].map((value2) => value2 * value1)
  );
  const sndByThrdPriorsMatrixTranspose = Array.from({
    length: sndByThrdPriorsMatrix[0].length,
  }).map((_, colNum) =>
    Array.from({ length: sndByThrdPriorsMatrix.length }).map(
      (_, rowNum) => sndByThrdPriorsMatrix[rowNum][colNum]
    )
  );

  const globalPriors = sndByThrdPriorsMatrixTranspose.map((row) =>
    arraySum(row)
  );
  const priorsToAlternatives = alternatives.reduce(
    (result, alternative) => ({
      ...result,
      [alternative.name]: globalPriors[alternative.id],
    }),
    {}
  );

  return (
    <Box>
      <Stack direction="column" spacing={2} justifyContent="center">
        {Object.entries(priorsToAlternatives).map(
          ([alternativeName, globalPrior]) => (
            <Stack direction="row" justifyContent="center">
              <Typography fontWeight="bold">{alternativeName}:</Typography>
              &nbsp;
              <Typography>{globalPrior}</Typography>
            </Stack>
          )
        )}
      </Stack>
      <ProjectNavigation
        pageStep={pageStep}
        moveToPrevStep={moveToPrevStep}
        moveToNextStep={moveToNextStep}
      />
    </Box>
  );
};

export default ProjectResults;
