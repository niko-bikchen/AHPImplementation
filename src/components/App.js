import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

import Navbar from "./shared/Navbar/Navbar";

import MainPage from "./pages/MainPage/MainPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import NoMatchPage from "./pages/NoMatchPage/NoMatchPage";

function App() {
  return (
    <Box>
      <Navbar />
      <Box padding="30px">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
