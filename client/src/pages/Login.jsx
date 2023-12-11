import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Login() {

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(loginStart());
      const res = await fetch('/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success  === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/home');
    }
    catch (err) {
      useDispatch(loginFailure(err));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold'>Login</h1>
      <form onSubmit={handleSubmit}
        className='flex flex-col gap-4'>
        <input type='email' placeholder='Email'
        className='border p-3 rounded-lg' id='email'
        onChange={handleChange}/>
        <input type='password' placeholder='Password'
        className='border p-3 rounded-lg' id='password'
        onChange={handleChange} />
        <button disabled={loading} type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>
            {loading ? 'Loading...' : 'Sign In' }</button>
            <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/register' className='text-slate-700 hover:underline'>
          <span className='text-blue-700'>Register</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
