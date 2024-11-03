import { Playlist } from '../../model/playlist';
import { User } from '../../model/user';

describe('User Class', () => {
    let user: User;
    let playlist1: Playlist;
    let playlist2: Playlist;

    beforeEach(() => {
        user = new User({
            username: 'johan',
            email: 'johan@ucll.be',
            playlists: []
        });

        playlist1 = new Playlist({
            title: 'Playlist 1',
            description: 'First playlist',
            user
        });

        playlist2 = new Playlist({
            title: 'Playlist 2',
            description: 'Second playlist',
            user
        });
    });

    test('given valid values for user, when user is created, then user is created with those values', () => {
        // given
        const username = 'johan';
        const email = 'johan@ucll.be';

        // when
        const newUser = new User({ username, email });

        // then
        expect(newUser.getUsername()).toEqual(username);
        expect(newUser.getEmail()).toEqual(email);
        expect(newUser.getPlaylists()).toEqual([]);
    });

    test('given an existing user, when a playlist is added, then the playlist is added to the user\'s playlists', () => {
        // given

        // when
        user.addPlaylist(playlist1);

        // then
        expect(user.getPlaylists()).toContain(playlist1);
        expect(user.getPlaylists()).toHaveLength(1);
    });

    test('given a user with a playlist, when the playlist is removed, then the playlist is no longer in the user\'s playlists', () => {
        // given
        user.addPlaylist(playlist1);

        // when
        user.removePlaylist(playlist1);

        // then
        expect(user.getPlaylists()).not.toContain(playlist1);
        expect(user.getPlaylists()).toHaveLength(0);
    });

    test('given an existing user, when another user with the same values is compared, then they are equal', () => {
        // given
        const anotherUser = new User({
            username: 'johan',
            email: 'johan@ucll.be'
        });

        // when
        const isEqual = user.equals(anotherUser);

        // then
        expect(isEqual).toBe(true);
    });

    test('given an existing user, when another user with different values is compared, then they are not equal', () => {
        // given
        const differentUser = new User({
            username: 'ferre',
            email: 'ferre@ucll.be'
        });

        // when
        const isEqual = user.equals(differentUser);

        // then
        expect(isEqual).toBe(false);
    });
});
