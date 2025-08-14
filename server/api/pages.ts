import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  const pages = JSON.parse(readFileSync('./public/content/pages.json'));
  const pageSections = JSON.parse(readFileSync('./public/content/pageSections.json'));

  return pages.map(page => {
    const sections = (
      page['page sections']
        ?.map(pageSection => pageSections.find(p => p.id === pageSection))
        ?? []
    ).sort((a, b) => a.Order - b.Order);
    return { ...page, sections };
  });
});
