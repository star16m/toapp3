import i18n from '@/plugins/i18n';

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = [];
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg));
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map(error => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`));
      });
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`));
    }
    return errorArray;
  }
  // all good, return null
  return null;
};

export const buildPayloadPagination = (pagination, search) => {
  const { sortBy, page, rowsPerPage } = pagination;
  let { descending } = pagination;
  // Gets order
  descending = descending ? -1 : 1;

  let query = {};

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
      filter: search.query,
      fields: search.fields,
    };
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
    };
  }
  return query;
};
