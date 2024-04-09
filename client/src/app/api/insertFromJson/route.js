import clientPromise from "@/app/lib/mongodb.js"
import { readFile } from "fs/promises"

export async function POST(_) {
  try {
    const client = await clientPromise
    const db = client.db("problembank")

    let fileContent = await readFile(
      process.cwd() + "/src/app/lib/data.json",
      "utf8"
    )
    const data = JSON.parse(fileContent)
    for (let [, item] of Object.entries(data)) {
      await db.collection("problems").insertOne(item)
    }

    return new Response(`Success`, {
      status: 200,
      statusText: `Problems inserted`
    })
  } catch (e) {
    console.error(e)
    return new Response("Server error processing the request.", {
      status: 500,
      statusText: "Server error processing the request."
    })
  }
}
