import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import ProjectNavigation from "./ProjectNavigation";
import MatrixInput from "./MatrixInput";

import Typography from "@mui/material/Typography";

const ProjectSndLvlMatrix = ({
  projectData,
  pageStep,
  moveToNextStep,
  moveToPrevStep,
  onUpdateSndLvlMatrix,
}) => {
  const [secondLvlMatrix, setSecondLvlMatrix] = useState(
    projectData.secondLevelMatrix
  );
  const criteriaNames = projectData.criterias.map((criteria) => criteria.name);

  const onSecondLvlMatrixChange = (rowNum, colNum) => (event) =>
    setSecondLvlMatrix((prevMatrix) => {
      let newMatrix = [...prevMatrix];

      newMatrix[rowNum][colNum] = event.target.value;
      newMatrix[colNum][rowNum] = 1 / event.target.value;

      return newMatrix;
    });

  useEffect(() => {
    onUpdateSndLvlMatrix(secondLvlMatrix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondLvlMatrix]);

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="20px">
        Pairwise comparison matrix of the second level
      </Typography>
      <Typography textAlign="center" marginBottom="20px">
        Project target: {projectData.target}
      </Typography>
      <MatrixInput
        matrix={secondLvlMatrix}
        labels={criteriaNames}
        onChange={onSecondLvlMatrixChange}
      />
      <ProjectNavigation
        marginTop="30px"
        pageStep={pageStep}
        moveToNextStep={moveToNextStep}
        moveToPrevStep={moveToPrevStep}
      />
    </Box>
  );
};

export default ProjectSndLvlMatrix;
