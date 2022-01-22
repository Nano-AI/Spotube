import React, { Component } from "react";
import "./Titlebar.scss";

class Titlebar extends Component {
  render() {
    const electron = window.require("electron");
    return (
      <>
        <div className="titlebar inline-block absolute right-0 top-0 z-10">
          <div className="m-3">
            <div className="icon inline-block">
              <button
                className="dot bg-minimize-yellow-fill hover:bg-minimize-yellow-outline"
                onClick={() => electron.ipcRenderer.send("minimize")}
                tabIndex={-1}
              >
                &nbsp;
              </button>
              <button
                className="dot bg-fullscreen-green-fill hover:bg-fullscreen-green-outline"
                onClick={() => electron.ipcRenderer.send("toggle-fullscreen")}
                tabIndex={-1}
              >
                &nbsp;
              </button>
              <button
                className="dot bg-close-red-fill hover:bg-close-red-outline"
                onClick={() => electron.ipcRenderer.send("close")}
                tabIndex={-1}
              >
                &nbsp;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Titlebar;
