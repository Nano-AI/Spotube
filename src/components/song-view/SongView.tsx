import { Component } from "react";
import { PlaylistObj, SongObj } from "../../types/VideoResults";
import { HiPlay as CirclePlayIcon } from "react-icons/hi";
// import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { BiPlay as PlayIcon } from "react-icons/bi";
import { motion } from "framer-motion";
import { MusicPlayerContext } from "../song-player/SongPlayer";
import React from "react";
import "./SongView.scss";
import { NavLink } from "react-router-dom";
import { RiFlaskLine } from "react-icons/ri";

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

class SongView extends Component<
  {
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
  },
  {
    playlists?: PlaylistObj[];
  }
> {
  // static songRef = SongPlayerRef;
  static contextType = MusicPlayerContext;
  _isMounted = false;
  play_song(id: string) {
    const electron = window.require("electron");
    electron.ipcRenderer.send("play-song", id);
  }

  componentDidMount() {
    let uuid = require("uuid");
    // this.props.uuid = uuid.v4();
    this._isMounted = true;
    const electron = window.require("electron");
    electron.ipcRenderer.send("get-playlists");
    electron.ipcRenderer.on("playlists", (event: any, arg: PlaylistObj[]) => {
      if (this._isMounted) {
        console.log(arg);
        this.setState({
          playlists: arg,
        });
      }
    });
    this.setState({ playlists: [] });
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

    const handleRightClick = (event: any) => {
      console.log("Right clicked on me! ");
      // let rightClick = document.getElementById(`${this.props.uuid}ContextMenu`);
      let rightClick = document.getElementById(`ContextMenu`);
      if (!rightClick) return;
      console.log(this.props);
      rightClick.style.display = "";
      // console.log(event.x, event.y, event)
      rightClick.style.position = "absolute";
      rightClick.style.left = event.clientX + "px";
      rightClick.style.top = event.clientY + "px";
      rightClick.style.zIndex = "999";
    };

    const hoverAddPlaylist = (event: any) => {
      // let add_side = document.getElementById(`${this.props.uuid}AddPlaylistDropdown`);
      // let add = document.getElementById(`${this.props.uuid}AddToPlaylistButton`);
      let add_side = document.getElementById(`AddPlaylistDropdown`);
      let add = document.getElementById(`AddToPlaylistButton`);
      if (!add || !add_side) return;
      add_side.style.display = "";
      let pos = add.offsetTop;
      // console.log(add.offsetHeight, add.offsetLeft, add.offsetParent, add.offsetTop, add.offsetWidth)
      add_side.style.marginTop = pos + "px";
    };

    // const noHoverAddPlaylist = (e: any) => {
    //   let add_side = document.getElementById(`AddPlaylistDropdown`);
    //   let add = document.getElementById(`AddToPlaylistButton`);
    //   let contextMenu = document.getElementById(`ContextMenu`);
    //   if (!add || !add_side || !contextMenu) return;
    //   let mouse: any = e.target;
    //   console.log(add?.contains(mouse), add_side.contains(mouse), contextMenu.contains(mouse))
    //   if ((add.contains(mouse) || add_side.contains(mouse)) && contextMenu.contains(mouse)) return;
    //   add_side.style.display = "none";
    //   // add.style.display = "none";
    // }
    
    const hideRightClick = (e: any) => {
      let add = document.getElementById(`ContextMenu`);
      let add_side = document.getElementById(`AddPlaylistDropdown`);
      let contextMenu = document.getElementById(`ContextMenu`);
      if (!add || !add_side || !contextMenu) return;
      let mouse: any = e.target;
      if (
        (add.contains(mouse) || add.contains(mouse)) &&
        contextMenu.contains(mouse)
      )
        return;
      add_side.style.display = "none";
      add.style.display = "none";
    }

    window.addEventListener("click", (e) => {
      hideRightClick(e);
    });

    // document.body.addEventListener("click", (event) => {
    //   let rightClick = document.getElementById(`ContextMenu`);
    //   let add_side = document.getElementById(`AddPlaylistDropdown`);
    //   if (!rightClick || !add_side) return;
    //   add_side.style.display = "none";
    //   rightClick.style.display = "none";
    // });

    const addToPlaylist = (id: string) => {
      const electron = window.require("electron");
      electron.ipcRenderer.send("add-song", {
        playlistId: id,
        songObj: songObj
      });
    };

    return (
      <div onContextMenu={handleRightClick}>
        {!topResult ? (
          <div className="">
            <div
              id={`ContextMenu`}
              className="context-menu"
              style={{ display: "none" }}
            >
              <div>
                <div
                  id={`AddPlaylistDropdown`}
                  style={{ display: "none" }}
                  className="float-right bg-context-menu-background w-60 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg ml-1"
                >
                  {() => {
                    console.log(this.state, this.state.playlists)
                  }}
                  {(this._isMounted && this.state.playlists) ? this.state.playlists.map((playlist: PlaylistObj) => {
                    return (<div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded" onClick={(e) => {
                      addToPlaylist(playlist.playlistId);
                      hideRightClick(e);
                    }}>
                      <div>{playlist.playlistTitle}</div>
                    </div>);
                  }) : ""}
                </div>
                <div className="bg-context-menu-background w-60 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
                  {/* <div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded">
                    <div className="w-8 text-gray-900">
                      H<span className="text-xs">1</span>
                    </div>
                    <div># Heading 1</div>
                  </div>
                  <div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded">
                    <div className="w-8 text-gray-900">
                      H<span className="text-xs">2</span>
                    </div>
                    <div>## Heading 2</div>
                  </div>
                  <div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded">
                    <div className="w-8 text-gray-900">
                      H<span className="text-xs">3</span>
                    </div>
                    <div>### Heading 3</div>
                  </div>
                  <div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded">
                    <div className="w-8 text-gray-900">
                      H<span className="text-xs">4</span>
                    </div>
                    <div>#### Heading 4</div>
                  </div>
                  <hr className="my-3 border-gray-300" /> */}
                  <div
                    id={`AddToPlaylistButton`}
                    className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded"
                    onMouseOver={hoverAddPlaylist}
                  >
                    {/* <div className="w-8 text-gray-900 font-bold">B</div> */}
                    <div>Add to playlist</div>
                  </div>
                  {/* <div className="flex hover:bg-context-menu-background-hover py-1 px-2 rounded">
                    <div className="w-8 text-gray-900 italic">i</div>
                    <div>**Italic**</div>
                  </div> */}
                </div>
              </div>
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
