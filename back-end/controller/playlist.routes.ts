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
const getAllPlaylists = (req: Request, res: Response) => {
    const playlists = playlistService.getAllPlaylists();
    res.status(200).json(playlists);
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
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
const createPlaylist = (req: Request, res: Response) => {
    const { title, description, user } = req.body; // Make sure to include the user details as needed
    const newPlaylist = playlistService.createPlaylist(title, description, user);
    res.status(201).json(newPlaylist);
};

playlistRouter.post('/', createPlaylist);

// /**
//  * @swagger
//  * /playlists/{id}:
//  *   put:
//  *     summary: Update a playlist by ID
//  *     description: Update details of a specific playlist using its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the playlist to update
//  *         schema:
//  *           type: integer
//  *           format: int64
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 description: Updated playlist title.
//  *               description:
//  *                 type: string
//  *                 description: Updated playlist description.
//  *     responses:
//  *       200:
//  *         description: Playlist updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Playlist'
//  *       404:
//  *         description: Playlist not found
//  */
// const updatePlaylist = (req: Request, res: Response) => {
//     const playlistId = Number(req.params.id);
//     const { title, description } = req.body;
//     const updatedPlaylist = playlistService.updatePlaylist(playlistId, title, description);
//     if (updatedPlaylist) {
//         res.status(200).json(updatedPlaylist);
//     } else {
//         res.status(404).send('Playlist not found');
//     }
// };

// playlistRouter.put('/:id', updatePlaylist);

// /**
//  * @swagger
//  * /playlists/{id}:
//  *   delete:
//  *     summary: Delete a playlist by ID
//  *     description: Remove a playlist from the collection using its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the playlist to delete
//  *         schema:
//  *           type: integer
//  *           format: int64
//  *     responses:
//  *       204:
//  *         description: Playlist deleted successfully
//  *       404:
//  *         description: Playlist not found
//  */
// const deletePlaylist = (req: Request, res: Response) => {
//     const playlistId = Number(req.params.id);
//     const deleted = playlistService.deletePlaylist(playlistId);
//     if (deleted) {
//         res.status(204).send();
//     } else {
//         res.status(404).send('Playlist not found');
//     }
// };

// playlistRouter.delete('/:id', deletePlaylist);

export { playlistRouter };
