import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import UserService from '../../services/UserService';
import { StatusMessage } from '@types';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearErrors = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!username.trim()) {
      setNameError(t('signUp.errors.usernameRequired'));
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError(t('signUp.errors.emailRequired'));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t('signUp.errors.emailInvalid'));
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(t('signUp.errors.passwordRequired'));
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

    try {
      const response = await UserService.addUser(username, email, password);

      if (!response || !response.ok) {
        const responseBody = await response.text();
        const errorData = JSON.parse(responseBody);
        setStatusMessages([
          {
            message: errorData.errorMessage || t('signUp.errors.genericError'),
            type: 'error',
          },
        ]);
        return;
      }

      setStatusMessages([{ message: t('signUp.successMessage'), type: 'success' }]);
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Error creating user:', error);
      setStatusMessages([
        {
          message: t('signUp.errors.genericError'),
          type: 'error',
        },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">{t('signUp.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              {t('signUp.username')}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                nameError ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              {t('signUp.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                emailError ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              {t('signUp.password')}
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
            {t('signUp.submit')}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          {t('signUp.alreadyAccount')}{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            {t('signUp.login')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
