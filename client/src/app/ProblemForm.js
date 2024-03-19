"use client"
import { useState, useRef, useEffect } from "react"
import "@/app/ui/globals.css"
import { topics } from "@/app/ui/utils.js"

export default function ProblemForm({ initialState, isEdit }) {
  console.log("INITIAL STATE", initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState([])

  const problemIdRef = useRef()
  const nameRef = useRef()
  const difficultyRef = useRef()
  const metaRef = useRef()
  const slidesRef = useRef()
  const videoRef = useRef()
  const latexRef = useRef()

  useEffect(() => {
    problemIdRef.current.value = initialState.problemId
    nameRef.current.value = initialState.name
    difficultyRef.current.value = initialState.difficulty
    latexRef.current.value = null
    setSelectedTopics([...initialState.topics])
    metaRef.current.value = initialState.resourceLinks.meta
    slidesRef.current.value = initialState.resourceLinks.slides
    videoRef.current.value = initialState.resourceLinks.video
  }, [])

  const handleTopicClick = (topic) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev
      } else {
        return [...prev, topic]
      }
    })
  }
  const deleteFromSelectedTopics = (topic) => {
    setSelectedTopics((prev) => {
      return prev.filter((t) => t !== topic)
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrIsOpen(false)
    setSuccessIsOpen(false)
    setIsLoading(true)

    if (!problemIdRef.current.value || !nameRef.current.value) {
      setErrIsOpen(true)
      setErrText("Problem ID and Name are required.")
      return
    }
    const formData = new FormData()
    formData.append("problemId", problemIdRef.current.value)
    formData.append("name", nameRef.current.value)
    formData.append("difficulty", difficultyRef.current.value)
    formData.append("topics", JSON.stringify(selectedTopics))
    if (latexRef.current.files[0]) {
      formData.append("texFile", latexRef.current.files[0])
    } else {
      formData.append("texFile", null)
    }
    formData.append("resourceLinks[meta]", metaRef.current.value)
    formData.append("resourceLinks[slides]", slidesRef.current.value)
    formData.append("resourceLinks[video]", videoRef.current.value)

    const response = await fetch("/api/addProblem", {
      method: "POST",
      body: formData
    })
    setIsLoading(false)

    if (!response.ok) {
      setErrIsOpen(true)
      setErrText(`${response.statusText} (HTTP status code ${response.status})`)
    } else {
      setSuccessIsOpen(true)
      setSuccessText(`${response.statusText}`)
      clearFormData()
    }
  }

  const [errIsOpen, setErrIsOpen] = useState(false)
  const [errText, setErrText] = useState("")

  const [successIsOpen, setSuccessIsOpen] = useState(false)
  const [successText, setSuccessText] = useState("")

  function clearFormData() {
    problemIdRef.current.value = ""
    nameRef.current.value = ""
    difficultyRef.current.value = "Easy"
    latexRef.current.value = null
    setSelectedTopics([])
    metaRef.current.value = ""
    slidesRef.current.value = ""
    videoRef.current.value = ""
  }
  return (
    <form
      id="addProblemForm"
      className="mx-auto my-8 p-6 rounded lg:min-w-[40%]"
    >
      {isLoading && (
        <div className="loading-spinner-container px-4 py-3 mb-4 relative">
          <div className="loading-spinner"></div>
        </div>
      )}

      {errIsOpen && (
        <div
          className="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
          role="alert"
        >
          <span className="">
            <b>Error</b>: {errText}{" "}
          </span>
          <span className="cursor-pointer" onClick={() => setErrIsOpen(false)}>
            x
          </span>
        </div>
      )}

      {successIsOpen && (
        <div
          className="flex justify-between bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative"
          role="alert"
        >
          <span className="">
            <b>Success!</b> {successText}{" "}
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setSuccessIsOpen(false)}
          >
            x
          </span>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="problemId"
          className="block text-sm font-medium text-gray-700"
        >
          Problem ID:
        </label>
        {isEdit ? (
          <p
            ref={problemIdRef}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            {problemIdRef.current && problemIdRef.current.value}
          </p>
        ) : (
          <input
            type="number"
            id="problemId"
            name="problemId"
            ref={problemIdRef}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
          />
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRef}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="difficulty"
          className="block text-sm font-medium text-gray-700"
        >
          Difficulty:
        </label>
        <select
          id="difficulty"
          name="difficulty"
          ref={difficultyRef}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="latexFile"
          className="block text-sm font-medium text-gray-700"
        >
          LaTeX File:
        </label>
        <input
          type="file"
          id="latexFile"
          name="latexFile"
          ref={latexRef}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          accept=".tex"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="topics"
          className="block text-sm font-medium text-gray-700"
        >
          Topics:
        </label>
        {selectedTopics.map((topic) => (
          <span
            key={topic}
            className="inline-block bg-csmGreen rounded-md px-2 py-1 mr-2"
          >
            {" "}
            {topic}
            <span
              onClick={() => deleteFromSelectedTopics(topic)}
              className="text-red-500 ml-1 cursor-pointer"
            >
              {" "}
              x
            </span>
          </span>
        ))}
        <ul className="border border-gray-300 rounded-md mt-2">
          {topics.map((topic) => (
            <li
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`p-2 cursor-pointer ${selectedTopics.includes(topic) ? "bg-gray-100" : ""}`}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <fieldset className="mb-4">
        <legend className="block text-sm font-medium text-gray-700">
          Resource Links:
        </legend>
        <div className="mt-2">
          <label
            htmlFor="linkMeta"
            className="block text-sm font-medium text-gray-700"
          >
            Meta Link:
          </label>
          <input
            type="url"
            id="linkMeta"
            name="resourceLinks[meta]"
            ref={metaRef}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="linkSlides"
            className="block text-sm font-medium text-gray-700"
          >
            Slides Link:
          </label>
          <input
            type="url"
            id="linkSlides"
            name="resourceLinks[slides]"
            ref={slidesRef}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="linkVideo"
            className="block text-sm font-medium text-gray-700"
          >
            Video Link:
          </label>
          <input
            type="url"
            id="linkVideo"
            name="resourceLinks[video]"
            ref={videoRef}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Problem
      </button>
    </form>
  )
}
