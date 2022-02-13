import React, { useState, useContext } from "react";

import { AppContext } from "../../../../../../context/AppContext";
import { addNewProject } from "../../../../../../context/actions";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

const ProjectCreationModal = () => {
  const { changeAppContext } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCriteriaNumber, setProjectCriteriaNumber] = useState(1);
  const [projectAlternativesNumber, setProjectAlternativesNumber] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProjectName("");
    setProjectCriteriaNumber(1);
    setProjectAlternativesNumber(1);
  };

  const handleNameChange = (event) => setProjectName(event.target.value);

  const handleValueChange = (event, newValue) =>
    event.target.name === "criterianum"
      ? setProjectCriteriaNumber(newValue)
      : setProjectAlternativesNumber(newValue);

  const handleSubmit = () => {
    changeAppContext(
      addNewProject({
        name: projectName,
        criteriaNum: projectCriteriaNumber,
        alternativesNum: projectAlternativesNumber,
      })
    );
    handleClose();
  };

  return (
    <Box>
      <Box textAlign={"center"}>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleClickOpen}
        >
          Create New
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new project please fill in the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            value={projectName}
          />
          <Box marginTop="15px">
            <Typography>Number of criteria</Typography>
            <Slider
              min={1}
              max={20}
              step={1}
              defaultValue={1}
              valueLabelDisplay="auto"
              marks
              name="criterianum"
              value={
                typeof projectCriteriaNumber === "number"
                  ? projectCriteriaNumber
                  : 1
              }
              onChange={handleValueChange}
            />
          </Box>
          <Box marginTop="15px">
            <Typography>Number of alternatives</Typography>
            <Slider
              min={1}
              max={20}
              step={1}
              defaultValue={1}
              valueLabelDisplay="auto"
              marks
              name="alternativesnum"
              value={
                typeof projectAlternativesNumber === "number"
                  ? projectAlternativesNumber
                  : 1
              }
              onChange={handleValueChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectCreationModal;
