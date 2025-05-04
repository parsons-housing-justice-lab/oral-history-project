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
import mime from 'mime-types';


const baseOutputDir = 'public/content';
const baseOutputImageDir = `${baseOutputDir}/images`;

const loadTable = async (fetchFn, tableName, mapFn = d => d) => {
  const records = await fetchFn();
  const mapped = await Promise.all(records.map(mapFn));
  await fs.writeFile(`${baseOutputDir}/${tableName}.json`, JSON.stringify(mapped));
};

const fetchImage = async (url, table, id, isThumbnail = false) => {
  let finalUrl = null;

  try {
    const imageResponse = await fetch(url);
    const ext = mime.extension(imageResponse.headers.get('content-type'));
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `${id}_${isThumbnail ? 'thumbnail' : 'full'}`;
    const filePath = `images/${table}/${fileName}.${ext}`;
    await fs.writeFile(`${baseOutputDir}/${filePath}`, buffer);
    finalUrl = `/content/${filePath}`;
  }
  catch (error) {
    console.error(error);
  }

  return finalUrl;
};

const mapProject = async p => {
  const photoUrl = await fetchImage(p.Photo[0].url, 'projects', p.id);
  return {
    ...p,
    Photo: photoUrl,
    RecordId: p.id,
  };
};

const mapInterview = async i => {
  const mapped = {
    ...i,
    RecordId: i.id,
  };

  let full = null;
  let thumbnail = null;

  if (i.Photo?.[0]?.url) {
    full = await fetchImage(i.Photo[0].url, 'interviews', i.id);
    thumbnail = await fetchImage(i.Photo[0].thumbnails.large.url, 'interviews', i.id, true);
  }

  if (full || thumbnail) {
    mapped.Photo = {};
    if (full) mapped.Photo.full = full;
    if (thumbnail) mapped.Photo.thumbnail = thumbnail;
  }

  return mapped;
};

await loadTable(getLocations, 'locations');
await loadTable(getPages, 'pages');
await loadTable(getPageSections, 'pageSections');
await loadTable(getPeople, 'people');
await loadTable(getProjects, 'projects', mapProject);
await loadTable(getInterviews, 'interviews', mapInterview);
await loadTable(getProjectAttachments, 'projectAttachments');
await loadTable(getTextBlocks, 'textBlocks');
