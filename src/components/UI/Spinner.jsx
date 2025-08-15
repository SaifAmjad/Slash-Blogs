import React from 'react'

const Spinner = () => {
  return (
    <>
 <svg
  className="animate-spin h-6 w-6 text-white"
  viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    d="M25 5 A20 20 0 0 1 45 25"
  />
</svg>


    </>
  )
}

export default Spinner