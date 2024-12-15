import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UserService from '@services/UserService';
import { StatusMessage } from '@types';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        if (!username.trim() || !password.trim()) {
            setStatusMessages([{ message: 'All fields are required', type: 'error' }]);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { username, password };
        const response = await UserService.LoginUser(user);

        if (response.status === 200) {
            const userData = await response.json();
            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: userData.token,
                    name: userData.name,
                    role: userData.role,
                })
            );
            router.push('/');
        } else {
            const errorMessage = response.status === 401
                ? (await response.json()).errorMessage
                : 'An error has occurred. Please try again later';
            setStatusMessages([{ message: errorMessage, type: 'error' }]);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
            {statusMessages.map((status, index) => (
                <p key={index} className={`text-sm mb-4 ${status.type === 'error' ? 'text-red-500' : ''}`}>
                    {status.message}
                </p>
            ))}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-500 hover:underline">
                    Sign up
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
