import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";

function SignupPage() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = (e)=>{
    e.preventDefault();
    //add fields if needed
    const data = {
      username,
      email,
      password
    }

    setLoading(true);
    axios
      .post(`http://localhost:5555/auth/signup`, data)
      .then(()=>{
        setLoading(false);
        console.log("a");
        enqueueSnackbar('Signed Up successfully', { variant: 'success' });
        navigate('/login');
      })
      .catch((error) => {
        setLoading(false);
        console.log("b");
      
        if (error.response) {
          // Server responded with a status other than 2xx
          const status = error.response.status;
          const data = error.response.data;
      
          if (status === 409) {
            if (data.message === 'email exists') {
              enqueueSnackbar('Email already in use', { variant: 'error' });
            } else if (data.message === 'username exists') {
              enqueueSnackbar('Username already in use', { variant: 'error' });
            }
          } else {
            // Handle other statuses if necessary
            enqueueSnackbar('An error occurred', { variant: 'error' });
          }
        } else if (error.request) {
          // No response received
          console.log('Error Request:', error.request);
          enqueueSnackbar('Network Error', { variant: 'error' });
        } else {
          // Error setting up the request
          console.log('Error Message:', error.message);
          enqueueSnackbar('An error occurred while setting up the request', { variant: 'error' });
        }
      
        console.log(error);
      });

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        {loading ? <Spinner /> : ''}
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              onChange={(e)=> setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={(e)=>{ handleSignUp(e) } }
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={'/login'} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
