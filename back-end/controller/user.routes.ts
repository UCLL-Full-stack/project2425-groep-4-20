import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { Playlist } from '../model/playlist';
import { User } from '../model/user';

const userService = new UserService();

export class UserController {
    getAllUsers(req: Request, res: Response): void {
        const users = userService.getAllUsers();
        res.json(users);
    }

    getUserById(req: Request, res: Response): void {
        const userId = Number(req.params.id);
        const user = userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    createUser(req: Request, res: Response): void {
        const { username, email } = req.body;
        const newUser = userService.createUser(username, email);
        res.status(201).json(newUser);
    }

    addPlaylistToUser(req: Request, res: Response): void {
        const userId = Number(req.params.id);
        const { title, description } = req.body; 
        const user = userService.getUserById(userId);
        if (user) {
            const newPlaylist = new Playlist({ title, description, user });
            userService.addPlaylistToUser(userId, newPlaylist);
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    removePlaylistFromUser(req: Request, res: Response): void {
        const userId = Number(req.params.userId);
        const playlistId = Number(req.params.playlistId);
        const user = userService.removePlaylistFromUser(userId, playlistId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User or Playlist not found');
        }
    }
}
