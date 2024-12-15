import uFuzzy from '@leeoniya/ufuzzy';
import { groupBy } from 'es-toolkit';
import { getExcerpt } from './get-excerpt';

const searchByField = (objs, field, queryText) => {
  const uf = new uFuzzy({});
  const fieldValues = objs.map(o => o[field]);

  const [idxs, info, order] = uf.search(fieldValues, queryText);

  if (idxs == null || idxs.length === 0) return [];

  const matches = order.map(i => {
    const index = info.idx[i];
    const value = fieldValues[info.idx[i]];
    const ranges = info.ranges[i];

    const { excerpt, min, max } = getExcerpt(value, ranges[0], ranges.slice(-1)[0]);
    let highlighted = uFuzzy.highlight(excerpt, ranges.map(v => v - min)).trim();

    if (min > 0) highlighted = '[...] ' + highlighted;
    if (max < value.length) highlighted = highlighted + ' [...]';

    return {
      index,
      field,
      highlighted,
      excerpt,
      min, 
    };
  });
  
  return matches;
};

const groupMatchingInterviews = (groupedMatches, projects, interviews) => {
  const matchingInterviews = Object.entries(groupedMatches)
    .map(([index, matches]) => {
      const interview = interviews[index];
      return {
        id: interview.Id,
        projects: interview.Projects,
        matches,
      };
    });

  return projects.map(project => {
    return {
      id: project.Id,
      interviews: matchingInterviews.filter(m => m.projects.includes(project.id)),
    };
  });
};

export const getNullSearch = (projects, interviews) => {
  const nullSearch = Object.fromEntries(
    interviews.map((interview, i) => ([i, []]))
  );
  return groupMatchingInterviews(nullSearch, projects, interviews);
};

export const searchProjects = (projects, interviews, queryText) => {
  const matches = [
    ...searchByField(interviews, 'Name', queryText),
    ...searchByField(interviews, 'Description', queryText),
    ...searchByField(interviews, 'Transcription', queryText),
  ];

  const groupedMatches = groupBy(matches, i => i.index);
  return groupMatchingInterviews(groupedMatches, projects, interviews);
};
