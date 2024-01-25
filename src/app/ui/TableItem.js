"use client"
import Link from 'next/link';

export default function TableItem({ problem }) {
  return (
    <Link href={`/id/${problem.problemId}`} className="">
        <li className="grid grid-cols-3 gap-4 p-4">
            <h2 className="text-left">{problem.problemId}</h2>
            <h3 className="text-center">{problem.name}</h3>
            <p className="text-right">{problem.difficulty}</p>
        </li>
    </Link>
  )
}