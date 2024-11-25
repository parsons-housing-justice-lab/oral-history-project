import uFuzzy from '@leeoniya/ufuzzy';

const searchProjectTitles = (projects, queryText) => {
  const uf = new uFuzzy({});
  const projectTitles = projects.map(p => p.Name);

  const idxs = uf.filter(projectTitles, queryText);

  // TODO more generic
  if (idxs != null && idxs.length > 0) {
    let info = uf.info(idxs, projectTitles, queryText);

    // order is a double-indirection array (a re-order of the passed-in idxs)
    // this allows corresponding info to be grabbed directly by idx, if needed
    let order = uf.sort(info, projectTitles, queryText);

    // render post-filtered & ordered matches
    // TODO return indices instead
    for (let i = 0; i < order.length; i++) {
      // using info.idx here instead of idxs because uf.info() may have
      // further reduced the initial idxs based on prefix/suffix rules
      console.log(info.idx[order[i]], projectTitles[info.idx[order[i]]]);
    }
  }
  else {
    // render pre-filtered but unordered matches
    for (let i = 0; i < idxs.length; i++) {
      console.log(projectTitles[idxs[i]]);
    }
  }
};

export const searchProjects = (projects, interviews, queryText) => {
  console.log(projects, interviews, queryText);
  searchProjectTitles(projects, queryText);

  // TODO search interviews, bundle results for display
  //  * name
  //  * description
  //  * transcription
  return [];
};
