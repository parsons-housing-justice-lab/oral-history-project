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
} from "@/constants";

const getRecords = async (table, selectOptions = {}, progressCallback = null) => {
  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_DATABASE_ID);

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

export const getLocations = async () => {
  return await getRecords(AIRTABLE_LOCATIONS_TABLE, {
    filterByFormula: "{Status} = 'Published'",
  });
};

export const getInterviews = async () => {
  return await getRecords(AIRTABLE_INTERVIEWS_TABLE, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ]
  });
};

export const getPages = async () => {
  return await getRecords(AIRTABLE_PAGES_TABLE);
};

export const getPageSections = async () => {
  return await getRecords(AIRTABLE_PAGE_SECTIONS_TABLE);
};

export const getPeople = async () => {
  return await getRecords(AIRTABLE_PEOPLE_TABLE, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Order' },
    ]
  });
};

export const getProjects = async () => {
  return await getRecords(AIRTABLE_PROJECTS_TABLE, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ],
  });
};

export const getProjectAttachments = async () => {
  return await getRecords(AIRTABLE_PROJECT_ATTACHMENTS_TABLE, {
    filterByFormula: "{Status} = 'Published'",
    sort: [
      { field: 'Name' },
    ],
  });
};

export const getTextBlocks = async () => {
  return await getRecords(AIRTABLE_TEXT_BLOCKS_TABLE);
};
