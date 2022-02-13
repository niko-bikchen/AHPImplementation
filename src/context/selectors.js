export const getProjects = (state) => state.projects;

export const getProject = (projectId) => (state) =>
  state.projects.find((project) => project.id === projectId) || {};
