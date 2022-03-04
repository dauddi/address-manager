import React from 'react'
import { BiSad } from 'react-icons/bi';

const NoContactsFound = () => {
  return (
    <div className='flex flex-col justify-center items-center text-gray-500 font-extrabold ' >
      <BiSad className='text-5xl ' />
      <p>No Contacts Found</p>
    </div>
  )
}

export default NoContactsFound