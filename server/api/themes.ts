import { readFileSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  const themes = JSON.parse(readFileSync('./public/content/themes.json'));
  const subthemes = JSON.parse(readFileSync('./public/content/subthemes.json'));

  return themes.map(theme => {
    return {
      id: theme.id,
      name: theme.Name,
      order: theme.Order,
      subthemes: theme.subthemes.map(subthemeId => {
        const found = subthemes.find(s => s.id === subthemeId);
        if (!found) return null;
        return {
          name: found.Name,
          id: found.id,
        };
      })
      .filter(v => !!v)
      .sort((a, b) => a.name.localeCompare(b.name)),
    };
  }).sort((a, b) => a.order - b.order);
})
