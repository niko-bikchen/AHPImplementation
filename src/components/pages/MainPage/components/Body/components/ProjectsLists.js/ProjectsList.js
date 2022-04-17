import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { AppContext } from "../../../../../../../context/AppContext";
import { getProjects } from "../../../../../../../context/selectors";
import { deleteProject } from "../../../../../../../context/actions";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Typography from "@mui/material/Typography";

const ProjectsList = () => {
  const [open, setOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState("");
  const { selectFromAppContext, changeAppContext } = useContext(AppContext);

  const projects = selectFromAppContext(getProjects);

  const handleClickOpen = (projectId) => () => {
    setOpen(true);
    setProjectToDelete(projectId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSelectedProject = () => {
    changeAppContext(deleteProject(projectToDelete));
    handleClose();
  };

  if (projects.length === 0) {
    return (
      <Box marginBottom="20px" marginTop="15px" textAlign="center">
        <Typography>No available projects.</Typography>
        <Typography>
          Create a new project by pressing a button below.
        </Typography>
      </Box>
    );
  }

  return (
    <Box marginBottom="10px" marginTop="10px">
      <List>
        {projects.map((project) => (
          <ListItem
            disablePadding
            key={project.id}
            secondaryAction={
              <IconButton edge="end" onClick={handleClickOpen(project.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton component={Link} to={`/projects/${project.id}`}>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete project?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteSelectedProject}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsList;
