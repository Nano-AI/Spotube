import SideNav from "./components/sidenav/SideNav";
import Titlebar from "./components/titlebar/Titlebar";
import PageRoutes from "./Routes";
import { SongPlayer } from "./components/song-player/SongPlayer";
import "./App.scss";
import React from "react";
import Soundbar from "./components/soundbar/Soundbar";

export function App() {
  // songPlayerRef.current?.play_song();
  // const electron = window.require("electron");
  return (
    <SongPlayer>
      <div className="App bg-home-background">
        <Soundbar />
        <Titlebar />
        <SideNav>
          <PageRoutes />
        </SideNav>
      </div>
    </SongPlayer>
  );
}

export default App;
