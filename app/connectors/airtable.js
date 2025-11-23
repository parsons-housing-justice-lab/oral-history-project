import Airtable from "airtable";
import {
  AIRTABLE_API_KEY,
  AIRTABLE_DATABASE_ID,
  AIRTABLE_LOCATIONS_TABLE,
  AIRTABLE_INTERVIEWS_TABLE,
  AIRTABLE_PAGES_TABLE,
  AIRTABLE_PEOPLE_TABLE,
  AIRTABLE_PAGE_SECTIONS_TABLE,
  AIRTABLE_PROJECTS_TABLE,
  AIRTABLE_PROJECT_ATTACHMENTS_TABLE,
  AIRTABLE_TEXT_BLOCKS_TABLE,
  AIRTABLE_THEMES_TABLE,
  AIRTABLE_SUBTHEMES_TABLE,
} from "../constants.js";

const getRecords = async (table, apiKey, selectOptions = {}, progressCallback = null) => {
  const base = new Airtable({apiKey}).base(AIRTABLE_DATABASE_ID);

  return new Promise((resolve, reject) => {
    let allRecords = [];

    const options = {
      maxRecords: 2500,
      ...selectOptions,
    };

    base(table).select(options)
      .eachPage(
        (records, fetchNextPage) => {
          const recordsBatch = records.map(r => ({
            ...r.fields,
            id: r.id,
          }));
          allRecords = [...allRecords, ...recordsBatch];
          if (progressCallback) {
            progressCallback(recordsBatch);
          }
          fetchNextPage();
        },
        err => {
          if (err) return reject(err);
          resolve(allRecords);
        }
      );
  });
};

export const getLocations = async (apiKey) => {
  return await getRecords(AIRTABLE_LOCATIONS_TABLE, apiKey, {
    filterByFormula: "{Status} = 'Published'",
  });
};

export const getInterviews = async (apiKey) => {
  return await getRecords(AIRTABLE_INTERVIEWS_TABLE, apiKey, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ]
  });
};

export const getPages = async (apiKey) => {
  return await getRecords(AIRTABLE_PAGES_TABLE, apiKey);
};

export const getPageSections = async (apiKey) => {
  return await getRecords(AIRTABLE_PAGE_SECTIONS_TABLE, apiKey);
};

export const getPeople = async (apiKey) => {
  return await getRecords(AIRTABLE_PEOPLE_TABLE, apiKey, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Order' },
    ]
  });
};

export const getProjects = async (apiKey) => {
  return await getRecords(AIRTABLE_PROJECTS_TABLE, apiKey, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ],
  });
};

export const getProjectAttachments = async (apiKey) => {
  return await getRecords(AIRTABLE_PROJECT_ATTACHMENTS_TABLE, apiKey, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ],
  });
};

export const getTextBlocks = async (apiKey) => {
  return await getRecords(AIRTABLE_TEXT_BLOCKS_TABLE, apiKey);
};

export const getThemes = async (apiKey) => {
  return await getRecords(AIRTABLE_THEMES_TABLE, apiKey);
};

export const getSubthemes = async (apiKey) => {
  return await getRecords(AIRTABLE_SUBTHEMES_TABLE, apiKey);
};
