import { useState } from 'react';
import { Playlist, User } from '@types';
import PlaylistService from '../../services/PlaylistService';
import Header from '@components/Header';

type Props = {
  selectedUser?: User;
};

const AddPlaylist: React.FC<Props> = ({ selectedUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPlaylist = async () => {
    if (selectedUser) {
      const newPlaylist: Omit<Playlist, 'id'> = {
        title,
        description,
        user: selectedUser,
      };
      await PlaylistService.addPlaylist(newPlaylist);
    }
  };

  return (
    <div>
        <Header />
      <h2>Add a New Playlist</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddPlaylist(); }}>
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
  );
};

export default AddPlaylist;
