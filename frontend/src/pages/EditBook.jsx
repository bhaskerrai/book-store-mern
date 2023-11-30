import { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const {id} = useParams();

  axios.defaults.withCredentials = true;

  useEffect(() => {

    setLoading(true);
    axios
      .get(`https://book-store-mern-one.vercel.app/books/${id}`)
      .then((respone) => {
        setTitle(respone.data.title)
        setAuthor(respone.data.author)
        setPublishYear(respone.data.publishYear)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured! Please check console.");
        console.log(error);
      })

  }, [])
  

  const handleEditBook = () => {

    const data = {
      title,
      author,
      publishYear
    }

    setLoading(true);

    axios
      .put(`https://book-store-mern-one.vercel.app/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully!", {variant: "success"})
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured! Please check console.");
        enqueueSnackbar("Error!", {variant: "error"})
        console.log(error);
      })

  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>

      {loading ? <Spinner/> : ""}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] m-auto p-4'>

        <div className='my-4'>
          <label className='text-xl text-gray-500 mr-4' >Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'      
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500 mr-4' >Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'      
          />
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500 mr-4' >Publish Year</label>
          <input 
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 w-full px-4 py-2'      
          />
        </div>

        <button 
          className='p-2 m-8 bg-sky-300' 
          onClick={handleEditBook}
        >
          Save
        </button>

      </div>
    </div>
  )
}

export default EditBook