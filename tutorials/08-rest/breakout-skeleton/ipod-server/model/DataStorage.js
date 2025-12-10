var fetch = require("node-fetch");

/**
 * @typedef {Object} Song
 * @property {string} artist
 * @property {string} title
 */

/**
 * A map of songId → Song
 * @typedef {Object.<number, Song>} SongMap
 */

/**
 * @typedef {Object} Playlist
 * @property {number} id
 * @property {string} name
 * @property {number[]} songs   - Array of song IDs
 */

/**
 * A map of playlistId → Playlist
 * @typedef {Object.<number, Playlist>} PlaylistMap
 */

/**
 * The server's "database"
 */
class DataStorage {
  /**@type{PlaylistMap} */
  playlists = {
    1: {
      id: 1,
      name: "My Cool Playlist",
      songs: [
        1440817260, 1350457768, 1211829300, 1132801552, 487215156, 1440489651,
      ],
    },
  };

  /**@type{SongMap} */
  songs = {
    1440817260: {
      artist: "John Lennon",
      title: "Instant Karma",
    },
    1350457768: {
      artist: "Caamp",
      title: "26",
    },
    1211829300: {
      artist: "Dispatch",
      title: "Be Gone",
    },
    1132801552: {
      artist: "Ledinsky",
      title: "DonaldTrumpMakesMeWannaSmokeSomeCrack",
    },
    487215156: {
      artist: "3OH!3",
      title: "Set You Free",
    },
    1440489651: {
      artist: "Creedence Clearwater Revival",
      title: "Lodi",
    },
  };

  // returns ids of all playlists
  getAllPlaylists() {
    return Object.keys(this.playlists);
  }

  /**
   *
   * @param {string} id
   * @returns {Song} playlist metadata (no songs)
   */
  getPlaylistById(id) {
    let playlist = this.playlists[id];
    return {
      id: playlist.id,
      name: playlist.name,
    };
  }

  /**
   *
   * @param {string} id
   * @returns {number[]} song ids
   */
  getSongsOfPlaylist(id) {
    let playlist = this.playlists[id];
    return playlist.songs;
  }

  /**
   *
   * @param {string} id
   * @returns {Song} song metadata
   */
  getSongDetail(id) {
    let song = this.songs[id];
    return {
      id: id,
      artist: song.artist,
      title: song.title,
    };
  }

  /**
   * if exists replace current song if true, add it another time otherwise
   * @param {string} playlistId
   * @param {string} trackId
   * @param {boolean} replace
   * @returns true if something was created
   */
  addSongToPlaylist(playlistId, trackId, replace) {
    if (replace || !this.playlists[playlistId].songs.contains(trackId)) {
      this.playlists[playlistId].songs.push(trackId);

      fetch(`https://itunes.apple.com/lookup?id=${trackId}`).then(json =>
        json.json().then(res => {
          this.songs[trackId] = {
            artist: res.results[0].artistName,
            title: res.results[0].trackName,
          };
        }),
      );

      return true;
    }
    return false;
  }

  /**
   * if exists replace current song if true, add it another time otherwise
   * returns true if something was created
   * @param {string} playlistId
   * @param {string} trackId
   * @param {boolean} replace
   * @returns
   */
  deleteSongFromPlaylist(playlistId, trackId) {
    let i = this.playlists[playlistId].songs.indexOf(parseInt(trackId));
    if (i > -1) {
      this.playlists[playlistId].songs.splice(i, 1);
    }
  }

  /**
   * Add new songs from a list
   *
   * @param {Array<{id: number, artist: string, title: string}>} songsList
   */
  addNewSongs(songsList) {
    for (const song of songsList) {
      this.songs[song.id] = {
        artist: song.artist,
        title: song.title,
      };
    }
  }
}
module.exports = DataStorage;
