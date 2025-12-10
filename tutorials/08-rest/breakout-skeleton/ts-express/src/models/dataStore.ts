export interface Song {
  artist: string;
  title: string;
}

export interface SongDetail extends Song {
  id: number;
}

export interface Playlist {
  id: number;
  name: string;
  songs: number[];
}

export type SongMap = Record<number, Song>;
export type PlaylistMap = Record<number, Playlist>;

/**
 * The server's "database"
 */
export class DataStorage {
  playlists: PlaylistMap = {
    1: {
      id: 1,
      name: "My Cool Playlist",
      songs: [
        1440817260, 1350457768, 1211829300, 1132801552, 487215156, 1440489651,
      ],
    },
  };

  songs: SongMap = {
    1440817260: { artist: "John Lennon", title: "Instant Karma" },
    1350457768: { artist: "Caamp", title: "26" },
    1211829300: { artist: "Dispatch", title: "Be Gone" },
    1132801552: {
      artist: "Ledinsky",
      title: "DonaldTrumpMakesMeWannaSmokeSomeCrack",
    },
    487215156: { artist: "3OH!3", title: "Set You Free" },
    1440489651: { artist: "Creedence Clearwater Revival", title: "Lodi" },
  };

  getAllPlaylists() {
    return Object.keys(this.playlists).map(Number);
  }

  getPlaylistById(id: number) {
    const playlist = this.playlists[id];
    return { id: playlist.id, name: playlist.name };
  }

  getSongsOfPlaylist(id: number) {
    const playlist = this.playlists[id];
    return playlist?.songs;
  }

  getSongDetail(id: number) {
    const song = this.songs[id];
    return { id, artist: song.artist, title: song.title };
  }

  async addSongToPlaylist(
    playlistId: number,
    trackId: number,
    replace: boolean,
  ) {
    if (!replace && this.playlists[playlistId].songs.includes(trackId))
      return false;

    const data = await (
      await fetch(`https://itunes.apple.com/lookup?id=${trackId}`)
    ).json();
    if (!data.results || data.results.length === 0) return true;

    this.songs[trackId] = {
      artist: data.results[0].artistName,
      title: data.results[0].trackName,
    };

    this.playlists[playlistId].songs.push(trackId);

    return true;
  }

  deleteSongFromPlaylist(playlistId: number, trackId: number) {
    const i = this.playlists[playlistId].songs.indexOf(trackId);
    if (i == -1) return;

    this.playlists[playlistId].songs.splice(i, 1);
  }

  addNewSongs(songsList: SongDetail[]) {
    for (const song of songsList) {
      this.songs[song.id] = { artist: song.artist, title: song.title };
    }
  }
}
