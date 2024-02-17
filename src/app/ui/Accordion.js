import { useState } from 'react'

export default function Accordion({ values, onClickFn }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div className="w-full relative">
      <button onClick={toggleAccordion} className="w-2/3 h-4 bg-white border shadow rounded">
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white shadow-md max-h-72 overflow-y-auto">
          <ul>
            {values.map((value) => (
                <li 
                key={value} 
                onClick={() => onClickFn(value)} 
                className="cursor-pointer hover:bg-gray-100"
                >
                    {value}
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}