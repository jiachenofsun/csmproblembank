"use client"

import { getDifficultyStyles } from "@/app/ui/utils.js"
import React, { useState, useEffect } from 'react'
import "@/app/ui/globals.css"

export default function Problem({ params }) {
  const [isLoading, setIsLoading] = useState(true)
  const [problem, setProblem] = useState()

  async function getProblem() {
    const response = await fetch(`/api/getProblem/${params.id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
      params: {id: params.id}
    })
    if (!response.ok) {
      throw new Error("Failed to get problem from database", response.statusText)
    } 
    else {
      setProblem(await response.json())
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getProblem()
  }, [])

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      {isLoading && (
      <div className="loading-spinner-container px-4 py-3 mb-4 relative">
          <div className="loading-spinner"></div>
      </div>
      )}
      {!isLoading && (
        <div>
          <div className="text-5xl font-bold text-center my-4 text-csmGreen">
            {problem.problemId}: {problem.name}
          </div>

          <div className={`text-3xl font-bold text-center my-4 text-csmGreen ${getDifficultyStyles(problem.difficulty)}`}>
            {problem.difficulty}
          </div>
        </div>
      )}
    </main>
  )
    
  }