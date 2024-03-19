import clientPromise from "@/app/lib/mongodb.js"

export async function POST(req) {
  try {
    const client = await clientPromise
    const db = client.db("problembank")

    const fd = await req.formData()
    const fields = {
      problemId: parseInt(fd.get("problemId"), 10),
      name: fd.get("name"),
      difficulty: fd.get("difficulty"),
      texFile: fd.get("texFile"),
      topics: JSON.parse(fd.get("topics")),
      resourceLinks: {
        meta: fd.get("resourceLinks[meta]"),
        slides: fd.get("resourceLinks[slides]"),
        video: fd.get("resourceLinks[video]")
      }
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

    await db
      .collection("problems")
      .findOneAndReplace({ problemId: fields.problemId }, fields)
    return new Response(`Document with problemId ${fields.problemId} edited`, {
      status: 200,
      statusText: `Problem ID ${fields.problemId} edited`
    })
  } catch (e) {
    console.error(e)
    return new Response("Server error processing the request.", {
      status: 500,
      statusText: "Server error processing the request."
    })
  }
}
