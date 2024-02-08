"use client"

import TableItem from "./ui/TableItem.js"
import React, { useState, useEffect } from 'react'
import "@/app/ui/globals.css"
import { getDifficultyStyles } from "@/app/ui/utils.js"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


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

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('problemId', {
      header: () => <span>ID</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => <p className="text-left">{info.getValue()}</p>,
    }),
    columnHelper.accessor('difficulty', {
      header: () => 'Difficulty',
      cell: info => <span className={`inline-block ${getDifficultyStyles(info.getValue())}`}>{info.getValue()}</span>,
    }),
    columnHelper.accessor('topics', {
      header: () => 'Topics',
      cell: info => info.getValue().map((topic) => (
        <span className='bg-blue-200 rounded px-2 py-1 mr-2' key={topic}>{topic}</span>
      )),
    }),
    // TODO: add resourceLinks grouping. WE ONLY CARE WHETHER EACH LINK EXISTS OR NOT
    // Resources
    // M | S | V
  ]
  
  const table = useReactTable({
    data: problems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="flex flex-col flex-grow items-center p-12">
      {isLoading && (
        <div className="loading-spinner-container px-4 py-3 mb-4 relative">
            <div className="loading-spinner"></div>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="text-5xl font-bold text-center mb-12 text-csmGreen">
            CSM Problem Bank
          </div>

          <ul className="divide-y divide-gray-200 shadow">
            <li className="grid grid-cols-[auto_minmax(0,2fr)_auto] gap-8 p-4 font-bold bg-gray-100">
              <div className="text-left">ID</div>
              <div className="text-center">Name</div>
              <div className="text-right">Difficulty</div>
            </li>
            {problems.map(({ _id, ...problem }) => (
              <TableItem key={problem.problemId} problem={problem} />
            ))}
          </ul>


          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </main>
  )
}