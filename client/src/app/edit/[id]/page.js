import ProblemForm from "@/app/ProblemForm"
import "@/app/ui/globals.css"
import { GET as getProblem } from "@/app/api/getProblem/[id]/route"

export default async function EditProblem({ params }) {
  const response = await getProblem({ params: { id: params.id } })
  if (!response.ok) {
    throw new Error("Failed to get problem from database", response.statusText)
  }
  const problem = await response.json()

  return <ProblemForm initialState={problem} isEdit={true} />
}
