import Link from 'next/link';
import Language from './language/Language';
import { use, useEffect, useState } from 'react';
import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { User } from '@types';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedUser] = useState<User | null>(null);
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        setLoggedUser(JSON.parse(user));
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  }
  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <a className="text-white text-3xl font-bold mb-2 md:mb-0">
          Playlist App
        </a>
        <nav className="flex space-x-6">
          <Link href="/" className="text-white text-lg hover:underline">
          {t('header.home')}
          </Link>
          {loggedInUser && 
          <Link href="/catalog" className="text-white text-lg hover:underline">
           {t('header.catalog')}
          </Link>}
          {loggedInUser && 
          <Link href="/addPlaylistt" className="text-white text-lg hover:underline">
           {t('header.addPlaylist')}
          </Link>}
          {loggedInUser &&
          <Link href="/song" className="text-white text-lg hover:underline">
          {t('header.song', { defaultValue: 'Songs' })}
        </Link>}
          {loggedInUser && 
          <li>
          <button
            className="text-white text-lg hover:underline"
            onClick={handleLogout}
          >
            {t('header.logout')}
          </button>
        </li>
        }
          {!loggedInUser &&
          <Link href="/login" className="text-white text-lg hover:underline">
            {t('header.login')}
          </Link>}
        </nav>
        <div className="mt-4 md:mt-0">
          <Language />
        </div>
      </div>
    </header>
  );
};

export default Header;
