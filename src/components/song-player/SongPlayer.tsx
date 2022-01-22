import React from "react";
import { Component } from "react";
import ReactPlayer from "react-player/youtube";
import { SongObj } from "../../types/VideoResults";
import { DurationObj } from "../../types/VideoResults";

interface SongContextValue {
  play_song(url: SongObj): any;
  get_current_song(): SongObj | undefined;
  add_update(callback: (song: SongObj) => any): any;
  get_elapsed(): DurationObj | undefined;
  add_duration_update(func: (duration: DurationObj) => any): any;
  change_time(time: number): any;
  get_total_duration(): number;
  toggle_play(): any;
  add_play_update(func: (playing: boolean) => any): any;
  playing(): boolean;
}

const MusicPlayerContext = React.createContext<SongContextValue | undefined>(
  undefined
);

class SongPlayer extends Component<
  {},
  {
    currentSong?: SongObj;
    play: boolean;
  }
> {
  _isMounted = false;
  private reactPlayer: React.RefObject<ReactPlayer>;
  updateFunctions: ((song: SongObj) => any)[] = [];
  durationFunctions: ((duration: DurationObj) => any)[] = [];
  playFunctions: ((playing: boolean) => any)[] = [];
  progress?: DurationObj;
  totalDuration: number = 0;
  constructor(props: any) {
    super(props);
    this.state = {
      currentSong: undefined,
      play: true,
    };

    this.play_song = this.play_song.bind(this);
    this.add_update = this.add_update.bind(this);
    this.get_current_song = this.get_current_song.bind(this);
    this.get_elapsed = this.get_elapsed.bind(this);
    this.add_duration_update = this.add_duration_update.bind(this);
    this.change_time = this.change_time.bind(this);
    this.get_total_duration = this.get_total_duration.bind(this);
    this.toggle_play = this.toggle_play.bind(this);
    this.add_play_update = this.add_play_update.bind(this);
    this.play_update = this.play_update.bind(this);

    this.reactPlayer = React.createRef();
    this.progress = undefined;
  }
  play_song(song: SongObj) {
    console.log("https://www.youtube.com/watch?v=" + song);
    this.updateFunctions.forEach((func) => func(song));
    const electron = window.require("electron");
    // Arist name, author(s), start timestamp, end timestamp
    electron.ipcRenderer.send("rich-presence", {
      title: song.title,
      artists: song.artists.map((artist) => artist.name).join(", "),
      songDuration: song.duration.totalSeconds,
    });
    this.setState({
      currentSong: song,
      play: true,
    });
  }
  add_update(func: (currentSong: SongObj) => any) {
    this.updateFunctions.push(func);
  }
  get_current_song(): SongObj | undefined {
    if (!this.state) return;
    return this.state.currentSong;
  }
  add_duration_update(func: (duration: DurationObj) => any) {
    this.durationFunctions.push(func);
  }
  get_elapsed(): DurationObj | undefined {
    return this.progress;
  }
  change_time(time: number) {
    this.reactPlayer.current?.seekTo(time);
  }
  get_total_duration(): number {
    return this.totalDuration;
  }
  toggle_play() {
    this.setState({
      play: !this.state.play,
    });
  }
  add_play_update(func: (playing: boolean) => any) {
    this.playFunctions.push(func);
  }
  play_update() {
    this.playFunctions.forEach((func) => func(this.state.play));
  }
  playing() {
    return this.state.play;
  }
  render() {
    return (
      <MusicPlayerContext.Provider
        value={{
          play_song: this.play_song,
          get_current_song: this.get_current_song,
          add_update: this.add_update,
          get_elapsed: this.get_elapsed,
          add_duration_update: this.add_duration_update,
          change_time: this.change_time,
          get_total_duration: this.get_total_duration,
          toggle_play: this.toggle_play,
          add_play_update: this.add_play_update,
          playing: this.playing,
        }}
      >
        <div className="absolute right-0 bottom-1/2 top-1/2 mb-5 -z-50">
          <ReactPlayer
            url={
              "https://www.youtube.com/watch?v=" +
              this.state.currentSong?.youtubeId
            }
            controls={true}
            playing={this.state.play}
            ref={this.reactPlayer}
            onProgress={(progress: DurationObj) => {
              this.durationFunctions.forEach((func) => func(progress));
            }}
            onDuration={(duration) => (this.totalDuration = duration)}
            onPlay={() => this.play_update()}
          />
        </div>
        {this.props.children}
      </MusicPlayerContext.Provider>
    );
  }
}

export { SongPlayer, MusicPlayerContext };
