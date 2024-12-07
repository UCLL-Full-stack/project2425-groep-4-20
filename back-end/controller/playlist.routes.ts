import express, { NextFunction, Request, Response } from 'express';
import playlistService from '../service/playlist.service';

const playlistRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: Playlist title.
 *         description:
 *           type: string
 *           description: Playlist description.
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Retrieve a list of playlists
 *     description: Get an array of playlists. Each item in the array represents a playlist.
 *     responses:
 *       200:
 *         description: An array of playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
const getAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await playlistService.getAllPlaylists(); // Await the result
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching playlists', error });
    }
};

playlistRouter.get('/', getAllPlaylists);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Retrieve a playlist by ID
 *     description: Get details of a specific playlist using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the playlist to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A playlist object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist not found
 */
const getPlaylistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlistId = Number(req.params.id);
        const playlist = await playlistService.getPlaylistById(playlistId);
        if (playlist) {
            res.status(200).json(playlist);
        } else {
            res.status(404).json({ message: 'Playlist not found' });
        }
    } catch (error) {
        next(error);
    }
};

playlistRouter.get('/:id', getPlaylistById);

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     description: Create a new playlist with the provided title and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Playlist title.
 *               description:
 *                 type: string
 *                 description: Playlist description.
 *               userId:
 *                 type: integer
 *                 description: ID of the user who is creating the playlist.
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
const createPlaylist = async (req: Request, res: Response) => {
    const { title, description, userId } = req.body; // Ensure the userId is passed in the request body
    try {
        const newPlaylist = await playlistService.createPlaylist(title, description, userId);
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the playlist', error });
    }
};

playlistRouter.post('/', createPlaylist);

/**
 * @swagger
 * /playlists/{id}/songs:
 *   post:
 *     summary: Add a song to a playlist
 *     description: Add a song to a specific playlist by providing the playlist ID and song ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the playlist
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: integer
 *                 description: ID of the song to add to the playlist
 *     responses:
 *       200:
 *         description: Song added to the playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist or Song not found
 */
const addSongToPlaylist = async (req: Request, res: Response) => {
    const playlistId = Number(req.params.id);
    const { songId } = req.body;

    try {
        const updatedPlaylist = await playlistService.addSongToPlaylist(playlistId, songId);
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the song to the playlist', error });
    }
};

playlistRouter.post('/:id/songs', addSongToPlaylist);

export { playlistRouter };
