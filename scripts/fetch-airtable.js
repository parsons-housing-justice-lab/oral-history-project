import fs from 'node:fs/promises';
import {
  getInterviews,
  getLocations,
  getPages,
  getPageSections,
  getPeople,
  getProjects,
  getProjectAttachments,
  getTextBlocks,
} from "../connectors/airtable.js";


const baseOutputDir = 'public/content';

const loadTable = async (fetchFn, tableName, mapFn = d => d) => {
  const records = await fetchFn();
  const mapped = records.map(mapFn);
  await fs.writeFile(`${baseOutputDir}/${tableName}.json`, JSON.stringify(mapped));
};

const mapProject = p => ({
  ...p,
  Photo: p.Photo[0].url,
  RecordId: p.id,
});

const mapInterview = i => ({
  ...i,
  RecordId: i.id,
});

await loadTable(getLocations, 'locations');
await loadTable(getPages, 'pages');
await loadTable(getPageSections, 'pageSections');
await loadTable(getPeople, 'people');
await loadTable(getProjects, 'projects', mapProject);
await loadTable(getInterviews, 'interviews', mapInterview);
await loadTable(getProjectAttachments, 'projectAttachments');
await loadTable(getTextBlocks, 'textBlocks');
