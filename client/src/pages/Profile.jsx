import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [ file, setFile ] = useState(undefined);
  const [ filePercent, setFilePercent ] = useState(0);
  const [ fileUploadError, setFileUploadError ] = useState(false);
  const [ formData, setFormData ]  = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload()
    }
  }, [file]);

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setFilePercent(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
          console.log('File available at', downloadURL);
        });
        console.log('Upload is complete!');
      }
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col'>
        <input onChange={(e) => setFile(e.target.files[0]) } type='file' className='hidden' ref={fileRef} accept='image/*' />
        <img onClick={() => fileRef.current.click() } src={formData.avatar || currentUser.avatar} alt={currentUser.name} className='w-24 h-24 rounded-full object-cover cursor-pointer mx-auto self-center mt-2' />
        <p>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

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
