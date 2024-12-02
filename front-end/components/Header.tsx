import Link from 'next/link';
import Language from './language/Language';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <a className="text-white text-3xl font-bold mb-2 md:mb-0">
          Playlist App
        </a>
        <nav className="flex space-x-6">
          <Link href="/" className="text-white text-lg hover:underline">
            Home
          </Link>
          <Link href="/login" className="text-white text-lg hover:underline">
            Login
          </Link>
          <Link href="/catalog" className="text-white text-lg hover:underline">
            Catalog
          </Link>
          <Link href="/addPlaylistt" className="text-white text-lg hover:underline">
            Add Playlist
          </Link>
        </nav>
        <div className="mt-4 md:mt-0">
          <Language />
        </div>
      </div>
    </header>
  );
};

export default Header;
