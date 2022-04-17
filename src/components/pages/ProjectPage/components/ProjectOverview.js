import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Typography from "@mui/material/Typography";

import ProjectNavigation from "./ProjectNavigation";

const ProjectOverview = ({
  projectData,
  pageStep,
  moveToNextStep,
  moveToPrevStep,
  updateOverviewBlockName,
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedBlockData, setSelectedBlockData] = useState({});
  const [newName, setNewName] = useState("");

  const handleClickOpen = (projectId, blockType, blockId) => () => {
    setDialogIsOpen(true);
    setSelectedBlockData({ projectId, blockType, blockId });
  };

  const handleClose = () => {
    setDialogIsOpen(false);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleDialogConfirm = () => {
    updateOverviewBlockName(
      newName,
      projectData.id,
      selectedBlockData.blockType,
      selectedBlockData.blockId
    );
    handleClose();
  };

  return (
    <Box>
      <Stack direction="column" spacing={8}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Paper sx={{ padding: "20px" }}>
            <Typography>{projectData.target}</Typography>
          </Paper>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {projectData.criterias.map((criteria) => (
            <Box
              key={criteria.id}
              sx={{
                marginTop: projectData.alternatives.length > 1 ? "15px" : "0px",
                marginRight:
                  projectData.alternatives.length > 1 ? "20px" : "0px",
                cursor: "pointer",
              }}
              onClick={handleClickOpen(
                projectData.id,
                "criterias",
                criteria.id
              )}
            >
              <Paper sx={{ padding: "20px" }}>
                <Typography>{criteria.name}</Typography>
              </Paper>
            </Box>
          ))}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {projectData.alternatives.map((alternative) => (
            <Box
              key={alternative.id}
              sx={{
                marginTop: projectData.alternatives.length > 1 ? "15px" : "0px",
                marginRight:
                  projectData.alternatives.length > 1 ? "20px" : "0px",
                cursor: "pointer",
              }}
              onClick={handleClickOpen(
                projectData.id,
                "alternatives",
                alternative.id
              )}
            >
              <Paper sx={{ padding: "20px" }}>
                <Typography>{alternative.name}</Typography>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Stack>
      <ProjectNavigation
        pageStep={pageStep}
        moveToNextStep={moveToNextStep}
        moveToPrevStep={moveToPrevStep}
      />
      <Dialog open={dialogIsOpen} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Change{" "}
          {selectedBlockData.blockType === "alternatives"
            ? "alternative"
            : "criteria"}{" "}
          name
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Input new name for this{" "}
            {selectedBlockData.blockType === "alternatives"
              ? "alternative"
              : "criteria"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            variant="standard"
            onInput={handleNameInput}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogConfirm}
            disabled={newName.trim().length === 0}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectOverview;
