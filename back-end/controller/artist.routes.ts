import express, { Request, Response, NextFunction } from 'express';
import artistService from '../service/artist.service';

const artistRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the artist
 *         name:
 *           type: string
 *           description: The name of the artist
 */

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Retrieve a list of artists
 *     description: Get an array of artists. Each item in the array represents an artist.
 *     responses:
 *       200:
 *         description: An array of artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await artistService.getAllArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching artists', error });
    }
};

artistRouter.get('/', getAllArtists);

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Retrieve an artist by ID
 *     description: Get details of a specific artist using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the artist to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: An artist object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: Artist not found
 */
const getArtistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistId = Number(req.params.id);
        const artist = await artistService.getArtistById(artistId);
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        next(error);
    }
};

artistRouter.get('/:id', getArtistById);

export { artistRouter };
