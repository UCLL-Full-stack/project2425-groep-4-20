import Header from '@components/Header';
import React, { useState } from 'react';
import userService from '@services/UserService';
import { useRouter } from 'next/router';
import { StatusMessage } from '@types';
import UserService from '@services/UserService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};
const LoginPage: React.FC = () => {
  const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();


    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!username || !password) {
    //         setError('Both fields are required');
    //         return;
    //     }
    //     setError('');
    //     try {
    //         userService.LoginUser(username, password);

    //         setTimeout(() => {
    //             router.push('/');
    //         }, 2000);
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         alert('Login failed. Please check your credentials and try again.');
    //     }
    // };
    
    const clearErrors = () => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
      };
      const validate = (): boolean => {
        let result = true;
    
        if (!username ||  username.trim() === "") {
          setNameError("Name is required");
          result = false;
        } else if (!password || password.trim() === "") {
          setPasswordError("Password is required");
          result = false;
        }
        // else if (!password.match(/[!?@#]/)){
        //     setPasswordError("Password needs to include at least one of these characters !?@#")
        //     result = false;
        // }
        return result;
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
          return;
        }
    
        const user = { username: username, password: password };
        // console.log(user)
        const response = await UserService.LoginUser(user);
    
        if (response.status === 200) {
          const userData = await response.json();
          console.log(userData);
          sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              token: userData.token,
              name: userData.name,
              role: userData.role,
            })
          );
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else if (response.status === 401) {
          const { errorMessage } = await response.json();
          setStatusMessages([{ message: errorMessage, type: "error" }]);
        } else {
          setStatusMessages([
            {
              message: "An error has occurred. Please try again later",
              type: "error",
            },
          ]);
        }
      };
    

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
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
            </div>
        </>
    );
};


export default LoginPage;
