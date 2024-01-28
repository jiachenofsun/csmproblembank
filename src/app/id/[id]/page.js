import clientPromise from "../../lib/mongodb.js";
import { getDifficultyStyles } from "@/app/ui/utils.js";

export default async function Problem({ params }) {
  const problem = await getProblem(params.id)
    return (
      <main className="flex flex-col flex-grow items-center p-12">
        <div className="text-5xl font-bold text-center my-4 text-csmGreen">
          {problem.problemId}: {problem.name}
        </div>

        <div className={`text-3xl font-bold text-center my-4 text-csmGreen ${getDifficultyStyles(problem.difficulty)}`}>
          {problem.difficulty}
        </div>

      </main>
    )
    
  }

export async function getProblem(id) {
  try {
      const client = await clientPromise;
      const db = client.db("problembank");

      const problem = await db
          .collection("problems")
          .findOne({problemId: parseInt(id)});

      return problem;
  } catch (e) {
      console.error(e);
  }
}