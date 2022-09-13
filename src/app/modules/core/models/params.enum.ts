export enum PARAMS  {
  populate = 'populate',
  byCategoryId = 'filters[category][id]',
  byCategoryName = 'filters[category][name]'
}

export enum PAGINATION {
  page = 'pagination[page]', // Default 1
  pageSize = 'pagination[pageSize]', // Default 25
  withCount = 'pagination[withCount]' // Default True
}
