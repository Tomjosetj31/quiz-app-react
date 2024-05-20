import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = {email: email, password: password};
            setLoading(true);
            await axios.post(`${process.env.BACKEND_API_URL}/login`, data).then((response) => {
                console.log(response);
                setLoading(false);
                navigate('/')
            }).catch((error) => {
                setLoading(false);
                alert('Invalid email or password');
                console.error(error);
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {loading ? (
                <Spinner/>
            ):
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    {/* <h1 className="text-4xl font-bold mb-6">Quizzy</h1> */}
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
                                required // Add required attribute
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                required // Add required attribute
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="inline-block align-baseline text-gray-600 text-sm font-semibold">
                                Don't have an account?{' '}
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                                    register here
                                </a>
                            </p>
                        </div>
                        <div className="m-6 flex items-center justify-between">
                            <button
                                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign In
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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

export default Login;
