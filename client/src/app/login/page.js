"use client"

import { authenticate } from "@/app/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { redirect } from "next/navigation"

export default function Page() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  return (
    <main className="flex flex-col flex-grow items-center justify-center p-12">
      <form action={dispatch} className="flex flex-col items-center">
        {state === "success" && redirect("/")}
        <h1 className="text-3xl text-center font-bold mb-8">
          What's the secret password?
        </h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-8"
        />
        {/* Displaying error message */}
        <div className="mb-8 font-bold text-red-600">
          {state && <p>{state}</p>}
        </div>
        <LoginButton />
      </form>
    </main>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Login
    </button>
  )
}
