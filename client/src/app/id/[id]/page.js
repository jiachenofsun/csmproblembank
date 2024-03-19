import { getDifficultyStyles } from "@/app/ui/utils.js"
import "@/app/ui/globals.css"
import { GET as getProblem } from "@/app/api/getProblem/[id]/route"

export default async function Problem({ params }) {
  const response = await getProblem({ params: { id: params.id } })
  if (!response.ok) {
    throw new Error("Failed to get problem from database", response.statusText)
  }
  const problem = await response.json()

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      <div>
        <div className="text-5xl font-bold text-center my-4 text-csmGreen">
          {problem.problemId}: {problem.name}
        </div>

        <div
          className={`text-3xl font-bold text-center my-4 text-csmGreen ${getDifficultyStyles(problem.difficulty)}`}
        >
          {problem.difficulty}
        </div>
      </div>
    </main>
  )
}
