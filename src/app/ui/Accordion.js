import { useState, useRef, useEffect } from 'react'

export default function Accordion({ values, onClickFn }) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const toggleAccordion = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current 
        && !buttonRef.current.contains(event.target) 
        && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    // cleanup on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isOpen])

  return (
    <div className="w-full relative">
      <button ref={buttonRef} onClick={toggleAccordion} className="w-2/3 h-4 bg-white border shadow rounded" >
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="absolute z-10 w-full bg-white shadow-md max-h-72 overflow-y-auto">
          <ul>
            {values.map((value) => (
                <li 
                key={value} 
                onClick={() => onClickFn(value, toggleAccordion)} 
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