import { Playlist } from '../../model/playlist';
import { User } from '../../model/user';

const user = new User({ 
    username: 'johan', 
    email: 'johan@ucll.be', 
    playlists: []
});

test('given valid values for playlist, when playlist is created, then playlist is created with those values', () => {
    // given
    const title = 'My Playlist';
    const description = 'A playlist for testing';

    // when
    const playlist = new Playlist({
        title,
        description,
        user
    });

    // then
    expect(playlist.getTitle()).toEqual(title);
    expect(playlist.getDescription()).toEqual(description);
    expect(playlist.getUser()).toEqual(user);
});

test('given an existing playlist, when another playlist with same values is compared, then they are equal', () => {
    // given
    const playlist1 = new Playlist({
        title: 'My Playlist',
        description: 'A playlist for testing',
        user
    });

    const playlist2 = new Playlist({
        title: 'My Playlist',
        description: 'A playlist for testing',
        user
    });

    // when
    const isEqual = playlist1.equals(playlist2);

    // then
    expect(isEqual).toBe(true);
});

test('given an existing playlist, when adding a different playlist, then they are not equal', () => {
    // given
    const playlist1 = new Playlist({
        title: 'My Playlist',
        description: 'A playlist for testing',
        user
    });

    const differentUser = new User({
        username: 'ferre',
        email: 'ferre@ucll.be',
        playlists: []
    });

    const playlist2 = new Playlist({
        title: 'My Playlist',
        description: 'Another playlist for testing',
        user: differentUser
    });

    // when
    const isEqual = playlist1.equals(playlist2);

    // then
    expect(isEqual).toBe(false);
});
