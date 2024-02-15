export function getDifficultyStyles(difficulty) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500 text-white rounded px-2 py-1';
    case 'Medium':
      return 'bg-yellow-500 text-white rounded px-2 py-1';
    case 'Hard':
      return 'bg-red-500 text-white rounded px-2 py-1';
    default:
      return 'bg-gray-500 text-white rounded px-2 py-1';
  }
}

export function getResourceLinkStyles(link) {
  if (link) {
    return 'bg-green-500';
  }
  else {
    return 'bg-gray-500';
  }
}

export function getColumnWidth(header) {
  switch (header()) {
    case 'ID':
      return '';
    case 'Name':
      return 'w-4/5 sm:w-1/3';
    case 'Topics':
      return 'w-1/2 hidden sm:table-cell';
    default:
      return 'hidden sm:table-cell';
  }
}