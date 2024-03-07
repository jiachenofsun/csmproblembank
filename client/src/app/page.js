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
      console.log('getting problems...')
      const problems = await response.json()
      setProblems(problems)
      console.log('loading done')
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
          <Table problems={problems} />
        </>
      )}
    </main>
  )
}