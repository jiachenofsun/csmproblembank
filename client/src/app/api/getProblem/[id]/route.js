import clientPromise from "@/app/lib/mongodb.js"

export async function GET({ params }) {
  try {
    const client = await clientPromise
    const db = client.db("problembank")

    const id = parseInt(params.id)
    const result = await db.collection("problems").findOne({ problemId: id })
    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: "Successfully got problem"
    })
  } catch (e) {
    console.error(e)
  }
}
