import { useState } from 'react';
import { Playlist, User } from '@types';

type Props = {
  selectedUser?: User;
  onAddPlaylist: (playlist: Omit<Playlist, 'id'>) => void;
  users: Array<User>;
};

const AddPlaylistForm: React.FC<Props> = ({ selectedUser, onAddPlaylist, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState(''); 

  const handleAddPlaylist = async () => {
    if (!users) return;
    const user = users.find(user => user.username === username);
    if (user) {
      const newPlaylist: Omit<Playlist, 'id'> = {
        title,
        description,
        user,
      };
      onAddPlaylist(newPlaylist);
      setTitle('');
      setDescription('');
      setUsername('');
    } else {
      alert("User not found");
    }
  };

  return (
    <>
    <div>
      <h2>Add a New Playlist</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddPlaylist(); }}>
      <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Playlist Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <button type="submit">Add Playlist</button>
      </form>
    </div>
    </>
  );
};

export default AddPlaylistForm;
