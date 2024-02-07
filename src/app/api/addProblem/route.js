import clientPromise from "@/app/lib/mongodb.js"

export async function POST(Request) {
    try {
        const client = await clientPromise
        const db = client.db("problembank")
        const reader = Request.body.getReader()
        let chunks = '';

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            chunks += new TextDecoder("utf-8").decode(value)
        }

        console.log(JSON.parse(chunks)) 

        // const result = await db.collection("problems").insertOne(Request.body)

        return new Response(`Success`)

        return new Response(`Document inserted with _id: ${result.insertedId}`)
    } catch (e) {
        console.error(e)
    }
}