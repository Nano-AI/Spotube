import { Component } from "react";
import { SongObj } from "../../types/VideoResults";
import { HiPlay as CirclePlayIcon } from "react-icons/hi";
// import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { BiPlay as PlayIcon } from "react-icons/bi";
import { motion } from "framer-motion";
import { MusicPlayerContext } from "../song-player/SongPlayer";
import React from "react";
import "./SongView.scss";

const playMotion = {
  rest: {
    color: "white",
    y: 10,
  },
  hover: {
    color: "white",
    y: -5,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "easeIn",
      ease: "easeOut",
    },
  },
};

class SongView extends Component<{
  songName?: string;
  artistName?: string;
  picture?: string;
  topResult?: boolean;
  songObj?: SongObj;
  duration?: number;
  className?: string;
}> {
  // static songRef = SongPlayerRef;
  static contextType = MusicPlayerContext;
  play_song(id: string) {
    const electron = window.require("electron");
    electron.ipcRenderer.send("play-song", id);
  }
  render() {
    const topResult = this.props.topResult || false;
    const songObj = this.props.songObj;
    console.log(songObj);
    const picture = this.props.picture || songObj?.thumbnailUrl;
    const songName = this.props.songName || songObj?.title;
    const artistName =
      this.props.artistName ||
      songObj?.artists.map((artist) => artist.name).join(", ");
    const duration = this.props.duration || songObj?.duration.label;
    let songRef = this.context;
    console.log(songObj);
    return (
      <div>
        {!topResult ? (
          <div className="">
            <div className="group px-2 py-2 hover:bg-hover-song-bg rounded">
              <div className="relative inline-block mr-4">
                <img
                  src={picture}
                  className="group-hover:brightness-50 brightness-100 w-song-image h-song-image inline-block object-cover"
                  alt="Song"
                />
                <PlayIcon
                  className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-song-image h-song-image hover:cursor-pointer"
                  onClick={() => {
                    if (songObj) {
                      songRef.play_song(songObj);
                    }
                  }}
                />
              </div>
              <div className="inline-block align-top">
                <div className="text-smaller text-song-title truncate">
                  {songName}
                </div>
                <div className="text-xxs text-song-artist truncate">
                  {artistName}
                </div>
              </div>
              <p className="inline-block tex-smaller align-middle float-right duration">
                {duration}
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            className={"bg-top-result-bg p-5 rounded-md h-full"}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <img
              src={picture}
              className="w-24 h-24 object-cover mb-2 "
              alt="Top Result"
            />
            <h3 className="truncate ">{songName}</h3>
            <div className="text-xxs text-song-artist truncate">
              {artistName}
            </div>
            <motion.div
              variants={playMotion}
              className="relative"
              initial={{ opacity: 0 }}
            >
              <CirclePlayIcon
                className="absolute h-16 w-16 opacity-1 float-right right-0 bottom-0 text-secondary-icon-fill cursor-pointer"
                onClick={() => {
                  if (songObj) {
                    songRef.play_song(songObj);
                  }
                }}
                id="play-icon"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }
}

export default SongView;
