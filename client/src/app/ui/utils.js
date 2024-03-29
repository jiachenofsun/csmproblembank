export function getDifficultyStyles(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500 text-white rounded px-2 py-1"
    case "Medium":
      return "bg-yellow-500 text-white rounded px-2 py-1"
    case "Hard":
      return "bg-red-500 text-white rounded px-2 py-1"
    default:
      return "bg-gray-500 text-white rounded px-2 py-1"
  }
}

export function getResourceLinkStyles(link) {
  if (link) {
    return "bg-green-500"
  } else {
    return "bg-gray-500 pointer-events-none"
  }
}

export function getColumnWidth(header) {
  switch (header()) {
    case "ID":
      return ""
    case "Name":
      return "w-1/3 sm:w-2/5"
    case "Topics":
      return "hidden sm:table-cell sm:w-1/2"
    default:
      return "hidden sm:table-cell"
  }
}

export const topics = [
  "Skeleton Code",
  "Inheritance and DMS",
  "Polymorphism and Interfaces",
  "Comparators",
  "Pointers",
  "Abstract Data Types",
  "Linked Lists",
  "Asymptotics",
  "Binary Search Trees",
  "2-3 Trees",
  "Red-Black Trees",
  "Graph Traversals",
  "Minimum Spanning Trees",
  "Shortest Paths",
  "Disjoint Sets",
  "Heaps",
  "Hashing",
  "Comparison Sorts",
  "Counting Sorts",
  "Sort Runtimes"
  // ... add more topics if needed
]
