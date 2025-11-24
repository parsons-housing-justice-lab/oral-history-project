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
  getThemes,
  getSubthemes,
} from "../app/connectors/airtable.js";
import mime from 'mime-types';


const baseOutputDir = 'public/content';
const baseOutputImageDir = `${baseOutputDir}/images`;
const apiKey = process.env.AIRTABLE_API_KEY;

const loadTable = async (fetchFn, tableName, mapFn = d => d) => {
  const records = await fetchFn(apiKey);
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

const fetchFile = async (url, table, id) => {
  let finalUrl = null;

  try {
    const response = await fetch(url);
    const ext = mime.extension(response.headers.get('content-type'));
    if (ext === 'pptx') return null;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `${id}_full`;
    const filePath = `files/${table}/${fileName}.${ext}`;
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

  let fileUrl = null;
  let thumbnailUrl = null;

  if (p.File?.[0]?.url) {
    fileUrl = await fetchFile(p.File[0].url, 'project-attachments', p.id, true);
  }

  if (p.File?.[0]?.thumbnails?.large?.url) {
    thumbnailUrl = await fetchImage(p.File[0].thumbnails.large.url, 'project-attachments', p.id, true);
  }

  if (fileUrl || thumbnailUrl) {
    mapped.File = {};

    if (fileUrl) mapped.File.full = fileUrl;
    if (thumbnailUrl) mapped.File.thumbnail = thumbnailUrl;
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
await sleep(500);
await loadTable(getThemes, 'themes');
await sleep(500);
await loadTable(getSubthemes, 'subthemes');
