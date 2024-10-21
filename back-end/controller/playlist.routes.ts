import { Request, Response } from 'express';
import { PlaylistService } from '../service/playlist.service';

const playlistService = new PlaylistService();

export class PlaylistController {
    getAllPlaylists(req: Request, res: Response): void {
        const playlists = playlistService.getAllPlaylists();
        res.json(playlists);
    }

    getPlaylistById(req: Request, res: Response): void {
        const playlistId = Number(req.params.id);
        const playlist = playlistService.getPlaylistById(playlistId);
        if (playlist) {
            res.json(playlist);
        } else {
            res.status(404).send('Playlist not found');
        }
    }

    createPlaylist(req: Request, res: Response): void {
        const { title, description, user } = req.body;
        const newPlaylist = playlistService.createPlaylist(title, description, user);
        res.status(201).json(newPlaylist);
    }

    updatePlaylist(req: Request, res: Response): void {
        const playlistId = Number(req.params.id);
        const { title, description } = req.body;
        const updatedPlaylist = playlistService.updatePlaylist(playlistId, title, description);
        if (updatedPlaylist) {
            res.json(updatedPlaylist);
        } else {
            res.status(404).send('Playlist not found');
        }
    }

    deletePlaylist(req: Request, res: Response): void {
        const playlistId = Number(req.params.id);
        const deleted = playlistService.deletePlaylist(playlistId);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Playlist not found');
        }
    }
}
