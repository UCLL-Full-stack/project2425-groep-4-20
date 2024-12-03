import Header from '@components/Header';
import { StatusMessage } from '@types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UserService from '../../services/UserService';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState<string>(''); // Previously 'password'
    const [password, setPassword] = useState<string>(''); // Previously 'email'
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const clearErrors = () => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
    
        if (!username || username.trim() === "") {
          setNameError("Username is required");
          result = false;
        }
    
        if (!email || email.trim() === "") {
          setEmailError("Email is required");
          result = false;
        } else if (!validateEmail(email)) {
          setEmailError("Invalid email format");
          result = false;
        }
    
        if (!password || password.trim() === "") {
          setPasswordError("Password is required");
          result = false;
        }
    
        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
          return;
        }
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:',password)
        try {
          const response = await UserService.addUser(
            username,
            email,  // Previously password
            password,  // Previously email
          );
    
          if (!response) {
            setStatusMessages([{
              message: "Error creating user. Please try again later.",
              type: "error",
            }]);
            return;
          }
    
          if (!response.ok) {
            const responseBody = await response.text();
            const errorData = JSON.parse(responseBody);
            setStatusMessages([{
              message: errorData.errorMessage,
              type: "error",
            }]);
            return;
          }
    
          const userData = await response.json();
          sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              token: userData.token,
              username: userData.username,
              role: userData.role,
            })
          );
    
          setStatusMessages([{
            message: "Register successful. Redirecting to Homepage",
            type: "success",
          }]);
    
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (error) {
          console.error("Error creating user:", error);
          setStatusMessages([{
            message: "Error creating user. Please try again later.",
            type: "error",
          }]);
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Sign Up</h2>
                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-medium mb-2"
                            >
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
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
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
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
