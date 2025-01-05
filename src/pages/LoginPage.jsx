import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUserData } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      emailOrUsername,
      password,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/auth/login`, data)
      .then((response) => {
        setLoading(false);
        if (
          response.data.message === 'user doesnt exist' ||
          response.data.message === 'invalid password'
        ) {
          enqueueSnackbar('Wrong Username or Password', { variant: 'error' });
        } else {
          const { userPageData, token } = response.data;
          setUserData(userPageData);
          sessionStorage.setItem('token', token); // stores token
          enqueueSnackbar('Logged In Successfully', { variant: 'success' });
          navigate('/home');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Login error:', error);
        enqueueSnackbar('Login Failed', { variant: 'error' });
      });
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      console.log('Google Login Success:', credentialResponse);
      const { credential } = credentialResponse;
      const response = await axios.post('http://localhost:5555/auth/google-signin', { token: credential });
      if (response.status === 200) {
        const { userPageData, token } = response.data;
        sessionStorage.setItem('token', token);
        setUserData(userPageData);
        enqueueSnackbar('Google Login Successful', { variant: 'success' });
        navigate('/home');
      } else {
        console.error('Google Login Backend Error:', response.data.message);
        enqueueSnackbar('Google Login Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during Google Login:', error.message);
      enqueueSnackbar('Google Login Failed', { variant: 'error' });
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error('Google Login Failed');
    enqueueSnackbar('Google Login Failed', { variant: 'error' });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
            {true && (
              <div className="my-6">
                <GoogleOAuthProvider clientId={"GOOGLE_CLIENT_ID"}>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    text="continue_with"
                  />
                </GoogleOAuthProvider>
              </div>
            )}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
