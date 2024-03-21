"use server"
import { cookies } from "next/headers"

export async function authenticate(_currentState, formData) {
  try {
    await signIn(formData.get("password"))
    return "success"
  } catch (error) {
    if (error) {
      return error.message
    }
  }
  throw error
}

async function signIn(password) {
  if (password != process.env.SECRET_PASSWORD) {
    throw new Error("Invalid Credentials")
  }
  cookies().set("session", "dummy value", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/"
  })
  return
}
