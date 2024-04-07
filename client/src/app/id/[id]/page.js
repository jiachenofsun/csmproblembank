import { getDifficultyStyles } from "@/app/ui/utils.js"
import "@/app/ui/globals.css"
import { GET as getProblem } from "@/app/api/getProblem/[id]/route"
import { getResourceLinkStyles } from "@/app/ui/utils.js"
import Link from "next/link"

export const revalidate = 30

export default async function Problem({ params }) {
  const response = await getProblem({ params: { id: params.id } })
  if (!response.ok) {
    throw new Error("Failed to get problem from database", response.statusText)
  }
  const problem = await response.json()

  function createLink(link) {
    if (link.startsWith("http")) {
      return link
    } else {
      return "https://" + link
    }
  }

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center my-4 text-csmGreen">
          {problem.problemId}: {problem.name}
        </h1>
        <div
          className={`text-3xl font-bold text-center my-4 text-csmGreen ${getDifficultyStyles(problem.difficulty)}`}
        >
          {problem.difficulty}
        </div>
        <h2 className="text-3xl font-bold text-center my-6 text-black">
          Topics:
        </h2>
        {problem.topics.map((topic) => (
          <span className="bg-blue-200 rounded px-2 py-1 mr-2" key={topic}>
            {topic}
          </span>
        ))}
        <h2 className="text-3xl font-bold text-center my-6 text-black">
          Links:
        </h2>
        <a
          href={createLink(problem.resourceLinks.meta) || ""}
          className={`text-white px-4 py-1 mb-4 rounded ${getResourceLinkStyles(problem.resourceLinks.meta)}`}
        >
          Meta
        </a>
        <a
          href={createLink(problem.resourceLinks.slides) || ""}
          className={`text-white px-4 py-1 mb-4 rounded ${getResourceLinkStyles(problem.resourceLinks.slides)}`}
        >
          Slides
        </a>
        <a
          href={createLink(problem.resourceLinks.video) || ""}
          className={`text-white px-4 py-1 mb-4 rounded ${getResourceLinkStyles(problem.resourceLinks.video)}`}
        >
          Video
        </a>
        <Link
          href={`/edit/${params.id}`}
          className="mt-12 inline-flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Problem
        </Link>
      </div>
    </main>
  )
}
