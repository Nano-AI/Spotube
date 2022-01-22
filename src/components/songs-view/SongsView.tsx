import React, { Component } from "react";
import SongView from "../song-view/SongView";
import { SongResultsType } from "../../types/VideoResults";

class SongsView extends Component<{
  searchResults?: SongResultsType;
  songLimit?: number;
  cutOff?: number;
}> {
  render() {
    const searchResults = this.props.searchResults;
    const cutOff = this.props.cutOff || 0;
    const songLimit = this.props.songLimit || 4;
    return (
      <div>
        {searchResults?.slice(cutOff, songLimit + cutOff).map((video) => {
          return <SongView songObj={video} />;
        })}
      </div>
    );
  }
}

export default SongsView;
