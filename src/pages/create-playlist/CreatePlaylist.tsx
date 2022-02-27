import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

const { ipcRenderer } = window.require("electron");

class CreatePlaylist extends Component<{}> {
  v: any;
  componentDidMount() {
    this.v = uuidv4();
    ipcRenderer.send("create-playlist", this.v);
  }
  render() {
    return (
      <div>
        <p>Created playlist with ID {this.v} </p>
      </div>
    );
  }
}

export default CreatePlaylist;
