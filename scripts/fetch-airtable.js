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

const mapProjectAttachment = async p => {
  const mapped = {
    ...p,
    RecordId: p.id,
  };

  if (p.File?.[0]?.thumbnails?.large?.url) {
    const thumbnailUrl = await fetchImage(p.File[0].thumbnails.large.url, 'project-attachments', p.id, true);
    if (thumbnailUrl) {
      mapped.File = {
        full: p.File[0].url,
        thumbnail: thumbnailUrl,
      };
    }
  }

  return mapped;
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

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

await loadTable(getLocations, 'locations');
await sleep(500);
await loadTable(getPages, 'pages');
await sleep(500);
await loadTable(getPageSections, 'pageSections');
await sleep(500);
await loadTable(getPeople, 'people');
await sleep(500);
await loadTable(getProjects, 'projects', mapProject);
await sleep(500);
await loadTable(getInterviews, 'interviews', mapInterview);
await sleep(500);
await loadTable(getProjectAttachments, 'projectAttachments', mapProjectAttachment);
await sleep(500);
await loadTable(getTextBlocks, 'textBlocks');
