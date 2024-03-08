import clientPromise from "@/app/lib/mongodb.js"
import { promises as fs } from 'fs'

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("problembank")

        const fd = await req.formData()
        const fields = {
            problemId: parseInt(fd.get('problemId'), 10),
            name: fd.get('name'),
            difficulty: fd.get('difficulty'),
            texFile: fd.get('texFile'),
            topics: JSON.parse(fd.get('topics')),
            resourceLinks: {
                meta: fd.get('resourceLinks[meta]'),
                slides: fd.get('resourceLinks[slides]'),
                video: fd.get('resourceLinks[video]')
            }
        };
        const existingEntry = await db.collection("problems").findOne({ problemId: fields.problemId })
        if (existingEntry) {
            return new Response(`Unable to insert problem ${fields.problemId} as entry already exists`,
            { status: 422, statusText: `Problem ID ${fields.problemId} already exists` })
        }

        const file = fields.texFile
        if (file && file.size > 0) {
            const stream = file.stream()
            const chunks = []
            for await (const chunk of stream) {
                chunks.push(chunk)
            }
            fields.texFile = Buffer.concat(chunks)
        }

        const result = await db.collection("problems").insertOne(fields)
        return new Response(`Document inserted with _id: ${result.insertedId}`,
        { status: 200, statusText: `Problem ID ${fields.problemId} inserted into database` })
    } catch (e) {
        console.error(e)
        return new Response("Server error processing the request.",
        { status: 500, statusText: "Server error processing the request." })
    }
}