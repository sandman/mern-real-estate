import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../components/OAuth';

export default function Register() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(
      { ...formData,
        [e.target.id]: e.target.value
      });
  };
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success  === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
    }
    catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Register</h1>
      <form onSubmit={handleSubmit}
        className='flex flex-col gap-4'>
        <input type='text' placeholder='Username'
        className='border p-3 rounded-lg' id='username'
        onChange={handleChange} />
        <input type='email' placeholder='Email'
        className='border p-3 rounded-lg' id='email'
        onChange={handleChange}/>
        <input type='password' placeholder='Password'
        className='border p-3 rounded-lg' id='password'
        onChange={handleChange} />
        <button disabled={loading} type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>
            {loading ? 'Loading...' : 'Register' }</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login' className='text-slate-700 hover:underline'>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
