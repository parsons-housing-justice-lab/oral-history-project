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
const baseOutputImageDir = `${baseOutputDir}/images`;

const loadTable = async (fetchFn, tableName, mapFn = d => d) => {
  const records = await fetchFn();
  const mapped = await Promise.all(records.map(mapFn));
  await fs.writeFile(`${baseOutputDir}/${tableName}.json`, JSON.stringify(mapped));
};

const fetchImage = async (url, table, id) => {
  const imageResponse = await fetch(url);
  const ext = imageResponse.headers.get('content-disposition')
    .split(".").slice(-1)[0].replace('"', '');
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = `images/${table}/${id}.${ext}`;
  await fs.writeFile(`${baseOutputDir}/${filePath}`, buffer);
  return `/content/${filePath}`;
};

const mapProject = async p => {
  const photoUrl = await fetchImage(p.Photo[0].url, 'projects', p.id);
  return {
    ...p,
    Photo: photoUrl,
    RecordId: p.id,
  };
};

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
