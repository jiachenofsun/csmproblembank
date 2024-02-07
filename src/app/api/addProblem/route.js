import clientPromise from "@/app/lib/mongodb.js"

export async function POST(Request) {
    try {
        const client = await clientPromise
        const db = client.db("problembank")
        const reader = Request.body.getReader()
        let chunks = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            chunks += new TextDecoder("utf-8").decode(value)
        }

        const formData = JSON.parse(chunks)
        console.log("Parsed JSON formData: \n", formData)

        // Check for duplicate problemId
        const existingEntry = await db.collection("problems").findOne({problemId: formData.problemId})
        if (existingEntry) {
            return new Response(`Unable to insert problem ${formData.problemId} as entry already exists`,
            { status: 422, statusText: `Problem ID ${formData.problemId} already exists` })
        }

        const result = await db.collection("problems").insertOne(formData)
        return new Response(`Document inserted with _id: ${result.insertedId}`,
        { status: 200, statusText: `Problem ID ${formData.problemId} inserted into database` })
    } catch (e) {
        console.error(e)
    }
}