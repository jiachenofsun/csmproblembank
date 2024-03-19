"use client"
import ProblemForm from "@/app/ProblemForm"
import { useState, useEffect } from "react"
import "@/app/ui/globals.css"

export default function EditProblem({ params }) {
  const [isLoading, setIsLoading] = useState(true)
  const [problem, setProblem] = useState()

  async function getProblem() {
    const response = await fetch(`/api/getProblem/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      params: { id: params.id }
    })
    if (!response.ok) {
      throw new Error(
        "Failed to get problem from database",
        response.statusText
      )
    } else {
      setProblem(await response.json())
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getProblem()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="loading-spinner-container px-4 py-3 mb-4 relative">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <ProblemForm initialState={problem} isEdit={true} />
      )}
    </>
  )
}
