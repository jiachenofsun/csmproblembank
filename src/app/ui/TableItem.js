"use client"
import Link from 'next/link'
import { getDifficultyStyles } from "@/app/ui/utils.js"

export default function TableItem({ problem }) {
  
  return (
    <Link href={`/id/${problem.problemId}`}>
      <li className="grid grid-cols-[auto_minmax(0,2fr)_auto] gap-8 p-4">
        <h2 className="text-left">{problem.problemId}</h2>
        <h3 className="text-left">{problem.name}</h3>
        <p className={`inline-block text-right ${getDifficultyStyles(problem.difficulty)}`}>{problem.difficulty}</p>
      </li>
    </Link>
  )
}