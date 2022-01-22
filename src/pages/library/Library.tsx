import React, { Component } from "react";
import { SongObj } from "../../types/VideoResults";

const { ipcRenderer } = window.require("electron");

class Library extends Component<{}, { songs: SongObj[] }> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    ipcRenderer.on("playlists", (event: any, arg: SongObj[]) => {
      if (this._isMounted) {
        this.setState({
          songs: arg,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    ipcRenderer.send("get-playlists", "");
    return (
      <div>
        <h2>Library</h2>
        {this.state.songs.map((song) => (
          <p>song.title</p>
        ))}
      </div>
    );
  }
}

export default Library;
