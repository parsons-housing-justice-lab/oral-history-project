const base = '/content';

const getTable = async (filename) => {
  const response = await fetch(`${base}/${filename}.json`);
  const json = await response.json();
  return json;
};

export const getInterviews = async () => {
  return getTable('interviews');
};

export const getLocations = async () => {
  return getTable('locations');
};

export const getPages = async () => {
  return getTable('pages');
};

export const getPageSections = async () => {
  return getTable('pageSections');
};

export const getPeople = async () => {
  return getTable('people');
};

export const getProjects = async () => {
  return getTable('projects');
};

export const getProjectAttachments = async () => {
  return getTable('projectAttachments');
};

export const getTextBlocks = async () => {
  return getTable('textBlocks');
};
