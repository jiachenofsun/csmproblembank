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