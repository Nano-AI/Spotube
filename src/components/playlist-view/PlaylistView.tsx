import SongView from "components/song-view/SongView";
import { MouseEventHandler } from "react";
import { Component } from "react";
import { PlaylistObj } from "types/VideoResults";

class PlaylistView extends Component<{ playlist: PlaylistObj }> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let p = this.props.playlist;
    return (
      <div
        className="m-2"
        onClick={(e: any): void => {
          if (e.target.id === "play-icon") {
            return;
          }
        }}
      >
        <SongView
          songName={p.playlistTitle}
          artistName="By You"
          topResult={true}
          picture={p.playlistThumbnail}
          titleUrl={"/playlist/" + this.props.playlist.playlistId}
        />
      </div>
    );
  }
}

export default PlaylistView;
