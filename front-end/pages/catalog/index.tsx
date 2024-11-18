import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import { Song } from '@types'; // Zorg ervoor dat je het type uit @types importeert
import SongService from '@services/SongService';

const CatalogPage: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]); // Gebruik het Song type uit de types
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const data = await SongService.getAllSongs(); // Haal de songs op via de service
                setSongs(data); // Zet de opgehaalde songs in de state
            } catch (err) {
                setError('An error occurred while fetching songs');
                console.error(err);
            }
        };
        fetchSongs();
    }, []);

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h2>Song Catalog</h2>
                {error && <p style={styles.error}>{error}</p>}
                <div>
                    {songs.length === 0 ? (
                        <p>No songs available.</p>
                    ) : (
                        <table >
                            <thead>
                                <tr>
                                    <th style={styles.th}>Title</th>
                                    <th style={styles.th}>Artist</th>
                                    <th style={styles.th}>Album</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song) => (
                                    <tr key={song.id}>
                                        <td >{song.title}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ddd',
    },
    th: {
        padding: '12px',
        backgroundColor: '#f2f2f2',
    },
    td: {
        padding: '12px',
        textAlign: 'left',
        borderTop: '1px solid #ddd',
    },
};

export default CatalogPage;
