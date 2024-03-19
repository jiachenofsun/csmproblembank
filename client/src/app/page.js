import "@/app/ui/globals.css"
import Table from "@/app/ui/Table"
import { GET as getProblems } from "@/app/api/getProblems/route"

export default async function Home() {
  const response = await getProblems(null)
  if (!response.ok) {
    throw new Error("Failed to get problems from database", response.statusText)
  }
  const problems = await response.json()

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      <div className="text-5xl font-bold text-center mb-12 text-csmGreen">
        CSM Problem Bank
      </div>
      <Table problems={problems} />
    </main>
  )
}
