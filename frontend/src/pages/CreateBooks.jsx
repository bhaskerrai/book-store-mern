import { useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishYear, setPublishYear] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  axios.defaults.withCredentials = true;


  const handleSaveBook = () => {

    const data = {
      title, 
      author,
      publishYear
    }

    setLoading(true)

    axios
      .post("https://book-store-mern-one.vercel.app/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully!", {variant: "success"})
        navigate("/");
      })
      .catch((error) => {
        setLoading(false)
        // alert("An error occured! Please check console.")
        enqueueSnackbar("Error!", {variant: "error"})
        console.log(error)
      })
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>

      { loading ? <Spinner />  : "" }

      <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-[600px] '>
        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Publish Year</label>
          <input 
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button
          className='bg-sky-300 p-2 m-8'
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBooks