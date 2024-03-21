import "@/app/ui/globals.css"
import Table from "@/app/ui/Table"
import { GET as getProblems } from "@/app/api/getProblems/route"
import Link from "next/link"

export default async function Home() {
  const response = await getProblems(null)
  if (!response.ok) {
    throw new Error("Failed to get problems from database", response.statusText)
  }
  const problems = await response.json()

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      <div className="text-5xl font-bold text-center mb-12 text-csmGreen">
        CSM 61B Problem Bank
      </div>
      <Table problems={problems} />
      <Link
        href={`/add`}
        className="mt-12 inline-flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add New Problem
      </Link>
    </main>
  )
}
