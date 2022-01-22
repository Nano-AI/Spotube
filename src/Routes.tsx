import React, { Component } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import PlaylistView from "./pages/playlist-view/PlaylistView";
import Library from "./pages/library/Library";
import CreatePlaylist from "./pages/create-playlist/CreatePlaylist";

class PageRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/add-playlist" element={<AddPlaylist />} /> */}
        <Route path="/playlist/:id" element={<PlaylistView />} />
        <Route path="/library" element={<Library />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        {/* <Route path="*" element={<div>404</div>} /> */}
      </Routes>
    );
  }
}

export default PageRoutes;
