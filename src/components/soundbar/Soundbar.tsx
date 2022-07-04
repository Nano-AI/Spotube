import { Component, FormEvent, SyntheticEvent } from "react";
import { MusicPlayerContext, SongPlayer } from "../song-player/SongPlayer";
import { SongObj, DurationObj } from "../../types/VideoResults";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import "./Soundbar.scss";
import React from "react";
import { TiThSmallOutline } from "react-icons/ti";

interface SoundBarContextValue {}

const SoundBarContext = React.createContext<Soundbar | undefined>(undefined);

const secondsToHMS = (duration?: number) => {
  if (!duration) return;
  let seconds: any = duration;
  let hours: any = Math.floor(seconds / 3600);
  let minutes: any = Math.floor((seconds - hours * 3600) / 60);
  seconds = Math.floor(seconds - hours * 3600 - minutes * 60);
  var time = "";
  if (hours) {
    time += (hours < 10 ? "0" : "") + hours + ":";
  }
  if (minutes) {
    time += (hours != 0 && hours < 10 ? "0" : "") + minutes + ":";
  } else {
    time += "00:";
  }
  time += (seconds < 10 ? "0" : "") + seconds;
  return time;
};

class Soundbar extends Component<
  {},
  { currentSong?: SongObj; duration?: DurationObj; playing: boolean }
> {
  static contextType = MusicPlayerContext;
  duration?: DurationObj;
  timeChangeable: boolean = true;
  totalDuration: number = 0;
  mouseDown: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      currentSong: undefined,
      duration: undefined,
      playing: false,
    };
  }

  componentDidMount() {
    this.updateTimeValue(0);
    let songRef: SongPlayer = this.context;
    songRef.add_update((song: SongObj) => {
      this.totalDuration = songRef.get_total_duration();
      this.setState({
        currentSong: song,
      });
    });
    songRef.add_duration_update((duration: DurationObj) => {
      this.totalDuration = songRef.get_total_duration();
      this.updateTimeValue(duration.played * 100);
      this.setState({
        duration: duration,
      });
    });
    songRef.add_play_update((playing: boolean) => {
      this.setState({
        playing: playing,
      });
    });
  }

  async handle_input(evt: any) {
    console.log(this.mouseDown);
    if (!this.mouseDown) {
      await this.context.change_time(evt.currentTarget.value / 100);
    } else {
      this.updateTimeValue(evt.currentTarget.value);
    }
  }

  updateTimeValue(time: number) {
    let progressSlider = document.getElementById("progress-slider");
    let musicSlider: any = document.getElementById("music-slider");
    if (progressSlider == null || musicSlider == null) {
      console.log("Slider and progress slider not found!!!");
      return;
    }
    progressSlider.style.width = Math.ceil(time) + "%";
    musicSlider.value = time;
  }

  render() {
    let songRef: SongPlayer = this.context;
    return (
      <div className="reative fixed bottom-0 w-screen z-50 bg-soundbar-background rounded-b-xl">
        <div className="relative w-100 h-100">
          <div className="m-2">
            {this.state.currentSong ? (
              <img
                className="w-12 h-12 m-2 inline-block"
                src={songRef.get_current_song()?.thumbnailUrl}
              />
            ) : (
              <div className="w-12 h-12 m-2 inline-block"></div>
            )}
            <div className="inline-block align-middle">
              <p className="text-smaller text-song-title truncate">
                {songRef.get_current_song()?.title}
              </p>
              <p className="text-xxs truncate text-song-artist">
                {songRef
                  .get_current_song()
                  ?.artists.map((artist) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 w-100 h-100 justify-center align-middle ml-auto mr-auto w-screen text-center h-full p-4 bg-transparent">
          <div className="m-auto absolute top-0 left-0 bottom-0 right-0 p-4">
            <div className="realtive">
              <div className="text-center mr-auto ml-auto">
                <div
                  className="mr-auto ml-auto h-9 w-9 text-soundbar-thumb"
                  onClick={() => {
                    songRef.toggle_play();
                    this.setState({ playing: !this.state.playing });
                  }}
                >
                  {!this.state.playing ? (
                    <AiFillPlayCircle className="play-icon" />
                  ) : (
                    <AiFillPauseCircle className="play-icon" />
                  )}
                </div>
              </div>
              <div>
                <p className="time-text inline-block" id="duration">
                  {secondsToHMS(this.state.duration?.playedSeconds)}
                </p>
                <div className="content-center relative bg-soundbar-fill w-1/2 h-2 rounded inline-block mr-2 ml-2">
                  <div
                    id="progress-slider"
                    className="absolute top-0 left-0 h-2 rounded-l-md w-1/2 bg-soundbar-progress"
                  ></div>
                  <input
                    id="music-slider"
                    type="range"
                    className="w-1/4 music-slider inline-block align-middle m-0"
                    onChange={(evt) => this.handle_input(evt)}
                    onMouseDown={() => {
                      this.mouseDown = true;
                    }}
                    onMouseUp={(evt) => {
                      this.mouseDown = false;
                      this.handle_input(evt);
                    }}
                  />
                </div>
                <p className="time-text">{secondsToHMS(this.totalDuration)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Soundbar;
