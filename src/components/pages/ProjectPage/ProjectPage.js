import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import { getProject } from "../../../context/selectors";
import {
  updateSndLvlMatrix,
  updateThrdLvlMatrix,
  updateBlockName,
} from "../../../context/actions";

import Box from "@mui/material/Box";

import NoMatchPage from "../NoMatchPage/NoMatchPage";

import ProjectOverview from "./components/ProjectOverview";
import ProjectSndLvlMatrix from "./components/ProjectSndLvlMatrix";
import ProjectThrdLvlMatrices from "./components/ProjectThrdLvlMatrices";
import ProjectResults from "./components/ProjectResults";

const ProjectPage = () => {
  const [pageStep, setPageStep] = useState(0);

  const params = useParams();
  const { selectFromAppContext, changeAppContext } = useContext(AppContext);

  const projectId = params.projectId;
  const projectData = selectFromAppContext(getProject(projectId));

  const moveToNextStep = () => setPageStep((step) => step + 1);
  const moveToPrevStep = () =>
    setPageStep((step) => (step - 1 < 0 ? 0 : step - 1));

  const onUpdateSndLvlMatrix = (newMatrix) =>
    changeAppContext(updateSndLvlMatrix(newMatrix, projectId));

  const onUpdateThrdLvlMatrix = (newMatrices) =>
    changeAppContext(updateThrdLvlMatrix(newMatrices, projectId));

  const updateOverviewBlockName = (newName, projectId, blockType, blockId) =>
    changeAppContext(updateBlockName(newName, projectId, blockType, blockId));

  if (
    projectData &&
    Object.keys(projectData).length === 0 &&
    Object.getPrototypeOf(projectData) === Object.prototype
  ) {
    return <NoMatchPage />;
  }

  return (
    <Box>
      {pageStep === 0 && (
        <ProjectOverview
          projectData={projectData}
          pageStep={pageStep}
          moveToNextStep={moveToNextStep}
          moveToPrevStep={moveToPrevStep}
          updateOverviewBlockName={updateOverviewBlockName}
        />
      )}
      {pageStep === 1 && (
        <ProjectSndLvlMatrix
          projectData={projectData}
          pageStep={pageStep}
          moveToNextStep={moveToNextStep}
          moveToPrevStep={moveToPrevStep}
          onUpdateSndLvlMatrix={onUpdateSndLvlMatrix}
        />
      )}
      {pageStep === 2 && (
        <ProjectThrdLvlMatrices
          projectData={projectData}
          pageStep={pageStep}
          moveToNextStep={moveToNextStep}
          moveToPrevStep={moveToPrevStep}
          onUpdateThrdLvlMatrix={onUpdateThrdLvlMatrix}
        />
      )}
      {pageStep === 3 && (
        <ProjectResults
          projectData={projectData}
          pageStep={pageStep}
          moveToNextStep={moveToNextStep}
          moveToPrevStep={moveToPrevStep}
        />
      )}
    </Box>
  );
};

export default ProjectPage;
