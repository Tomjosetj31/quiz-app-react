
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [rePassword, setRePassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {email: email, password: password};
            await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/register`, data).then((response) => {
                console.log(response);
                navigate('/login')
            }).catch((error) => {
                console.error('Login failed:', error);
                if (error.response && error.response.status === 400) {
                    const message = error.response.data.message;
                    setError(message);
                } else if (error.response && error.response.status === 401) {
                    setError('Invalid credentials. Please try again.');   
                } 
                else {
                    setError('Login failed. Please check your credentials and try again.');
                }
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (<Spinner/>
            ):
                <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${password !== rePassword ? 'border-red-500' : ''}`}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rePassword">
                                Retype Password
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${password !== rePassword ? 'border-red-500' : ''}`}
                                id="rePassword"
                                type="password"
                                placeholder="Enter your password"
                                value={rePassword}
                                onChange={handleRePasswordChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="inline-block align-baseline text-gray-600 text-sm font-semibold">
                                Already have an account? <a className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href="/login">login here</a>
                            </p>
                        </div>
                        <div className="m-6 flex items-center justify-between">
                            <button
                                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            }
        </>
    );
}

export default Register;