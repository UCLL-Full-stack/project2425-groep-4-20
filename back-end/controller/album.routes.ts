import express, { Request, Response, NextFunction } from 'express';
import albumService from '../service/album.service';

const albumRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Album:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date
 *         artist:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             genre:
 *               type: string
 */

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get a list of albums
 *     responses:
 *       200:
 *         description: A list of albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 */
const getAllAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = await albumService.getAllAlbums();
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
};

albumRouter.get('/', getAllAlbums);

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Get an album by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the album
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Album details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Album not found
 */
const getAlbumById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albumId = Number(req.params.id);
        const album = await albumService.getAlbumById(albumId);
        if (album) {
            res.status(200).json(album);
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (error) {
        next(error);
    }
};

albumRouter.get('/:id', getAlbumById);

export { albumRouter };
