import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Rent</span>
                    <span className='text-slate-700'>Smart</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text'
                placeholder='Search'
                className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <FaSearch className='text-slate-500' />
            </form>
            <ul className='space-x-6'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                { currentUser ? (
                    <li><img src={currentUser.avatar} alt={currentUser.name} className='w-7 h-7 rounded-full object-cover' /></li>
                ) : (
                    <li className='sm:inline text-slate-700 hover:underline'>Login</li>
                )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
