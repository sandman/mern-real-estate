import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col'>
        <img src={currentUser.avatar} alt={currentUser.name} className='w-24 h-24 rounded-full object-cover cursor-pointer mx-auto self-center mt-2' />
        <input type='text' placeholder='Name' className='border rounded-lg p-3 my-2' id='username' />
        <input type='email' placeholder='Email' className='border rounded-lg p-3 my-2' id='email' />
        <input type='text' placeholder='Password' className='border rounded-lg p-3 my-2' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 my-2 hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Logout</span>
      </div>
    </div>
  )
}
