import clientPromise from "@/app/lib/mongodb.js"

export async function GET(Request) {
    try {
        const client = await clientPromise
        const db = client.db("problembank")

        const result = await db
        .collection("problems")
        .find({})
        .sort({ problemId: 1 })
        .limit(20)
        .toArray()
        
        return new Response(JSON.stringify(result),
        { status: 200, statusText: "Successfully got problems" })
    } catch (e) {
        console.error(e)
    }
}