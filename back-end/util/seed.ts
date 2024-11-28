// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.song.deleteMany();
    await prisma.album.deleteMany();
    await prisma.artist.deleteMany();
    await prisma.playlist.deleteMany();
    await prisma.user.deleteMany();

    const artist1 = await prisma.artist.create({
        data: {
            name: 'The Echoes',
            birthdate: new Date('1985-05-15'),
        },
    });

    const artist2 = await prisma.artist.create({
        data: {
            name: 'Harmony Sound',
            birthdate: new Date('1990-10-20'),
        },
    });

    const album1 = await prisma.album.create({
        data: {
            title: 'Echoes of Time',
            releaseDate: new Date('2010-06-22'),
            artistId: artist1.id,
        },
    });

    const album2 = await prisma.album.create({
        data: {
            title: 'Harmony in Motion',
            releaseDate: new Date('2015-03-18'),
            artistId: artist2.id,
        },
    });

    // Create Songs
    const song1 = await prisma.song.create({
        data: {
            title: 'Timeless Wave',
            genre: 'Rock',
            releaseDate: new Date('2010-06-22'),
            length: 240,
            album: {
                connect: { id: album1.id }, // connect the album via its ID
            },
        },
    });
    
    const song2 = await prisma.song.create({
        data: {
            title: 'Eternal Rhythm',
            genre: 'Rock',
            releaseDate: new Date('2010-06-22'),
            length: 200,
            album: {
                connect: { id: album1.id }, // same for album2, connect to existing album
            },
        },
    });
    
    const song3 = await prisma.song.create({
        data: {
            title: 'Soul Harmony',
            genre: 'Jazz',
            releaseDate: new Date('2015-03-18'),
            length: 300,
            album: {
                connect: { id: album2.id },
            },
        },
    });
    
    const song4 = await prisma.song.create({
        data: {
            title: 'Tranquil Beats',
            genre: 'Ambient',
            releaseDate: new Date('2015-03-18'),
            length: 180,
            album: {
                connect: { id: album2.id },
            },
        },
    });
    

    // Create Users
    // Create Users
const user1 = await prisma.user.create({
    data: {
        username: 'melody_maker',
        email: 'melody@example.com',
        password: 'securepassword1', // Voeg een wachtwoord toe
        role: 'user',
    },
});

const user2 = await prisma.user.create({
    data: {
        username: 'beat_blender',
        email: 'beat@example.com',
        password: 'securepassword2',
        role: 'admin',
    },
});


    // Create Playlists
    const playlist1 = await prisma.playlist.create({
        data: {
            title: 'Chill Vibes',
            description: 'A collection of relaxing tunes',
            userId: user1.id,
            songs: {
                connect: [{ id: song3.id }, { id: song4.id }],
            },
        },
    });

    const playlist2 = await prisma.playlist.create({
        data: {
            title: 'Rock Essentials',
            description: 'Must-have rock tracks for every fan',
            userId: user2.id,
            songs: {
                connect: [{ id: song1.id }, { id: song2.id }],
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
