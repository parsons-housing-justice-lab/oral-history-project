import Airtable from "airtable";
import {
  AIRTABLE_API_KEY,
  AIRTABLE_DATABASE_ID,
  AIRTABLE_INTERVIEWS_TABLE,
  AIRTABLE_PROJECTS_TABLE,
  AIRTABLE_TEXT_BLOCKS_TABLE,
} from "@/constants";

const getRecords = async (table, progressCallback) => {
  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_DATABASE_ID);

  return new Promise((resolve, reject) => {
    let allRecords = [];

    base(table).select({ maxRecords: 2500 })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(records);
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

export const getInterviews = async () => {
  // TODO only published
  return await getRecords(AIRTABLE_INTERVIEWS_TABLE);
};

export const getProjects = async () => {
  // TODO only published
  return await getRecords(AIRTABLE_PROJECTS_TABLE);
};

export const getTextBlocks = async () => {
  return await getRecords(AIRTABLE_TEXT_BLOCKS_TABLE);
};
