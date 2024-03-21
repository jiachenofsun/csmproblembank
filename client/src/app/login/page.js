"use client"

import { authenticate } from "@/app/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { redirect } from "next/navigation"

export default function Page() {
  const [state, dispatch] = useFormState(authenticate, undefined)
  console.log("STATE: ", state)

  return (
    <form action={dispatch}>
      {state === "success" && redirect("/")}
      <input type="password" name="password" placeholder="Password" required />
      <div>{state && <p>{state}</p>}</div>
      <LoginButton />
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button aria-disabled={pending} type="submit">
      Login
    </button>
  )
}
