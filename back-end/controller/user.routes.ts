import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: User's username.
 *         email:
 *           type: string
 *           description: User's email.
 *         playlists:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get an array of users. Each item in the array represents a user.
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
const getAllUsers = (req: Request, res: Response) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
};

userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Get details of a specific user using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

userRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided username and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *               email:
 *                 type: string
 *                 description: User's email.
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
const createUser = (req: Request, res: Response) => {
    const { username, email } = req.body;
    const newUser = userService.createUser(username, email);
    res.status(201).json(newUser);
};

userRouter.post('/', createUser);

// /**
//  * @swagger
//  * /users/{id}/playlists:
//  *   post:
//  *     summary: Add a playlist to a user
//  *     description: Add a new playlist to the specified user.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the user to whom the playlist will be added
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
//  *                 description: Playlist title.
//  *               description:
//  *                 type: string
//  *                 description: Playlist description.
//  *     responses:
//  *       200:
//  *         description: Playlist added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       404:
//  *         description: User not found
//  */
// const addPlaylistToUser = (req: Request, res: Response) => {
//     const userId = Number(req.params.id);
//     const { title, description } = req.body;

//     const user = userService.getUserById(userId);
//     if (user) {
//         const newPlaylist = { title, description, user }; // Adjust as needed
//         userService.addPlaylistToUser(userId, newPlaylist);
//         res.status(200).json(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// };

// userRouter.post('/:id/playlists', addPlaylistToUser);

// /**
//  * @swagger
//  * /users/{userId}/playlists/{playlistId}:
//  *   delete:
//  *     summary: Remove a playlist from a user
//  *     description: Remove a playlist from the specified user.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         description: ID of the user
//  *         schema:
//  *           type: integer
//  *           format: int64
//  *       - in: path
//  *         name: playlistId
//  *         required: true
//  *         description: ID of the playlist to remove
//  *         schema:
//  *           type: integer
//  *           format: int64
//  *     responses:
//  *       204:
//  *         description: Playlist removed successfully
//  *       404:
//  *         description: User or Playlist not found
//  */
// const removePlaylistFromUser = (req: Request, res: Response) => {
//     const userId = Number(req.params.userId);
//     const playlistId = Number(req.params.playlistId);
//     const deleted = userService.removePlaylistFromUser(userId, playlistId);
//     if (deleted) {
//         res.status(204).send();
//     } else {
//         res.status(404).send('User or Playlist not found');
//     }
// };

// userRouter.delete('/:userId/playlists/:playlistId', removePlaylistFromUser);

export { userRouter };
