import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  return JSON.parse(readFileSync('./public/content/locations.json'));
})
