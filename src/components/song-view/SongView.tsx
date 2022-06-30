import { Component } from "react";
import { SongObj } from "../../types/VideoResults";
import { HiPlay as CirclePlayIcon } from "react-icons/hi";
// import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { BiPlay as PlayIcon } from "react-icons/bi";
import { motion } from "framer-motion";
import { MusicPlayerContext } from "../song-player/SongPlayer";
import React from "react";
import "./SongView.scss";
import { NavLink } from "react-router-dom";

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
  titleUrl?: string;
  playButton?: boolean;
  uuid?: string;
}> {
  // static songRef = SongPlayerRef;
  static contextType = MusicPlayerContext;
  play_song(id: string) {
    const electron = window.require("electron");
    electron.ipcRenderer.send("play-song", id);
  }

  handleRightClick() {
    let rightClick = document.getElementById(`${this.props.uuid}ContextMenu`);
    if (!rightClick) return;
    rightClick.style.display = "block";
  }

  componentDidMount() {
    let uuid = require("uuid");
    // this.props.uuid = uuid.v4();
    this.setState({ uuid: uuid.v4() });
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

    return (
      <div onContextMenu={this.handleRightClick}>
        {!topResult ? (
          <div className="">
            <div
              id={`${this.props.uuid}ContextMenu`}
              className="context-menu"
              style={{ display: "none" }}
            >
              <ul className="menu">
                <li className="share">
                  <a href="#">
                    <i className="fa fa-share" aria-hidden="true"></i> Share
                  </a>
                </li>
                <li className="rename">
                  <a href="#">
                    <i className="fa fa-pencil" aria-hidden="true"></i> Rename
                  </a>
                </li>
                <li className="link">
                  <a href="#">
                    <i className="fa fa-link" aria-hidden="true"></i> Copy Link
                    Address
                  </a>
                </li>
                <li className="copy">
                  <a href="#">
                    <i className="fa fa-copy" aria-hidden="true"></i> Copy to
                  </a>
                </li>
                <li className="paste">
                  <a href="#">
                    <i className="fa fa-paste" aria-hidden="true"></i> Move to
                  </a>
                </li>
                <li className="download">
                  <a href="#">
                    <i className="fa fa-download" aria-hidden="true"></i>{" "}
                    Download
                  </a>
                </li>
                <li className="trash">
                  <a href="#">
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </a>
                </li>
              </ul>
            </div>
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
            <h3 className="truncate">
              {this.props.titleUrl ? (
                <NavLink to={this.props.titleUrl} draggable="false">
                  {songName}
                </NavLink>
              ) : (
                songName
              )}
            </h3>
            <div className="text-xxs text-song-artist truncate">
              {artistName}
            </div>
            <motion.div
              variants={playMotion}
              className="relative"
              initial={{ opacity: 0 }}
            >
              {this.props.playButton ? (
                <CirclePlayIcon
                  className="absolute h-16 w-16 opacity-1 float-right right-0 bottom-0 text-secondary-icon-fill cursor-pointer"
                  onClick={() => {
                    if (songObj) {
                      songRef.play_song(songObj);
                    }
                  }}
                  id="play-icon"
                />
              ) : (
                <span></span>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }
}

export default SongView;
