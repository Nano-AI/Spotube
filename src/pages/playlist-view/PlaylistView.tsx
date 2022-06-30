import React, { Component } from "react";
import { PlaylistObj, SongObj } from "types/VideoResults";

const { ipcRenderer } = window.require("electron");

class PlaylistView extends Component<{}, { playlist?: PlaylistObj }> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      playlist: undefined,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    ipcRenderer.on("playlist", (event: any, arg: PlaylistObj) => {
      if (this._isMounted) {
        console.log(arg);
        this.setState({
          playlist: arg,
        });
      }
    });
  }
  render() {
    if (!this.state.playlist) {
      ipcRenderer.send("get-playlist", window.location.href.split("/").at(-1));
    }
    return (
      <div>
        {/* <h2>Add Playlist</h2> */}
        <div className="my-12 mx-8">
          <img
            className="w-32 h-32 inline-block"
            src={this.state.playlist?.playlistThumbnail}
          />
          <h2 className="inline-block align-bottom mx-8 text-7xl">
            {this.state.playlist?.playlistTitle}
          </h2>
          <p>{/* By {this.state.playlist.} */}</p>

          {this.state.playlist?.songs.map((song: SongObj) => {
            return <div>{song.title}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default PlaylistView;
