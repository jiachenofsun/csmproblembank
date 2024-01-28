"use client"

import React, { useState, useRef } from 'react';

export default function AddProblem() {
    const [selectedTopics, setSelectedTopics] = useState([])
    const problemIdRef = useRef()
    const nameRef = useRef()
    const difficultyRef = useRef()
    const metaRef = useRef()
    const slidesRef = useRef()
    const videoRef = useRef()

    const topics = [
        "Inheritance and DMS",
        "Polymorphism and Interfaces",
        "Comparators", 
        // ... add the rest of your topics
        ]
    
    const deleteFromSelectedTopics = (topic) => {
        setSelectedTopics(prev => {
            return prev.filter(t => t !== topic)
        })
      }

    const handleTopicClick = (topic) => {
    setSelectedTopics(prev => {
        if (prev.includes(topic)) {
        return prev
        } else {
        return [...prev, topic]
        }
    })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setErrIsOpen(false)
        if (!problemIdRef.current.value || !nameRef.current.value) {
            console.error('Problem ID and Name are required.')
            setErrIsOpen(true)
            return
          }
        const formData = {
            problemId: problemIdRef.current.value,
            name: nameRef.current.value,
            difficulty: difficultyRef.current.value,
            selectedTopics,
            resourceLinks: {
                meta: metaRef.current.value,
                slides: slidesRef.current.value,
                video: videoRef.current.value
            }
        }
        console.log('Form Data:', JSON.stringify(formData, null, 2));
    }

    const [errIsOpen, setErrIsOpen] = useState(false)

    return (
    <form id="addProblemForm" className="mx-auto my-8 p-6 rounded lg:min-w-[40%]">
        {errIsOpen && (
            <div className="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                <span className=""><b>Error</b>: Problem ID and Name are required. </span>
                <span className="cursor-pointer" onClick={() => setErrIsOpen(false)}>x</span>
            </div>
        )}

        <div className="mb-4">
            <label htmlFor="problemId" className="block text-sm font-medium text-gray-700">Problem ID:</label>
            <input type="number" id="problemId" name="problemId" ref={problemIdRef} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" name="name" ref={nameRef} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>

        <div className="mb-4">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty:</label>
            <select id="difficulty" name="difficulty" ref={difficultyRef} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>

        <div className="mb-4">
            <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics:</label>
            {selectedTopics.map(topic => (
                <span
                key={topic}
                className="inline-block bg-csmGreen rounded-md px-2 py-1 mr-2"> {topic} 
                    <span
                    onClick={() => deleteFromSelectedTopics(topic)}
                    className="text-red-500 ml-1 cursor-pointer"> x
                    </span>
                </span>
            ))}
            <ul className="border border-gray-300 rounded-md mt-2">
            {topics.map(topic => (
                <li
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`p-2 cursor-pointer ${selectedTopics.includes(topic) ? 'bg-gray-100' : ''}`}
                >
                {topic}
                </li>
            ))}
            </ul>
        </div>

        <fieldset className="mb-4">
            <legend className="block text-sm font-medium text-gray-700">Resource Links:</legend>
            <div className="mt-2">
                <label htmlFor="linkMeta" className="block text-sm font-medium text-gray-700">Meta Link:</label>
                <input type="url" id="linkMeta" name="resourceLinks[meta]" ref={metaRef} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mt-2">
                <label htmlFor="linkSlides" className="block text-sm font-medium text-gray-700">Slides Link:</label>
                <input type="url" id="linkSlides" name="resourceLinks[slides]" ref={slidesRef} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mt-2">
                <label htmlFor="linkVideo" className="block text-sm font-medium text-gray-700">Video Link:</label>
                <input type="url" id="linkVideo" name="resourceLinks[video]" ref={videoRef} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
        </fieldset>

        <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Problem
        </button>
    </form>
    )
}