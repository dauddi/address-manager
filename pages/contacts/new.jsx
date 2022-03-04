import React, { useState, useEffect } from 'react'
import Router from 'next/router';
import { checkCookies, removeCookies, getCookie } from "cookies-next";

const NewContact = () => {
  const [newContactInput, setNewContactInput] = useState({});
  const [user, setUser] = useState({});
  let userData;

  if (checkCookies("user")) {
    userData = JSON.parse(getCookie("user"));
  } else {
    () => Router.push("/auth/login");
  }

  useEffect(() => {
    setUser(userData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNameInput = (event) => {setNewContactInput({...newContactInput, name: event.target.value})}
  const handlePhoneNumberInput = (event) => {setNewContactInput({...newContactInput, phoneNumber: event.target.value})}
  const handleAddressInput = (event) => {setNewContactInput({...newContactInput, address: event.target.value})}

  const handleAddContact = async (event) => {
		event.preventDefault();
		setNewContactInput({ ...newContactInput, creatorId: user.id })
		const response = await fetch("/api/contacts", {
			method: 'POST',
			body: JSON.stringify(newContactInput),
		})
    
		if (response.status !== 200) {
			console.log("something went wrong", response.status);
		} else {
			const data = await response.json();
      Router.push("/")
			console.log(data);
		}
	}

  return (
    <div className="max-w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] mx-auto mt-10   " >
      <form onSubmit={handleAddContact} className='flex flex-col mb-5 '  action="submit">
        <label className="text-gray-500 font-semibold" > Add New Contact </label>
        <input onChange={handleNameInput} className='mt-5 py-3 px-2 border-2 border-indigo-300 rounded-md font-semibold focus:outline-indigo-600 ' type="text" placeholder='full name' required />
        <input onChange={handlePhoneNumberInput} className='mt-5 py-3 px-2 border-2 border-indigo-300 rounded-md font-semibold focus:outline-indigo-600 ' type="text" placeholder='phone number' required />
        <input onChange={handleAddressInput} className='mt-5 py-3 px-2 border-2 border-indigo-300 rounded-md font-semibold focus:outline-indigo-600 ' type="text" placeholder='address' required />

        <button className="bg-indigo-500 text-white py-2 px-4 mt-5 w-full rounded-md font-bold hover:bg-indigo-600 " role="submit" >
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewContact;