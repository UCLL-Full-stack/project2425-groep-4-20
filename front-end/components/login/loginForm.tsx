import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import UserService from '@services/UserService';
import { StatusMessage } from '@types';

const LoginForm: React.FC = () => {
    const { t } = useTranslation('common');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;

        if (!username.trim()) {
            setUsernameError(t('loginForm.errors.usernameRequired'));
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError(t('loginForm.errors.passwordRequired'));
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { username, password };

        try {
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
                const errorMessage =
                    response.status === 401
                        ? (await response.json()).errorMessage
                        : t('loginForm.errors.genericError');
                setStatusMessages([{ message: errorMessage, type: 'error' }]);
            }
        } catch (error) {
            console.error('Login error:', error);
            setStatusMessages([{ message: t('loginForm.errors.genericError'), type: 'error' }]);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">{t('loginForm.title')}</h2>
            {statusMessages.map((status, index) => (
                <p key={index} className={`text-sm mb-4 ${status.type === 'error' ? 'text-red-500' : ''}`}>
                    {status.message}
                </p>
            ))}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        {t('loginForm.username')}
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            usernameError ? 'border-red-500' : 'focus:ring-blue-500'
                        }`}
                    />
                    {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        {t('loginForm.password')}
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            passwordError ? 'border-red-500' : 'focus:ring-blue-500'
                        }`}
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
                >
                    {t('loginForm.submit')}
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                {t('loginForm.noAccount')}{' '}
                <a href="/signup" className="text-blue-500 hover:underline">
                    {t('loginForm.signUp')}
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
