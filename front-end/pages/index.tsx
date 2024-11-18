import React from 'react';
import Link from 'next/link';
import Header from '@components/Header';

const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <div>
                <h1 style={styles.title}>Welcome to the Music Management App</h1>
                <p style={styles.description}>
                    Explore and manage your music collection, playlists, and more!
                </p>
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        marginBottom: '30px',
    },
    linkContainer: {
        marginTop: '20px',
    },
    link: {
        fontSize: '18px',
        color: '#0070f3',
        textDecoration: 'none',
    },
};

export default HomePage;
