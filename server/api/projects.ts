import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  const projects = JSON.parse(readFileSync('./public/content/projects.json'));

  return projects.map(p => ({
    ...p,
    Site: p.Site.startsWith('http') ? p.Site : `https://${p.Site}`,
  }));
});
