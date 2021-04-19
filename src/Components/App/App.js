import './App.css';
import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults  from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';  

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist (Edit)',
      saveButton: 'SAVE TO SPOTIFY',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});

  }


  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: '',
        playlistTracks: [],
        saveButton: 'SAVED TO PLAYLISTS'
      })
    })
  }

  search (searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults,
        saveButton: 'SAVE TO SPOTIFY'
      })
    })
  } 

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }


  render() {
    return (
      <div>
        <div className="App">
          <h1>Curate +</h1>
          <SearchBar 
          onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          saveButton = {this.state.saveButton}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    );

  }
}

export default App;