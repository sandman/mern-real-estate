import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Register</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username'
        className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='Email'
        className='border p-3 rounded-lg' id='email' />
        <input type='password' placeholder='Password'
        className='border p-3 rounded-lg' id='password' />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Register</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login' className='text-slate-700 hover:underline'>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
    </div>
  )
}
