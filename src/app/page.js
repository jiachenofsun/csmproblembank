import clientPromise from "./lib/mongodb.js";
import TableItem from "./ui/TableItem.js"


export default async function Home() {
  const problems = await getProblems()
  return (
    <main className="flex flex-col flex-grow items-center p-24">
      <div className="text-5xl font-bold text-center my-4 text-csmGreen">
        CSM Problem Bank
      </div>

      <ul className="divide-y divide-gray-200 shadow">
        <li className="grid grid-cols-3 gap-4 p-4 font-bold bg-gray-100">
          <div className="text-left">Problem ID</div>
          <div className="text-center">Name</div>
          <div className="text-right">Difficulty</div>
        </li>
        {problems.map(({ _id, ...problem }) => (
          <TableItem key={problem.problemId} problem={problem} />
        ))}
      </ul>

    </main>
  );
}

export async function getProblems() {
  try {
      const client = await clientPromise;
      const db = client.db("problembank");

      const problems = await db
          .collection("problems")
          .find({})
          .sort({ problemId: 1 })
          .limit(20)
          .toArray();

      return problems;
  } catch (e) {
      console.error(e);
  }
}