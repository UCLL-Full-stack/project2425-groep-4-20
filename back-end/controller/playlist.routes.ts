import express, { NextFunction, Request, Response } from 'express';
import playlistService from '../service/playlist.service';
import { PlaylistInput } from '../types';

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
 *     summary: Add a new playlist
 *     description: Add a new playlist by providing title, description, and user information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
const addPlaylist = async (req: Request, res: Response) => {
    const playlistInput: PlaylistInput = req.body;

    try {
        const newPlaylist = await playlistService.addPlaylist(playlistInput);
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the playlist', error });
    }
};

playlistRouter.post('/', addPlaylist);
  


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

/**
 * @swagger
 * /playlists/{id}/songs:
 *   delete:
 *     summary: Remove a song from a playlist
 *     description: Remove a song from a specific playlist using the playlist ID and song ID.
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
 *                 description: ID of the song to remove from the playlist
 *     responses:
 *       200:
 *         description: Song removed from the playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist or Song not found
 */
const removeSongFromPlaylist = async (req: Request, res: Response) => {
    const playlistId = Number(req.params.id);
    const songId = Number(req.params.songId);

    try {
        const updatedPlaylist = await playlistService.removeSongFromPlaylist(playlistId, songId);
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing the song from the playlist', error });
    }
};

playlistRouter.delete('/:id/songs/:songId', removeSongFromPlaylist);


/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Update the title of a playlist
 *     description: Update the title of a specific playlist using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the playlist to update
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
 *               title:
 *                 type: string
 *                 description: New title for the playlist
 *     responses:
 *       200:
 *         description: Playlist title updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist not found
 */

const updatePlaylistTitle = async (req: Request, res: Response) => {
    const playlistId = Number(req.params.id);
    const { title } = req.body;

    try {
        const updatedPlaylist = await playlistService.updatePlaylistTitle(playlistId, title);
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the playlist title', error });
    }
};



playlistRouter.put('/:id', updatePlaylistTitle);


export { playlistRouter };
