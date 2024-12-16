import React from 'react';
import { Album } from '@types';
import { t } from 'i18next';

interface AlbumRowProps {
    album: Album;
    onClick: (id: number) => void;
    isSelected: boolean;
}

const AlbumRow: React.FC<AlbumRowProps> = ({ album, onClick, isSelected }) => {
    return (
        <tr
            className={`border-b hover:bg-blue-50 cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
            onClick={() => onClick(album.id)}
        >
            <td className="px-4 py-2">{album.title}</td>
            <td className="px-4 py-2">{album.songs.length} {t('albumcatalog.songs')}</td>
        </tr>
    );
};

export default AlbumRow;
