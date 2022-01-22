import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

const { ipcRenderer } = window.require("electron");

class CreatePlaylist extends Component<{}> {
  render() {
    let v = uuidv4();
    ipcRenderer.send("create-playlist", v);
    return (
      <div>
        <p>Created playlist with ID {v} </p>
      </div>
    );
  }
}

export default CreatePlaylist;
