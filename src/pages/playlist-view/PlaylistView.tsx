import SongView from "components/song-view/SongView";
import React, { Component } from "react";
import { PlaylistObj, SongObj } from "types/VideoResults";
import { urlToHttpOptions } from "url";
import "./PlaylistView.scss";

const { ipcRenderer } = window.require("electron");

class PlaylistView extends Component<
  {},
  {
    playlist?: PlaylistObj;
    edit_hidden: string;
    thumbnail: any;
  }
> {
  _isMounted = false;
  title = "";
  description = "";
  // thumbnail: any = "";
  constructor(props: any) {
    super(props);
    this.state = {
      playlist: undefined,
      edit_hidden: "hidden -z-50",
      thumbnail: "",
      // edit_hidden: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    ipcRenderer.on("playlist", (event: any, arg: PlaylistObj) => {
      if (this._isMounted) {
        console.log(arg);
        this.title = arg.playlistTitle;
        this.description = arg.playlistDescription;
        this.setState({
          playlist: arg,
          thumbnail: this.state.playlist?.playlistThumbnail,
        });
      }
    });
  }

  editPlaylist() {
    this.setState({
      edit_hidden: this.state.edit_hidden == "" ? "hidden -z-50" : "",
    });
  }

  selectThumbnailImage() {}

  render() {
    if (!this.state.playlist) {
      ipcRenderer.send("get-playlist", window.location.href.split("/").at(-1));
    }

    const toggleEdit = () => {
      this.setState({
        edit_hidden:
          this.state.edit_hidden == "" ? "hidden -z-50" : "",
      });
    };

    return (
      <div>
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={
            "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full justify-center items-center" +
            this.state.edit_hidden
          }
        >
          <div
            className={
              "relative p-4 w-full max-w-md h-full md:h-auto " +
              this.state.edit_hidden
            }
          >
            <div
              className={
                "w-screen h-screen absolute left-0 top-0 " +
                this.state.edit_hidden
              }
              id="popup-background"
            ></div>
            {/* Modal content */}
            <div className="relative rounded-lg shadow dark:bg-gray-700 bg-playlist-edit-background ">
              <div className="items-center justify-center">
                <div className="py-6 px-6 lg:px-8" id="edit-box">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 "
                    data-modal-toggle="authentication-modal"
                    onClick={() => {
                      console.log(this.state.edit_hidden);
                      toggleEdit();
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <h3 className="mb-4 text-xl font-medium text-gray-900">
                    Edit Details
                  </h3>
                  <div className="space-y-6">
                    <img
                      className="w-36 h-36 cursor-pointer inline-block justify-center align-middle"
                      src={this.state.thumbnail}
                      onClick={() => {
                        document
                          .getElementById("input-playlist-thumbnail")
                          ?.click();
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="input-playlist-thumbnail"
                      onChange={(event) => {
                        if (event.target.files?.length != 1) return;
                        const FR = new FileReader();
                        FR.addEventListener("load", (evt) => {
                          this.setState({
                            thumbnail: evt.target?.result,
                          });
                          // this.thumbnail = evt.target?.result;
                          console.log(evt.target?.result);
                        });
                        FR.readAsDataURL(event.target.files[0]);
                      }}
                    ></input>
                    <div className="inline-block align-bottom justify-center h-36 ml-5">
                      <div className="relative">
                        <input
                          type="text"
                          id="playlistTitleInput"
                          className="mb-4 text-playlist-edit-field-text bg-playlist-edit-field block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          defaultValue={this.state.playlist?.playlistTitle}
                          onChange={(event) => {
                            this.title = event.target.value;
                          }}
                        />
                        <label
                          htmlFor="playlistTitleInput"
                          className="absolute text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Title
                        </label>
                      </div>
                      <div className="relative">
                        <textarea
                          // type="text"
                          id="playlistDescriptionInput"
                          className="text-playlist-edit-field-text bg-playlist-edit-field block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer h-20 resize-none"
                          placeholder=" "
                          defaultValue={
                            this.state.playlist?.playlistDescription
                          }
                          onChange={(event) => {
                            this.description = event.target.value;
                          }}
                        />
                        <label
                          htmlFor="playlistDescriptionInput"
                          className="absolute text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Description
                        </label>
                      </div>
                    </div>
                    <button
                      className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center justify-end block"
                      onClick={() => {
                        console.log(
                          document.getElementById("playlistTitleInput")
                            ?.nodeValue
                        );
                        ipcRenderer.send("edit-playlist-details", {
                          id: this.state.playlist?.playlistId,
                          title: this.title,
                          description: this.description,
                          thumbnail: this.state.thumbnail,
                        });
                        let playlist = this.state.playlist;
                        if (!playlist) return;
                        playlist.playlistDescription = this.description;
                        playlist.playlistTitle = this.title;
                        toggleEdit();
                        this.setState({
                          playlist: playlist
                        });
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h2>Add Playlist</h2> */}
        <div
          className="my-12 mx-8"
          onClick={() => {
            console.log(this.state.edit_hidden);
            this.setState({
              edit_hidden: this.state.edit_hidden == "" ? "hidden -z-50" : "",
            });
          }}
        >
          <img
            className="w-32 h-32 inline-block cursor-pointer"
            src={this.state.playlist?.playlistThumbnail}
          />
          <h2 className="inline-block align-bottom mx-8 text-7xl cursor-pointer">
            {this.state.playlist?.playlistTitle}
            <p className="playlist-description">
              {this.state.playlist?.playlistDescription}
            </p>
          </h2>
        </div>
        <div>
          {this.state.playlist?.songs.map((song: SongObj, i) => {
            return <div>
              <SongView className="block" songObj={song}></SongView>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default PlaylistView;
