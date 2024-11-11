import express, { Request, Response, NextFunction } from 'express';
import songService from '../service/song.service';

const songRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the song
 *         title:
 *           type: string
 *           description: The title of the song
 *         artist:
 *           type: string
 *           description: The artist of the song
 *         album:
 *           type: string
 *           description: The album the song is part of
 */

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Retrieve a list of songs
 *     description: Get an array of songs. Each item in the array represents a song.
 *     responses:
 *       200:
 *         description: An array of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
const getAllSongs = async (req: Request, res: Response) => {
    try {
        const songs = await songService.getAllSongs();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching songs', error });
    }
};

songRouter.get('/', getAllSongs);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Retrieve a song by ID
 *     description: Get details of a specific song using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A song object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Song not found
 */
const getSongById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const songId = Number(req.params.id);
        const song = await songService.getSongById(songId);
        if (song) {
            res.status(200).json(song);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        next(error);
    }
};

songRouter.get('/:id', getSongById);

export { songRouter };
