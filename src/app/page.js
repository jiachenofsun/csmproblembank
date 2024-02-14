"use client"

import React, { useState, useEffect } from 'react'
import "@/app/ui/globals.css"
import Table from "@/app/ui/Table"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [problems, setProblems] = useState([])

  async function getProblems() {
    const response = await fetch('/api/getProblems', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error("Failed to get problems from database", response.statusText)
    } 
    else {
      const problems = await response.json()
      setProblems(problems)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getProblems()
  }, [])

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      {isLoading && (
        <div className="loading-spinner-container px-4 py-3 mb-4 relative">
            <div className="loading-spinner"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="text-5xl font-bold text-center mb-12 text-csmGreen">
            CSM Problem Bank
          </div>
          {/* <ul className="divide-y divide-gray-200 shadow">
            <li className="grid grid-cols-[auto_minmax(0,2fr)_auto] gap-8 p-4 font-bold bg-gray-100">
              <div className="text-left">ID</div>
              <div className="text-center">Name</div>
              <div className="text-right">Difficulty</div>
            </li>
            {problems.map(({ _id, ...problem }) => (
              <TableItem key={problem.problemId} problem={problem} />
            ))}
          </ul> */}
          <Table problems={problems} />
        </>
      )}
    </main>
  )
}