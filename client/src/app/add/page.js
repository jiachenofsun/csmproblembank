import "@/app/ui/globals.css"
import ProblemForm from "@/app/ProblemForm"

export default function AddProblem() {
  const initialState = {
    problemId: "",
    name: "",
    difficulty: "Easy",
    texFile: null,
    topics: [],
    resourceLinks: {
      meta: "",
      slides: "",
      video: ""
    }
  }

  return <ProblemForm initialState={initialState} isEdit={false} />
}
