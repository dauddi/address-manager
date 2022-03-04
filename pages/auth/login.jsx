import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router';
import { setCookies, checkCookies } from 'cookies-next';

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  if (isAuth) {
    Router.push('/')
  }

  useEffect(() => {
    const isUserCookiePresent = checkCookies("user");
    setIsAuth(isUserCookiePresent);
  }, [])

  const handleEmailInput = (event) => {
    setLoginCredentials({...loginCredentials, email: event.target.value})
  }
  const handlePasswordInput = (event) => {
    setLoginCredentials({...loginCredentials, password: event.target.value})
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
    })

    if (response.status !== 200) {
      console.log("Something went wrong", response.status);
    } else {
      const data = await response.json();
      const { user } = data;
      console.log("Request Success", user);
      localStorage.setItem('user', JSON.stringify(user));
      setCookies("user", JSON.stringify(user));
      setTimeout(() => Router.push("/"), 200);
    }
  }

  return !isAuth && (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center " >
      <form onSubmit={handleLogin} className='w-full flex flex-col justify-center items-center gap-8 ' action="submit">
        <h1 className='text-indigo-800 font-extrabold ' >Login to continue</h1>
        <input onChange={handleEmailInput} className="p-3 rounded-md border-2 border-indigo-200 focus:outline-indigo-400  "  type="email" placeholder='jondoe@email.com' />
        <input onChange={handlePasswordInput} className="p-3 rounded-md border-2 border-indigo-200 focus:outline-indigo-400  " type="password" placeholder='********' />
        <button className='bg-indigo-500 text-white py-2 px-4 rounded-md font-bold hover:bg-indigo-600' type='submit' >
          Login
        </button>
      </form>
      <div className='mt-5 text-gray-600' >
        No account yet? 
        <span className='text-purple-900 font-semibold ' >
          <Link href="/auth/register" > Register </Link>
        </span>
      </div>
    </div>
  )
}

export default Login;