import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  return JSON.parse(readFileSync('./public/content/textBlocks.json'));
})
