import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Router from 'next/router';
import { checkCookies } from 'cookies-next';


const Register = () => {
  const [registerCredentials, setRegisterCredentials] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  if (isAuth) {
    Router.push('/')
  }

  useEffect(() => {
    const isUserCookiePresent = checkCookies("user");
    setIsAuth(isUserCookiePresent);
  }, [])

  const handleFullnameInput = (event) => {
    setRegisterCredentials({...registerCredentials, fullname: event.target.value})
  };
  const handleEmailInput = (event) => {
    setRegisterCredentials({...registerCredentials, email: event.target.value})
  };
  const handlePasswordInput = (event) => {
    setRegisterCredentials({...registerCredentials, password: event.target.value})
  };
  const handleRegistration = async (event) => {
    event.preventDefault();
    const names = registerCredentials.fullname.trim().split(" ");
    const firstName = names[0];
    const lastName = names.pop();

    const data = {firstName, lastName, ...registerCredentials}

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      setTimeout(() => Router.push('/auth/login'), 200);
    } else {
      console.log("Register Failed", response.status);
    }
  };

  return !isAuth && (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center " >
      <form onSubmit={handleRegistration} className='w-full flex flex-col justify-center items-center gap-8' action="submit">
        <h1 className='text-indigo-800 font-extrabold '> Get a free Account </h1>
        <input onChange={handleFullnameInput} className="p-3 rounded-md border-2 border-indigo-200 focus:outline-indigo-400  "  type="text" placeholder='full name' />
        <input onChange={handleEmailInput} className="p-3 rounded-md border-2 border-indigo-200 focus:outline-indigo-400  "  type="email" placeholder='jondoe@email.com' />
        <input onChange={handlePasswordInput} className="p-3 rounded-md border-2 border-indigo-200 focus:outline-indigo-400  " type="password" placeholder='********' />
        <button className='bg-indigo-500 text-white py-2 px-4 rounded-md font-bold hover:bg-indigo-600' type='submit' >
          Register
        </button>
      </form>
      <div className='mt-5 text-gray-600' >
        Already have an account?
        <span className='text-purple-900 font-semibold ' >
          <Link href="/auth/login" > Login </Link>
        </span>
      </div>
    </div>
  )
}

export default Register;