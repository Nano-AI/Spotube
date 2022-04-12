import React, { Component } from "react";
import { PlaylistObj } from "types/VideoResults";

const { ipcRenderer } = window.require("electron");

class PlaylistView extends Component<{}, { playlist?: PlaylistObj }> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      playlist: undefined
    };
  }
  componentDidMount() {
    this._isMounted = true;
    ipcRenderer.on("playlist", (event: any, arg: PlaylistObj) => {
      if (this._isMounted) {
        console.log(arg)
        this.setState({
          playlist: arg
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
        <h2>Add Playlist</h2>
      </div>
    );
  }
}

export default PlaylistView;
