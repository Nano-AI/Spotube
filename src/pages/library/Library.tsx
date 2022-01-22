import React, { Component } from "react";
import { PlaylistObj, SongObj } from "../../types/VideoResults";

const { ipcRenderer } = window.require("electron");

class Library extends Component<{}, { playlists?: PlaylistObj[] }> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      playlists: undefined,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    ipcRenderer.on("playlists", (event: any, arg: PlaylistObj[]) => {
      if (this._isMounted) {
        this.setState({
          playlists: arg,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.playlists == undefined || this.state.playlists.length == 0) {
      ipcRenderer.send("get-playlists", "");
    }
    console.log(this.state.playlists);
    return (
      <div>
        <h2>Library</h2>
        {this.state.playlists?.map((playlist: PlaylistObj) => {
          console.log(playlist.playlistTitle)
          return (<p>Name: {playlist.playlistTitle} ID: {playlist.playlistId}</p>);
        })}
      </div>
    );
  }
}

export default Library;
